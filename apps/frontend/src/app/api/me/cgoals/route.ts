import { NextResponse } from 'next/server'

// Stub endpoint for Optimizely One content goals.
// Returns empty array when the cgoals service is not configured.
export const GET = () => NextResponse.json([])
export const dynamic = 'force-dynamic'
