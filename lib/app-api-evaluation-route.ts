import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you'd fetch this from a database
  const evaluation = global.latestEvaluation || null

  return NextResponse.json({ evaluation })
}