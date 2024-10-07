require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3005;

// Secret key from environment variables
const secretKey = process.env.SECRET_KEY;
const apiKey = process.env.API_KEY;

if (!secretKey) {
  console.error('SECRET_KEY must be set in the environment');
  process.exit(1);
}

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configure CORS to only accept traffic from any origin
const corsOptions = {
  origin: '*',
};

// Use the cors middleware
app.use(cors(corsOptions));

// Function to generate a nonce (e.g., a timestamp or a random string)
function generateNonce() {
  return Date.now().toString(); // You can use a more sophisticated method if needed
}

// Function to generate HMAC signature
function generateHMAC(nonce) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(nonce + apiKey);
  return hmac.digest('hex');
}

// Endpoint to generate HMAC signature
app.get('/v1/signature', (req, res) => {
  const nonce = generateNonce();
  const signature = generateHMAC(nonce);
  
  res.json({
    apiKey,
    signature,
    nonce,
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});