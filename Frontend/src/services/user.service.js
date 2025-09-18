import { get } from './axios';

export async function getCurrentUser (hub) {
  return get('v1/auth/me', hub);
}

export async function getUserAccounts (hub) {
	return get('v1/accounts', hub);
}