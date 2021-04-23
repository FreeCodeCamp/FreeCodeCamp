import debug from 'debug';
import Stripe from 'stripe';
import { isEmail, isNumeric } from 'validator';

import {
  durationKeysConfig,
  donationOneTimeConfig,
  donationSubscriptionConfig,
  durationsConfig,
  onetimeSKUConfig,
  donationUrls
} from '../../../../config/donation-settings';
import { deploymentEnv } from '../../../../config/env';
import keys from '../../../../config/secrets';
import {
  getAsyncPaypalToken,
  verifyWebHook,
  updateUser,
  verifyWebHookType
} from '../utils/donation';

const log = debug('fcc:boot:donate');

export default function donateBoot(app, done) {
  let stripe = false;
  const { User } = app.models;
  const api = app.loopback.Router();
  const hooks = app.loopback.Router();
  const donateRouter = app.loopback.Router();

  const subscriptionPlans = Object.keys(
    donationSubscriptionConfig.plans
  ).reduce(
    (prevDuration, duration) =>
      prevDuration.concat(
        donationSubscriptionConfig.plans[duration].reduce(
          (prevAmount, amount) =>
            prevAmount.concat({
              amount: amount,
              interval: duration,
              product: {
                name: `${
                  donationSubscriptionConfig.duration[duration]
                } Donation to freeCodeCamp.org - Thank you ($${amount / 100})`,
                metadata: {
                  /* eslint-disable camelcase */
                  sb_service: `freeCodeCamp.org`,
                  sb_tier: `${donationSubscriptionConfig.duration[duration]} $${
                    amount / 100
                  } Donation`
                  /* eslint-enable camelcase */
                }
              },
              currency: 'usd',
              id: `${donationSubscriptionConfig.duration[
                duration
              ].toLowerCase()}-donation-${amount}`
            }),
          []
        )
      ),
    []
  );

  function validStripeForm(amount, duration, email) {
    return isEmail('' + email) &&
      isNumeric('' + amount) &&
      durationKeysConfig.includes(duration) &&
      duration === 'onetime'
      ? donationOneTimeConfig.includes(amount)
      : donationSubscriptionConfig.plans[duration];
  }

  function connectToStripe() {
    return new Promise(function (resolve) {
      // connect to stripe API
      stripe = Stripe(keys.stripe.secret);
      // parse stripe plans
      stripe.plans.list({}, function (err, stripePlans) {
        if (err) {
          throw err;
        }
        const requiredPlans = subscriptionPlans.map(plan => plan.id);
        const availablePlans = stripePlans.data.map(plan => plan.id);
        if (process.env.STRIPE_CREATE_PLANS === 'true') {
          requiredPlans.forEach(requiredPlan => {
            if (!availablePlans.includes(requiredPlan)) {
              createStripePlan(
                subscriptionPlans.find(plan => plan.id === requiredPlan)
              );
            }
          });
        } else {
          log(`Skipping plan creation`);
        }
      });
      resolve();
    });
  }

  function createStripePlan(plan) {
    log(`Creating subscription plan: ${plan.product.name}`);
    stripe.plans.create(plan, function (err) {
      if (err) {
        log(err);
      }
      log(`Created plan with plan id: ${plan.id}`);
      return;
    });
  }

  function createStripeDonation(req, res) {
    const { user, body } = req;

    const {
      amount,
      duration,
      token: { email, id }
    } = body;

    if (!validStripeForm(amount, duration, email)) {
      return res.status(500).send({
        error: 'The donation form had invalid values for this submission.'
      });
    }

    const fccUser = user
      ? Promise.resolve(user)
      : new Promise((resolve, reject) =>
          User.findOrCreate(
            { where: { email } },
            { email },
            (err, instance, isNew) => {
              log('createing a new donating user instance: ', isNew);
              if (err) {
                return reject(err);
              }
              return resolve(instance);
            }
          )
        );

    let donatingUser = {};
    let donation = {
      email,
      amount,
      duration,
      provider: 'stripe',
      startDate: new Date(Date.now()).toISOString()
    };

    const createCustomer = user => {
      donatingUser = user;
      return stripe.customers.create({
        email,
        card: id
      });
    };

    const createSubscription = customer => {
      donation.customerId = customer.id;
      return stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            plan: `${donationSubscriptionConfig.duration[
              duration
            ].toLowerCase()}-donation-${amount}`
          }
        ]
      });
    };

    const createOneTimeCharge = customer => {
      donation.customerId = customer.id;
      return stripe.charges.create({
        amount: amount,
        currency: 'usd',
        customer: customer.id
      });
    };

    const createAsyncUserDonation = () => {
      donatingUser
        .createDonation(donation)
        .toPromise()
        .catch(err => {
          throw new Error(err);
        });
    };

    return Promise.resolve(fccUser)
      .then(nonDonatingUser => {
        const { isDonating } = nonDonatingUser;
        if (isDonating && duration !== 'onetime') {
          throw {
            message: `User already has active recurring donation(s).`,
            type: 'AlreadyDonatingError'
          };
        }
        return nonDonatingUser;
      })
      .then(createCustomer)
      .then(customer => {
        return duration === 'onetime'
          ? createOneTimeCharge(customer).then(charge => {
              donation.subscriptionId = 'one-time-charge-prefix-' + charge.id;
              return res.send(charge);
            })
          : createSubscription(customer).then(subscription => {
              donation.subscriptionId = subscription.id;
              return res.send(subscription);
            });
      })
      .then(createAsyncUserDonation)
      .catch(err => {
        if (
          err.type === 'StripeCardError' ||
          err.type === 'AlreadyDonatingError'
        ) {
          return res.status(402).send({ error: err.message });
        }
        return res
          .status(500)
          .send({ error: 'Donation failed due to a server error.' });
      });
  }

  function addDonation(req, res) {
    const { user, body } = req;

    if (!user || !body) {
      return res
        .status(500)
        .send({ error: 'User must be signed in for this request.' });
    }
    return Promise.resolve(req)
      .then(
        user.updateAttributes({
          isDonating: true
        })
      )
      .then(() => res.status(200).json({ isDonating: true }))
      .catch(err => {
        log(err.message);
        return res.status(500).send({
          type: 'danger',
          message: 'Something went wrong.'
        });
      });
  }

  async function createStripeSession(req, res) {
    const {
      body,
      body: { donationAmount, donationDuration }
    } = req;
    if (!body) {
      return res
        .status(500)
        .send({ type: 'danger', message: 'Request has not completed.' });
    }
    const isSubscription = donationDuration !== 'onetime';
    const getSKUId = () => {
      const { id } = onetimeSKUConfig[deploymentEnv || 'staging'].find(
        skuConfig => skuConfig.amount === `${donationAmount}`
      );
      return id;
    };
    const price = isSubscription
      ? `${durationsConfig[donationDuration]}-donation-${donationAmount}`
      : getSKUId();

    /* eslint-disable camelcase */
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price,
            quantity: 1
          }
        ],
        metadata: { ...body },
        mode: isSubscription ? 'subscription' : 'payment',
        success_url: donationUrls.successUrl,
        cancel_url: donationUrls.cancelUrl
      });
      /* eslint-enable camelcase */
      return res.status(200).json({ id: session.id });
    } catch (err) {
      log(err.message);
      return res.status(500).send({
        type: 'danger',
        message: 'Something went wrong.'
      });
    }
  }

  function updatePaypal(req, res) {
    const { headers, body } = req;
    return Promise.resolve(req)
      .then(verifyWebHookType)
      .then(getAsyncPaypalToken)
      .then(token => verifyWebHook(headers, body, token, keys.paypal.webhookId))
      .then(hookBody => updateUser(hookBody, app))
      .catch(err => {
        // Todo: This probably need to be thrown and caught in error handler
        log(err.message);
      })
      .finally(() => res.status(200).json({ message: 'received paypal hook' }));
  }

  const stripeKey = keys.stripe.public;
  const secKey = keys.stripe.secret;
  const paypalKey = keys.paypal.client;
  const paypalSec = keys.paypal.secret;
  const stripeSecretInvalid = !secKey || secKey === 'sk_from_stripe_dashboard';
  const stripPublicInvalid =
    !stripeKey || stripeKey === 'pk_from_stripe_dashboard';

  const paypalSecretInvalid =
    !paypalKey || paypalKey === 'id_from_paypal_dashboard';
  const paypalPublicInvalid =
    !paypalSec || paypalSec === 'secret_from_paypal_dashboard';

  const paypalInvalid = paypalPublicInvalid || paypalSecretInvalid;
  const stripeInvalid = stripeSecretInvalid || stripPublicInvalid;

  if (stripeInvalid || paypalInvalid) {
    if (process.env.FREECODECAMP_NODE_ENV === 'production') {
      throw new Error('Donation API keys are required to boot the server!');
    }
    log('Donation disabled in development unless ALL test keys are provided');
    done();
  } else {
    api.post('/charge-stripe', createStripeDonation);
    api.post('/create-stripe-session', createStripeSession);
    api.post('/add-donation', addDonation);
    hooks.post('/update-paypal', updatePaypal);
    donateRouter.use('/donate', api);
    donateRouter.use('/hooks', hooks);
    app.use(donateRouter);
    connectToStripe().then(done);
  }
}
