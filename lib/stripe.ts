import Stripe from "stripe";

export const hasStripe = Boolean(process.env.STRIPE_SECRET_KEY);

// Stripe's constructor requires a non-empty key even when unused; routes
// check `hasStripe` before making any real API call.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_not_configured");
