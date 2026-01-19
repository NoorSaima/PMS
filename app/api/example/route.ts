import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/getServerSession';

/**
 * Example API route showing how to use user-specific access tokens
 * Each authenticated user will have their own token stored in their session
 */
export async function GET(request) {
  try {
    // Get the current user's access token from their session
    const accessToken = await getAccessToken();
    
    // Example: Make an authenticated API call using the user's token
    const url = `${process.env.PUBLIC_API_BASE_URL}/api/YourEndpoint`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`, // User-specific token
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
    });

  } catch (error) {
    console.error('API error:', error);
    
    // If user is not authenticated, getAccessToken will throw an error
    if (error.message.includes('No access token available')) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Please login first' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Request failed', message: error.message },
      { status: 500 }
    );
  }
}
