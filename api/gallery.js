export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const response = await fetch(
    `${process.env.supabase_url}/rest/v1/gallery?select=*&order=created_at.desc&limit=50`,
    {
      headers: {
        'apikey': process.env.supabase_key,
        'Authorization': `Bearer ${process.env.supabase_key}`,
      }
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
