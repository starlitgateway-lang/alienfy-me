export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { prompt, image } = req.body;

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token r8_2ftsKYcRvxAzPHyMMHl5ercP5Gxrksf1Bhmur`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: '83757c9d89034c2543a5bcfff8e82983dcb2ebd17cc6799f9ababc1aedd3a598',
      input: {
        prompt: prompt,
        image: image,
        num_outputs: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        output_format: 'png',
        output_quality: 90,
        image_to_image_strength: 0.7,
      }
    })
  });

  const data = await response.json();
  console.log("Replicate response:", JSON.stringify(data));
  res.status(200).json(data);
}
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // DEBUG - remove after testing
  console.log("Token exists:", !!process.env.REPLICATE_API_TOKEN);
  console.log("Token starts with:", process.env.REPLICATE_API_TOKEN?.substring(0, 8));
