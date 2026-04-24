export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { id } = req.query;
  
  const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      'Authorization': `Token r8_FuYZInV3a3w7z4ynZCTkt0u4TjE9gtq2WK9IQ`,
    }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
