const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api', async (req, res) => {
  const { apiUrl, method, headers, body } = req.body;

  try {
    const response = await axios({
      url: apiUrl,
      method: method,
      headers: headers,
      data: body
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
