import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you'd fetch this from a database
  console.log("evaluation")
//   const evaluation = global.latestEvaluation || null

  return NextResponse.json({  })
}