import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('autodesk_auth_state')?.value;

  if (!code || !state || state !== storedState) {
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
    const userEmail = userProfile.emailId;
    console.log(userEmail);

    // Create Stripe checkout session
    const checkoutResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: JSON.parse(cookieStore.get('cart_items')?.value || '[]'),
        customer: {
          email: userEmail,
        },
        autodesk_token: access_token,
      }),
    });

    if (!checkoutResponse.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await checkoutResponse.json();

    // Create a response with redirect
    const redirectResponse = NextResponse.redirect(url || new URL('/success', process.env.NEXT_PUBLIC_BASE_URL));
    
    // Set cookies for client-side access
    redirectResponse.cookies.set('autodesk_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    
    redirectResponse.cookies.set('autodesk_email', userEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Clear the state cookie
    redirectResponse.cookies.set('autodesk_auth_state', '', {
      maxAge: 0,
    });

    return redirectResponse;
  } catch (error) {
    console.error('Error in callback:', error);
    return NextResponse.redirect(new URL('/?error=auth_failed', process.env.NEXT_PUBLIC_BASE_URL));
  }
} 