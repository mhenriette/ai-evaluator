import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { submission } = await req.json()

  const prompt = `
As an evaluator for Blockchain Theory Submissions, please follow these guidelines:

1. Plagiarism:
   - If plagiarism is detected, award 0 points.
   - Use the standard plagiarism feedback comment.

Please evaluate the following Blockchain Theory Submission based on these guidelines:

${submission}

Provide your evaluation in the following format:
1. Feedback Comment (public)
2. Internal Feedback (not shown publicly)
3. Suggested Score (out of 100)

Rate the submission according to the following rubric:

1. Originality: 
   - Your use case is mentioned in our learning materials, already addressed by Bitcoin or a very similar idea was just submitted by your peers: 0 points
   - You suggested a common use case or it was not explained in enough detail, why blockchain tech has to be used: 1 point
   - Your use case is not very common but there are some projects who are trying to do something similar to what you described: 2 points
   - Your use case is very original and we have never heard of something like it in the way you described it: 3 points
2. Relevance
   - You didn’t describe the problem in enough detail to make it seem relevant and able to be addressed by blockchain technology: 0 points
   - You described a relevant problem that could be addressed using blockchain technology: 3 point
   - You convincingly explained why blockchain technology is needed to address a relevant problem: 5 points
   - You explained why blockchain technology would be needed to solve a relevant problem and laid out how it could work in practice: 6 points

3. Clarity
   - Your submission was hard to read or not in English: 0 points
   - Your submission was in English and easy to read: 1 points
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })

    const evaluation = completion.choices[0].message.content
    console.log(evaluation)

    // Store the evaluation result (you might want to use a database in a real application)
    // global.latestEvaluation = evaluation

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}

