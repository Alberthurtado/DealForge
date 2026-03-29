/**
 * Script para crear precios anuales (20% descuento) en Stripe
 * vinculados a los productos Pro y Business existentes.
 *
 * Ejecutar: npx tsx scripts/stripe-add-annual.ts
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

async function addAnnualPrices() {
  console.log("Buscando productos existentes en Stripe...\n");

  // Find existing products by metadata
  const products = await stripe.products.list({ limit: 100, active: true });

  const proProduct = products.data.find(
    (p) => p.metadata.dealforge_plan === "pro"
  );
  const businessProduct = products.data.find(
    (p) => p.metadata.dealforge_plan === "business"
  );

  if (!proProduct) {
    console.error("Producto Pro no encontrado. Ejecuta primero stripe-setup.ts");
    process.exit(1);
  }
  if (!businessProduct) {
    console.error("Producto Business no encontrado. Ejecuta primero stripe-setup.ts");
    process.exit(1);
  }

  console.log(`Pro Product encontrado: ${proProduct.id}`);
  console.log(`Business Product encontrado: ${businessProduct.id}\n`);

  // ─── Pro Annual: 23€/mes × 12 = 276€/año ────────
  const proAnnualPrice = await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 27600, // 276.00 EUR en céntimos
    currency: "eur",
    recurring: { interval: "year" },
    metadata: {
      dealforge_plan: "pro",
      dealforge_interval: "annual",
    },
  });

  console.log("Pro Annual Price:", proAnnualPrice.id);
  console.log("  → 276 EUR/año (23 EUR/mes, ahorro 20%)\n");

  // ─── Business Annual: 63€/mes × 12 = 756€/año ───
  const businessAnnualPrice = await stripe.prices.create({
    product: businessProduct.id,
    unit_amount: 75600, // 756.00 EUR en céntimos
    currency: "eur",
    recurring: { interval: "year" },
    metadata: {
      dealforge_plan: "business",
      dealforge_interval: "annual",
    },
  });

  console.log("Business Annual Price:", businessAnnualPrice.id);
  console.log("  → 756 EUR/año (63 EUR/mes, ahorro 20%)\n");

  // ─── Resumen ─────────────────────────────────────
  console.log("=".repeat(60));
  console.log("ACTUALIZA src/lib/stripe.ts CON ESTOS PRICE IDs:");
  console.log("=".repeat(60));
  console.log(`\nPLAN_PRICE_MAP = {`);
  console.log(`  pro: {`);
  console.log(`    monthly: "price_1T8jsoD3Nsh6V7dkMRt1yQEJ",`);
  console.log(`    annual:  "${proAnnualPrice.id}",`);
  console.log(`  },`);
  console.log(`  business: {`);
  console.log(`    monthly: "price_1T8jspD3Nsh6V7dkG5A2mbTU",`);
  console.log(`    annual:  "${businessAnnualPrice.id}",`);
  console.log(`  },`);
  console.log(`};\n`);

  // Update billing portal to include annual prices
  console.log("Actualizando Customer Portal con precios anuales...");
  try {
    const configs = await stripe.billingPortal.configurations.list({ limit: 1 });
    if (configs.data.length > 0) {
      await stripe.billingPortal.configurations.update(configs.data[0].id, {
        features: {
          subscription_update: {
            enabled: true,
            default_allowed_updates: ["price"],
            proration_behavior: "create_prorations",
            products: [
              {
                product: proProduct.id,
                prices: [
                  "price_1T8jsoD3Nsh6V7dkMRt1yQEJ",
                  proAnnualPrice.id,
                ],
              },
              {
                product: businessProduct.id,
                prices: [
                  "price_1T8jspD3Nsh6V7dkG5A2mbTU",
                  businessAnnualPrice.id,
                ],
              },
            ],
          },
        },
      });
      console.log("Customer Portal actualizado con precios anuales\n");
    }
  } catch (err) {
    console.log("No se pudo actualizar el portal (no crítico):", (err as Error).message);
  }

  console.log("¡Setup de precios anuales completo!");
}

addAnnualPrices().catch(console.error);
