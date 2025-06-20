export interface QnectApiResponse {
  code: number;
  Msg?: string;
  Info?: Record<string, unknown> | unknown[];
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
}

interface FreeTrialData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  referEmail?: string;
  message?: string;
}

interface RevitPurchaseData {
  action: string;
  txn_id: string;
  company_id?: number | string;
  quantity: number;
  txn_type: 'TRIAL' | 'subscr_payment';
  last_name: string;
  first_name: string;
  buyer_adsk_account: string;
  referer_account?: string;
}

// interface getCompaniesData {
//   action: string;
//   ut: string;
//   email: string;
// }

interface Company {
  id: number;
  name: string;
}

export async function callQnectApi(
  action: string,
  payload: Record<string, string | number>
): Promise<QnectApiResponse> {
  // Convert payload to x-www-form-urlencoded format
  const formData = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    formData.append(key, value.toString());
  }

  const requestBody = formData.toString();

  try {
    const response = await fetch('https://dev1.app.qnect.com/cgi-bin/InitiateDBImport/QnectApi.cgi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      code: data.Code || 0,
      Msg: data.Msg,
      Info: data.Info,
      success: data.Code === 1,
      message: data.Msg,
      data: data.Info
    };
  } catch (error) {
    return {
      code: 0,
      Msg: error instanceof Error ? error.message : 'An unknown error occurred',
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function verifyEmail(email: string, userType: 'REVIT' | 'TEKLA' | 'QNECT'): Promise<QnectApiResponse> {
  return callQnectApi('verify_email', {
    ut: userType,
    email: email
  });
}

export async function getCompanies(email: string, userType: 'REVIT' | 'TEKLA'): Promise<QnectApiResponse & { companies?: Company[] }> {
  const response = await callQnectApi('get_company', {
    action: 'get_company',
    ut: userType,
    email: email
  });

  if (response.code === 1 && Array.isArray(response.Info)) {
    return {
      ...response,
      companies: response.Info as Company[]
    };
  }

  return response;
}

export async function processRevitPurchase(data: RevitPurchaseData): Promise<QnectApiResponse> {
  const payload: Record<string, string | number> = {
    action: data.action,
    txn_id: data.txn_id,
    quantity: data.quantity,
    txn_type: data.txn_type,
    last_name: data.last_name,
    first_name: data.first_name,
    buyer_adsk_account: data.buyer_adsk_account,
    referer_account: data.referer_account || ''
  };

  // Add company_id to payload only if it exists
  if (data.company_id !== undefined) {
    payload.company_id = data.company_id;
  }

  return callQnectApi('process_revit', payload);
}

export async function addTokens(
  userType: 'TEKLA',
  companyId: number,
  tokenCount: number,
  customMessage: string,
  ref: string
): Promise<QnectApiResponse> {
  return callQnectApi('add_tokens', {
    action: 'add_tokens', // ✅ add this line
    ut: userType,
    company: companyId,
    t: tokenCount,
    custom: customMessage,
    ref: ref
  });
}

export async function createFreeTrial(data: FreeTrialData): Promise<QnectApiResponse> {
  return callQnectApi('createFreeTrial', {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    referEmail: data.referEmail || '',
    message: data.message || ''
  });
}
