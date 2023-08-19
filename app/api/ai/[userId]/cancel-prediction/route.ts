import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const predictionId = req.prediction_id as string;

  const apiUrl = `https://api.replicate.com/v1/predictions/${predictionId}/cancel`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept-Encoding': '*',
      Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`
    }
  });
  console.log(response.status);
  return NextResponse.json({ succesful: response.status === 200 });
}
