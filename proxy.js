const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/api/images', async (req, res) => {
  try {
    const apiRep = await fetch('https://openapi.radiofrance.fr');
    const data = await apiRep.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(5173, () => {
  console.log('Server is running on port 5173');
});
