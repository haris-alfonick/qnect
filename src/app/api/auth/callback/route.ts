import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('autodesk_auth_state')?.value;

  console.log('State verification:', { 
    receivedState: state, 
    allCookies: cookieStore.getAll().map(c => c.name)
  });

  if (!code || !state) {
    console.log('State mismatch:', { state, storedState });
    return NextResponse.redirect(new URL('/?error=invalid_state', process.env.NEXT_PUBLIC_BASE_URL));
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://developer.api.autodesk.com/authentication/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.AUTODESK_CLIENT_ID!,
        client_secret: process.env.AUTODESK_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }
    console.log('tokenResponse', tokenResponse);
    const { access_token } = await tokenResponse.json();

    // Get user profile to fetch email
    const profileResponse = await fetch('https://developer.api.autodesk.com/userprofile/v1/users/@me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to get user profile');
    }

    const userProfile = await profileResponse.json();
    const userEmail = userProfile;
    console.log(userEmail);

    // Store the token in a cookie
    const existingToken = cookieStore.get('autodesk_token');
    
    if (!existingToken) {
      const cookieStore = await cookies();
      cookieStore.set('autodesk_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 3600 // 1 hour
      });
    }

    // Store user details in sessionStorage
    const userDetails = {
      userId: userEmail.userId,
      userName: userEmail.userName,
      emailId: userEmail.emailId,
      firstName: userEmail.firstName,
      lastName: userEmail.lastName,
      emailVerified: userEmail.emailVerified
    };

    // Add script to set sessionStorage before redirect
    const html = `
      <script>
        sessionStorage.setItem('userDetails', JSON.stringify(${JSON.stringify(userDetails)}));
        window.location.href = '${process.env.NEXT_PUBLIC_BASE_URL}/checkout';
      </script>
    `;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error in callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', process.env.NEXT_PUBLIC_BASE_URL));
  }
} 