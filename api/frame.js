// pages/api/frame.js
// This is a Next.js API route that returns a Farcaster Frame.

export default async function handler(req, res) {
  // The URL of your deployed app.
  const baseUrl = "https://gm-miniapp-pearl.vercel.app";

  // 1. Extract the user's chosen chain from the request, or default to 'Base'
  const url = new URL(req.url, `http://${req.headers.host}`);
  const chain = url.searchParams.get('chain') || 'Base';

  // 2. Define the transaction we want to send (0.2 USDC on Base to your wallet)
  const txData = {
    chainId: "eip155:8453", // Base chain ID
    method: "eth_sendTransaction",
    params: {
      abi: [], // Not strictly needed for a simple transfer
      to: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC contract on Base
      data: `0xa9059cbb000000000000000000000000a361f8abf168b8c84485b86b4656327df483e0530000000000000000000000000000000000000000000000000000000000030d40`, 
      // This 'data' field is the encoded function call to transfer 0.2 USDC.
      // It calls `transfer(0xa361f8..., 200000)` (200000 = 0.2 USDC, 6 decimals)
      value: "0", // No ETH sent, only USDC
    },
  };

  // 3. If this is a POST request, it means a button was pressed in the Frame.
  if (req.method === 'POST') {
    // This is where we handle the "Send GM" button press
    // We return the transaction for the user's wallet to sign.
    res.status(200).setHeader('Content-Type', 'application/json').json(txData);
    return;
  }

  // 4. If it's a GET request, we render the Frame's HTML page.
  // This HTML is what Warpcast reads to display your Frame.
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>GM Frame</title>
      <meta property="og:title" content="GM Frame" />
      <meta property="og:image" content="${baseUrl}/api/image?chain=${chain}" />
      
      <meta name="fc:frame" content="vNext" />
      <meta name="fc:frame:image" content="${baseUrl}/api/image?chain=${chain}" />
      <meta name="fc:frame:post_url" content="${baseUrl}/api/frame?chain=${chain}" />
      <meta name="fc:frame:button:1" content="Send GM 🌐" />
      <meta name="fc:frame:button:1:action" content="tx" />
      <meta name="fc:frame:button:1:target" content="${baseUrl}/api/frame?chain=${chain}" />
      <meta name="fc:frame:button:1:post_url" content="${baseUrl}/api/complete" />
      
    </head>
    <body>
      <h1>GM Frame</h1>
    </body>
  </html>
  `;

  // Send the HTML response back to Warpcast
  res.status(200).setHeader('Content-Type', 'text/html').send(html);
}
