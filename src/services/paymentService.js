import axios from 'axios';

const PAYMOB_API_URL = 'https://accept.paymob.com/api';
const PAYMOB_API_KEY = import.meta.env.VITE_PAYMOB_API_KEY;
const PAYMOB_INTEGRATION_ID = import.meta.env.VITE_PAYMOB_INTEGRATION_ID;

/**
 * PayMob Payment Service
 * Handles CMI-integrated payment processing for Moroccan market
 * 
 * Flow:
 * 1. Authenticate with PayMob
 * 2. Create order
 * 3. Get payment key
 * 4. Redirect to iframe or process tokenized payment
 */

async function authenticate() {
  const response = await axios.post(`${PAYMOB_API_URL}/auth/tokens`, {
    api_key: PAYMOB_API_KEY,
  });
  return response.data.token;
}

export async function createOrder({ amount, items = [] }) {
  const token = await authenticate();

  const response = await axios.post(
    `${PAYMOB_API_URL}/ecommerce/orders`,
    {
      auth_token: token,
      delivery_needed: false,
      amount_cents: amount * 100, // PayMob uses cents
      currency: 'MAD',
      items: items.map((item) => ({
        name: item.name,
        amount_cents: item.amount * 100,
        description: item.description || '',
        quantity: item.quantity || 1,
      })),
    }
  );

  return response.data;
}

export async function getPaymentKey({ orderId, billingData }) {
  const token = await authenticate();

  const response = await axios.post(
    `${PAYMOB_API_URL}/acceptance/payment_keys`,
    {
      auth_token: token,
      amount_cents: billingData.amount * 100,
      expiration: 3600,
      order_id: orderId,
      billing_data: {
        apartment: billingData.apartment || 'NA',
        email: billingData.email,
        floor: billingData.floor || 'NA',
        first_name: billingData.firstName,
        street: billingData.street || 'NA',
        building: billingData.building || 'NA',
        phone_number: billingData.phone,
        postal_code: billingData.postalCode || 'NA',
        extra_description: billingData.extraDescription || '',
        shipping_data: billingData.shipping || {
          apartment: 'NA',
          email: billingData.email,
          floor: 'NA',
          first_name: billingData.firstName,
          street: 'NA',
          building: 'NA',
          phone_number: billingData.phone,
          postal_code: 'NA',
          country: 'Morocco',
          last_name: billingData.lastName || '',
          city: billingData.city || 'Casablanca',
          floor: 'NA',
        },
        currency: 'MAD',
      },
      payment_token: null,
    }
  );

  return response.data.token;
}

export function getPaymentIframeUrl(paymentToken) {
  return `https://accept.paymob.com/api/acceptance/iframes/${import.meta.env.VITE_PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;
}

export async function processTokenizedPayment({ paymentToken, amount }) {
  const token = await authenticate();

  const response = await axios.post(
    `${PAYMOB_API_URL}/acceptance/payments/pay`,
    {
      source: {
        identifier: paymentToken,
        subtype: 'TOKEN',
      },
      payment_token: paymentToken,
      amount_cents: amount * 100,
    }
  );

  return response.data;
}

export function calculateVATBreakdown(basePriceMAD) {
  const VAT_RATE = 0.20;
  const vatAmount = Math.round(basePriceMAD * VAT_RATE);
  return {
    basePrice: basePriceMAD,
    vatRate: VAT_RATE,
    vatAmount,
    totalWithVat: basePriceMAD + vatAmount,
    currency: 'MAD',
  };
}

export const MOROCCAN_PAYMENT_METHODS = [
  { id: 'card', name: 'Carte Bancaire', icon: '💳' },
  { id: 'mada', name: 'Mada', icon: '🏦' },
  { id: 'mobile_wallet', name: 'Portefeuille Mobile', icon: '📱' },
  { id: 'cash_on_delivery', name: 'Paiement à la livraison', icon: '💵' },
];