/**
 * Script one-time para crear productos y precios en Stripe
 * Ejecutar: npx tsx scripts/stripe-setup.ts
 */

import Stripe from "stripe";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env from project root
dotenv.config({ path: resolve(__dirname, "../.env") });

const stripeKey = process.env.STRIPE_API_KEY;
if (!stripeKey) {
  console.error("STRIPE_API_KEY no encontrada en .env");
  process.exit(1);
}

const stripe = new Stripe(stripeKey);

async function setup() {
  console.log("Creando productos y precios en Stripe...\n");

  // ─── Pro Plan ──────────────────────────────────
  const proProduct = await stripe.products.create({
    name: "DealForge Pro",
    description:
      "100 cotizaciones/mes, 50 clientes, 200 productos, Forge IA ilimitado (Sonnet), emails, PDF con marca",
    metadata: { dealforge_plan: "pro" },
  });

  const proPrice = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 2900, // 29.00 EUR en centimos
    currency: "eur",
    recurring: { interval: "month" },
    metadata: { dealforge_plan: "pro" },
  });

  console.log("Pro Product:", proProduct.id);
  console.log("Pro Price:  ", proPrice.id);
  console.log(`  → 29 EUR/mes\n`);

  // ─── Business Plan ─────────────────────────────
  const businessProduct = await stripe.products.create({
    name: "DealForge Business",
    description:
      "Cotizaciones ilimitadas, clientes y productos ilimitados, Forge IA prioridad (Sonnet), aprobaciones, reglas avanzadas, CRM",
    metadata: { dealforge_plan: "business" },
  });

  const businessPrice = await stripe.prices.create({
    product: businessProduct.id,
    unit_amount: 7900, // 79.00 EUR en centimos
    currency: "eur",
    recurring: { interval: "month" },
    metadata: { dealforge_plan: "business" },
  });

  console.log("Business Product:", businessProduct.id);
  console.log("Business Price:  ", businessPrice.id);
  console.log(`  → 79 EUR/mes\n`);

  // ─── Resumen ───────────────────────────────────
  console.log("=".repeat(60));
  console.log("COPIA ESTOS PRICE IDs A src/lib/stripe.ts:");
  console.log("=".repeat(60));
  console.log(`\nPLAN_PRICE_MAP = {`);
  console.log(`  pro:      "${proPrice.id}",`);
  console.log(`  business: "${businessPrice.id}",`);
  console.log(`};\n`);

  // Configurar Customer Portal
  console.log("Configurando Customer Portal...");
  try {
    await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "DealForge - Gestiona tu suscripcion",
      },
      features: {
        subscription_cancel: { enabled: true, mode: "at_period_end" },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ["price"],
          proration_behavior: "create_prorations",
          products: [
            {
              product: proProduct.id,
              prices: [proPrice.id],
            },
            {
              product: businessProduct.id,
              prices: [businessPrice.id],
            },
          ],
        },
        payment_method_update: { enabled: true },
        invoice_history: { enabled: true },
      },
    });
    console.log("Customer Portal configurado correctamente\n");
  } catch (err) {
    console.log(
      "Customer Portal ya existia o no se pudo configurar (no critico):",
      (err as Error).message,
      "\n"
    );
  }

  console.log("Setup completo!");
}

setup().catch(console.error);
