interface QnectApiResponse {
  code: number;
  Msg?: string;
  Info?: Record<string, unknown> | unknown[];
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
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
