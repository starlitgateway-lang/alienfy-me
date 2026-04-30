export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return res.status(200).json({ id: 'NO_TOKEN', error: 'token missing' });
  }

  const { image } = req.body;

  const prompt = "STARLIT acrylic painting on canvas, alien character portrait artwork, fully painted illustration, large smooth dome head, huge wraparound black almond eyes with white highlight dots, small blue diamond gem on forehead, colorful cosmic jumpsuit outfit, vibrant saturated acrylic paint colors, glowing painted cosmic space background with stars, full body alien character standing, whimsical expressive painted art, bold visible brushstrokes, fine art acrylic painting style, NOT a photograph, NOT realistic, NOT a real human, NO human face features, painterly artistic style only";

 const negative_prompt = "photorealistic, real person, photograph, human face, realistic skin texture, camera photo, hyper realistic, 3d render, realistic eyes, real hair, skin pores, beauty photo, portrait photo, fashion photo, instagram photo, realistic lighting, hand holding painting, canvas edge, wall background, floor, real room, photograph of painting, picture frame";

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
        negative_prompt: negative_prompt,
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
