// Live Payment Gateway Service (Stripe Checkout & LemonSqueezy Integration)

export const paymentService = {
  // Trigger real production checkout or simulation
  async initiateCheckout(planTier, userEmail = '') {
    const lemonProUrl = import.meta.env.VITE_LEMON_SQUEEZY_PRO_URL;
    const lemonAgencyUrl = import.meta.env.VITE_LEMON_SQUEEZY_AGENCY_URL;
    const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

    // 1. If LemonSqueezy checkout link is configured
    if (planTier === 'pro' && lemonProUrl) {
      window.location.href = `${lemonProUrl}?checkout[email]=${encodeURIComponent(userEmail)}`;
      return true;
    }
    if (planTier === 'agency' && lemonAgencyUrl) {
      window.location.href = `${lemonAgencyUrl}?checkout[email]=${encodeURIComponent(userEmail)}`;
      return true;
    }

    // 2. Stripe Checkout Integration Trigger
    if (stripePublicKey && window.Stripe) {
      try {
        const stripe = window.Stripe(stripePublicKey);
        const priceId = planTier === 'agency' 
          ? import.meta.env.VITE_STRIPE_AGENCY_PRICE_ID 
          : import.meta.env.VITE_STRIPE_PRO_PRICE_ID;

        const { error } = await stripe.redirectToCheckout({
          lineItems: [{ price: priceId, quantity: 1 }],
          mode: 'subscription',
          successUrl: `${window.location.origin}/?payment=success&tier=${planTier}`,
          cancelUrl: `${window.location.origin}/?payment=cancelled`,
          customerEmail: userEmail
        });

        if (error) {
          console.error("Stripe Checkout Error:", error);
        }
      } catch (err) {
        console.error("Payment trigger failed:", err);
      }
    }

    // Fallback mode for demo testing if environment keys aren't added yet
    return false;
  }
};
