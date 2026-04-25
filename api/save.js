export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { image_url, source } = req.body;

  const response = await fetch(`${process.env.supabase_url}/rest/v1/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.supabase_key,
      'Authorization': `Bearer ${process.env.supabase_key}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ image_url, source })
  });

  const data = await response.json();
  res.status(200).json(data);
}
