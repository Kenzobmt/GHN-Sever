const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Đảm bảo request là POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, method, headers, body } = req.body;

    // Kiểm tra xem có đủ thông tin cần thiết không
    if (!url || !method) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Cấu hình request đến API GHN
    const fetchOptions = {
      method: method,
      headers: headers || {},
    };

    // Thêm body nếu có
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    // Gửi request đến API GHN
    const response = await fetch(url, fetchOptions);

    // Đọc response body
    const responseBody = await response.text();

    // Gửi response về cho client (Google Apps Script)
    res.status(response.status).send(responseBody);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'An error occurred while proxying the request' });
  }
};