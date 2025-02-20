import { callQnectApi } from "./qnect-api";

// lib/qnect-api.ts
export async function getCompanies(email: string, ut: 'REVIT' | 'TEKLA') {
  const response = await callQnectApi('get_company', {
    action: 'get_company',
    ut,
    email,
  });

  if (response.code === 1) {
    return response.Info;
  }
  throw new Error(response.Msg || 'Failed to fetch companies');
}