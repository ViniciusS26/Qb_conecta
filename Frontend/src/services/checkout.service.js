import { post, get } from './axios';

export async function createCheckout (priceId) {
  return post('v1/checkout', { priceId });
}

export async function getProducts () {
  return get('v1/checkout/products');
}

export async function cancelSubscription () {
  return post('v1/checkout/cancel');
}