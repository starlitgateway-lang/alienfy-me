export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { id } = req.query;
  
  const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: {
      'Authorization': `Token r8_9XdMegrSNNwa9noZrJ3cYOKn6Bm0Vb71fV8iQ`,
    }
  });
  
  const data = await response.json();
  res.status(200).json(data);
}
