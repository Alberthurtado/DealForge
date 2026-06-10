/**
 * Crea los precios en USD y GBP para los planes Pro y Business,
 * vinculados a los productos existentes en Stripe.
 *
 * Números redondos por mercado (no conversión exacta):
 *   Pro      → 29€ / $29 / £25 mensual   ·  23€ / $23 / £19 anual
 *   Business → 79€ / $79 / £69 mensual   ·  63€ / $63 / £55 anual
 *
 * Ejecutar:  npx tsx scripts/stripe-multicurrency-setup.ts
 *
 * Al terminar imprime las variables de entorno que debes añadir en Vercel.
 * NO modifica los precios EUR existentes ni ninguna suscripción activa.
 */

import Stripe from "stripe";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const stripeKey = process.env.STRIPE_API_KEY;
if (!stripeKey) {
  console.error("STRIPE_API_KEY no encontrada en .env");
  process.exit(1);
}

const stripe = new Stripe(stripeKey);

// Importes en la unidad mínima (céntimos / pence). Anual = mensual_anual × 12.
const AMOUNTS = {
  pro: {
    USD: { monthly: 2900, annual: 27600 }, // $29/mo · $276/yr ($23/mo)
    GBP: { monthly: 2500, annual: 22800 }, // £25/mo · £228/yr (£19/mo)
  },
  business: {
    USD: { monthly: 7900, annual: 75600 }, // $79/mo · $756/yr ($63/mo)
    GBP: { monthly: 6900, annual: 66000 }, // £69/mo · £660/yr (£55/mo)
  },
} as const;

type Plan = keyof typeof AMOUNTS;
type Cur = "USD" | "GBP";
type Interval = "monthly" | "annual";

async function run() {
  console.log("Buscando productos existentes en Stripe...\n");
  const products = await stripe.products.list({ limit: 100, active: true });

  const productByPlan: Record<Plan, string> = {
    pro: products.data.find((p) => p.metadata.dealforge_plan === "pro")?.id || "",
    business: products.data.find((p) => p.metadata.dealforge_plan === "business")?.id || "",
  };

  for (const plan of ["pro", "business"] as Plan[]) {
    if (!productByPlan[plan]) {
      console.error(`Producto ${plan} no encontrado. Ejecuta primero stripe-setup.ts`);
      process.exit(1);
    }
  }

  const envLines: string[] = [];

  for (const plan of ["pro", "business"] as Plan[]) {
    for (const currency of ["USD", "GBP"] as Cur[]) {
      for (const interval of ["monthly", "annual"] as Interval[]) {
        const amount = AMOUNTS[plan][currency][interval];
        const price = await stripe.prices.create({
          product: productByPlan[plan],
          unit_amount: amount,
          currency: currency.toLowerCase(),
          recurring: { interval: interval === "annual" ? "year" : "month" },
          metadata: {
            dealforge_plan: plan,
            dealforge_interval: interval,
            dealforge_currency: currency,
          },
        });
        const envKey = `STRIPE_PRICE_${plan.toUpperCase()}_${currency}_${interval.toUpperCase()}`;
        envLines.push(`${envKey}=${price.id}`);
        console.log(`${plan} ${currency} ${interval}: ${price.id} (${amount / 100} ${currency})`);
      }
    }
  }

  console.log("\n" + "=".repeat(64));
  console.log("AÑADE ESTAS VARIABLES DE ENTORNO EN VERCEL (Production):");
  console.log("=".repeat(64) + "\n");
  console.log(envLines.join("\n"));
  console.log("\nDespués de añadirlas, haz un redeploy para que tomen efecto.");
}

run().catch(console.error);
