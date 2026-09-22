// Stripe & LemonSqueezy Payment Gateway Integration Service

export const paymentService = {
  // Check if live Stripe / LemonSqueezy keys are configured in .env
  isLiveGatewayConfigured() {
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const lemonUrl = import.meta.env.VITE_LEMON_SQUEEZY_PRO_URL;
    return Boolean(stripeKey || lemonUrl);
  },

  // Trigger live checkout or demo preview checkout
  async triggerCheckout(planId, price) {
    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const lemonUrl = import.meta.env.VITE_LEMON_SQUEEZY_PRO_URL || import.meta.env.VITE_LEMON_SQUEEZY_AGENCY_URL;

    // 1. If LemonSqueezy hosted payment link is present
    if (lemonUrl) {
      window.location.href = lemonUrl;
      return { success: true, mode: 'lemonsqueezy' };
    }

    // 2. If Stripe publishable key is present
    if (stripeKey && window.Stripe) {
      try {
        const stripe = window.Stripe(stripeKey);
        // Call your backend/Supabase Stripe checkout endpoint
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId, price })
        });
        const session = await response.json();
        if (session.id) {
          await stripe.redirectToCheckout({ sessionId: session.id });
          return { success: true, mode: 'stripe' };
        }
      } catch (err) {
        console.warn("Stripe backend checkout error:", err);
      }
    }

    // 3. Demo Mode (Fallback for local testing before .env keys are added)
    console.log(`[DEMO CHECKOUT]: User upgraded to ${planId.toUpperCase()} tier ($${price}).`);
    return { success: true, mode: 'demo' };
  }
};
