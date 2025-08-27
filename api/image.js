// pages/api/image.js
export default async function handler(req, res) {
  // Get the 'chain' from the query parameters (e.g., ?chain=Base)
  const { chain } = req.query;

  // A simple HTML image response. We'll create an image using SVG instead of the complex canvas library.
  // This is more reliable for deployment.
  const svg = `
  <svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="black"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">GM ${chain}! ☀️</text>
  </svg>
  `;

  // Set the header to tell the browser this is a PNG image
  res.setHeader('Content-Type', 'image/svg+xml');
  // Send the SVG code as the response
  res.send(svg);
}
