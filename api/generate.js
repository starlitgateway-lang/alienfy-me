export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return res.status(200).json({ id: 'NO_TOKEN', error: 'token missing' });
  }

  const { prompt, image } = req.body;

  const prompt = "STARLIT style acrylic painting, alien portrait artwork, large dome head, huge black almond eyes with white highlight dots, diamond gem on forehead, colorful cosmic jumpsuit, painted acrylic art style, glowing cosmic painted background, full body alien character, whimsical expressive painted character, NOT photorealistic, NOT a real person, painterly brushstrokes, fine art painting";

 const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: '83757c9d89034c2543a5bcfff8e82983dcb2ebd17cc6799f9ababc1aedd3a598',
      input: {
        prompt: prompt,
        negative_prompt: "photorealistic, real person, photograph, human face, realistic skin, camera photo, hyper realistic, 3d render",
        image: image,
        num_outputs: 1,
        num_inference_steps: 28,
        guidance_scale: 4.5,
        output_format: 'png',
        output_quality: 90,
        image_to_image_strength: 0.6,
      }
    })
  });

  const data = await response.json();
  console.log("Replicate response:", JSON.stringify(data));
  res.status(200).json(data);
}
