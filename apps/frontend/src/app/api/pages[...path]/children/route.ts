// Alternative approach - create a separate "children" endpoint
import { NextRequest, NextResponse } from 'next/server';
import { getClientConfig } from '@remkoj/optimizely-dxp-react';
import { createContentGraphClient } from '@remkoj/optimizely-dxp-nextjs';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  console.log("Requesting children, path params:", params.path);
  
  try {
    // Format the path correctly
    const pagePath = `/${params.path.join('/')}`;
    
    // Rest of the implementation is the same as above...
  } catch (error) {
    console.error('Error fetching child pages:', error);
    return NextResponse.json({ error: 'Failed to fetch child pages' }, { status: 500 });
  }
}
