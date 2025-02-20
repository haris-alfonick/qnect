import { callQnectApi } from "./qnect-api";

// lib/qnect-api.ts
export async function validateEmail(email: string, ut: 'REVIT') {
  const response = await callQnectApi('verify_email', {
    action: 'verify_email',
    ut,
    email,
  });

  return response.code === 1;
}