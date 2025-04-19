interface QnectApiResponse {
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
  txn_id: string;
  custom: string;
  payment_status: 'Completed' | 'Failed';
  item_number: string;
  item_name: string;
  quantity: number;
  payment_gross: number;
  txn_type: 'TRIAL' | 'subscr_payment';
  last_name: string;
  first_name: string;
  user_name: string;
  buyer_adsk_account: string;
  referer_account?: string;
}

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

  try {
    const response = await fetch('https://dev1.app.qnect.com/cgi-bin/InitiateDBImport/QnectApi.cgi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      code: data.code || 0,
      Msg: data.Msg,
      Info: data.Info,
      success: data.code === 1,
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
  return callQnectApi('process_revit', {
    txn_id: data.txn_id,
    custom: data.custom,
    payment_status: data.payment_status,
    item_number: data.item_number,
    item_name: data.item_name,
    quantity: data.quantity,
    payment_gross: data.payment_gross,
    txn_type: data.txn_type,
    last_name: data.last_name,
    first_name: data.first_name,
    user_name: data.user_name,
    buyer_adsk_account: data.buyer_adsk_account,
    referer_account: data.referer_account || ''
  });
}

export async function addTokens(userType: 'TEKLA', companyId: number, tokenCount: number, customMessage: string): Promise<QnectApiResponse> {
  return callQnectApi('add_tokens', {
    ut: userType,
    company: companyId,
    t: tokenCount,
    custom: customMessage
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
