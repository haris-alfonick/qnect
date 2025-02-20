import { callQnectApi } from "./qnect-api";

// lib/qnect-api.ts
export async function addTokens(ut: 'TEKLA', companyId: number, tokenCount: number, custom: string) {
  const response = await callQnectApi('add_tokens', {
    action: 'add_tokens',
    ut,
    company: companyId,
    t: tokenCount,
    custom,
  });

  if (response.code === 1) {
    return response.Msg;
  }
  throw new Error(response.Msg || 'Failed to add tokens');
}