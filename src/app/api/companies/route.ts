import { NextResponse } from 'next/server';
import { getCompanies } from '@/lib/qnect-api';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, ut } = body;

    if (!email || !ut) {
      return NextResponse.json(
        { error: 'Email and user type are required' },
        { status: 400 }
      );
    }

    // Validate userType
    if (!['REVIT', 'TEKLA'].includes(ut)) {
      return NextResponse.json(
        { error: 'Invalid user type. Must be REVIT or TEKLA' },
        { status: 400 }
      );
    }

    // Call Qnect API to get companies
    const response = await getCompanies(email, ut as 'REVIT' | 'TEKLA');

    if (response.code === 1 && Array.isArray(response.Info)) {
      return NextResponse.json({ 
        success: true,
        companies: response.Info
      });
    } else {
      return NextResponse.json({ 
        success: false,
        message: response.Msg || 'Failed to fetch companies'
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
} 