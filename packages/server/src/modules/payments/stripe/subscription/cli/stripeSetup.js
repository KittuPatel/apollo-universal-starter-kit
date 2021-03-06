require('babel-register')({ presets: ['env'] });
require('dotenv/config');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const settings = require('../../../../../../../../settings').default;

const { product, plan } = settings.stripe.subscription;

/**
 * Initializes the Stripe: creates product and plan.
 */
Promise.resolve()
  .then(() => stripe.products.create(product))
  .then(({ id: product }) => stripe.plans.create({ product, ...plan }))
  .then(() => {
    console.log('----------------------------------------------------------------------------------------------------');
    console.log(`${plan.nickname} created.`);
    console.log(`Subscribers will be charged $${plan.amount / 100} a ${plan.interval}.`);
    console.log('You will need to configure a webhook endpoint manually in the Stripe interface when ready to deploy.');
    console.log('This webhook will enable automatic cancellation and automated emails about failed charges.');
    console.log('----------------------------------------------------------------------------------------------------');
  })
  .catch(err => {
    console.log(err);
  });
