// Configuration for client side
const durationsConfig = {
  month: 'monthly',
  onetime: 'one-time'
};
const amountsConfig = {
  month: [1000, 2000, 3000, 4000, 5000],
  onetime: [2500, 5000, 7500, 10000, 15000]
};
const defaultAmount = {
  month: 500,
  onetime: 7500
};
const defaultDonation = {
  donationAmount: defaultAmount['month'],
  donationDuration: 'month'
};
const modalDefaultDonation = {
  donationAmount: 500,
  donationDuration: 'month'
};

const onetimeSKUConfig = {
  live: [
    { amount: '15000', id: 'sku_IElisJHup0nojP' },
    { amount: '10000', id: 'sku_IEliodY88lglPk' },
    { amount: '7500', id: 'sku_IEli9AXW8DwNtT' },
    { amount: '5000', id: 'sku_IElhJxkNh9UgDp' },
    { amount: '2500', id: 'sku_IElhQtqLgKZC8y' }
  ],
  staging: [
    { amount: '15000', id: 'sku_IEPNpHACYJmUwz' },
    { amount: '10000', id: 'sku_IEPMY1OXxnY4WU' },
    { amount: '7500', id: 'sku_IEPLOotEqlMOWC' },
    { amount: '5000', id: 'sku_IEPKAxxAxfMnUI' },
    { amount: '2500', id: 'sku_IEPIgLRzViwq5z' }
  ]
};

// Configuration for server side
const durationKeysConfig = ['month', 'onetime'];
const donationOneTimeConfig = [100000, 25000, 6000];
const donationSubscriptionConfig = {
  duration: {
    month: 'Monthly'
  },
  plans: {
    month: [25000, 3500, 500]
  }
};

// Shared paypal configuration
// keep the 5 dollars for the modal
const paypalConfigTypes = {
  live: {
    month: {
      500: { planId: 'P-1L11422374370240ULZKX3PA' },
      1000: { planId: 'P-61K21421WY874920PL6E36YI' },
      2000: { planId: 'P-31999436LF709112VL6E374A' },
      3000: { planId: 'P-1KY930839N8045117L6E4BKY' },
      4000: { planId: 'P-0JW4843250567551AL6E4CAI' },
      5000: { planId: 'P-0WR49877YD949401BL6E4CTA' }
    }
  },
  staging: {
    month: {
      500: { planId: 'P-37N14480BW163382FLZYPVMA' },
      1000: { planId: 'P-28B62039J8092810UL6E3FXA' },
      2000: { planId: 'P-7HR706961M9170433L6HI5VI' },
      3000: { planId: 'P-35V33574BU596924JL6HI6XY' },
      4000: { planId: 'P-45M45060289267734L6HJSXA' },
      5000: { planId: 'P-0MD70861FY4172444L6HJTUQ' }
    }
  }
};

const paypalConfigurator = (donationAmount, donationDuration, paypalConfig) => {
  if (donationDuration === 'onetime') {
    return { amount: donationAmount, duration: donationDuration };
  }
  return {
    amount: donationAmount,
    duration: donationDuration,
    planId: paypalConfig[donationDuration]['' + donationAmount].planId
  };
};

//
const donationUrls = {
  successUrl: 'https://www.freecodecamp.org/news/thank-you-for-donating/',
  cancelUrl: 'https://freecodecamp.org/donate'
};

module.exports = {
  durationsConfig,
  amountsConfig,
  defaultAmount,
  defaultDonation,
  durationKeysConfig,
  donationOneTimeConfig,
  donationSubscriptionConfig,
  modalDefaultDonation,
  onetimeSKUConfig,
  paypalConfigTypes,
  paypalConfigurator,
  donationUrls
};
