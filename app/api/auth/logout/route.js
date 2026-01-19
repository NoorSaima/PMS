import { NextResponse } from 'next/server';
import { signOut } from '@/lib/auth';

export async function POST(request) {
  try {
    // Sign out the user - this will clear their session and tokens
    await signOut();

    return NextResponse.json({
      success: true,
      message: 'Logout successful',
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed', message: error.message },
      { status: 500 }
    );
  }
}
