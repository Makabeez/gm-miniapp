// pages/api/image.js
// This generates the image that appears in the Frame.
import { createCanvas } from '@napi-rs/canvas';

export default async function handler(req, res) {
  const { chain } = req.query;
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Draw a background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 800, 400);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`GM ${chain}! ☀️`, 400, 200);

  const buffer = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.send(buffer);
}
