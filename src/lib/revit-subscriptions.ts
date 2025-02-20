import { callQnectApi } from "./qnect-api";

// lib/qnect-api.ts
export async function processFreeTrialOrPurchase(data: {
  txn_id: string;
  custom: string;
  payment_status: string;
  item_number: string;
  payment_gross: number;
  txn_type: 'TRIAL' | 'subscr_payment';
  last_name: string;
  first_name: string;
  user_name: string;
  buyer_adsk_account: string;
  referer_account: string;
}) {
  const response = await callQnectApi('free_trial', data);
  return response.code === 1;
}