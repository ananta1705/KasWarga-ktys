import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // Get password from environment variable, default to something if not set (for development)
    const adminPassword = process.env.ADMIN_PASSWORD || 'kertayasajaya';
    
    if (password === adminPassword) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
