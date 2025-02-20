export async function callQnectApi(
  action: string,
  payload: Record<string, string | number>
): Promise<any> {
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
      throw new Error(`Qnect API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling Qnect API:', error);
    throw error;
  }
}
