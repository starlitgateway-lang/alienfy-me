export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { prompt } = req.body;

    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '83757c9d',
        input: {
          prompt: prompt,
          num_outputs: 1,
          num_inference_steps: 28,
          guidance_scale: 3.5,
          output_format: 'png',
          output_quality: 90,
        }
      })
    });

    const text = await response.text();
    console.log("Replicate raw response:", text);
    
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch(e) {
      res.status(500).json({ error: "Replicate error: " + text });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
