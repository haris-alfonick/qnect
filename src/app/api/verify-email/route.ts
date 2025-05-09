import { NextResponse } from 'next/server';
import { verifyEmail } from '@/lib/qnect-api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('body', body);
    const { email, userType } = body;

    if (!email || !userType) {
      return NextResponse.json(
        { error: 'Email and user type are required' },
        { status: 400 }
      );
    }

    // Validate userType
    if (!['REVIT', 'TEKLA', 'QNECT'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type. Must be REVIT, TEKLA, or QNECT' },
        { status: 400 }
      );
    }

    // Call Qnect API to verify email
    const response = await verifyEmail(email, userType as 'REVIT' | 'TEKLA' | 'QNECT');
    console.log('response', response);

    // Check response code
    if (response.code === 1) {
      return NextResponse.json({ 
        success: true,
        message: 'Email verified successfully'
      });
    } else {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid email or user type'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 