// ./app/api/frames/route.ts
 
// export { POST } from "frames.js/next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import { validateActionSignature } from 'frames.js/next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { untrustedData, trustedData } = req.body;

    // Optionally verify the trustedData if your application requires it
    const verifiedData = await validateActionSignature(trustedData).catch((error) => {
      console.error('Failed to verify trustedData:', error);
      return null; // Handle the error appropriately
    });

    if (!verifiedData) {
      // Handle the error if verification fails
      return res.status(400).json({ error: 'Invalid or unverifiable data received.' });
    }

    // Use the verifiedData for further logic, such as updating state or responding to the action
    // For example, updating the state based on the button clicked

    // Respond to the POST request indicating successful processing
    return res.status(200).json({ message: 'Action processed successfully.' });
  } else {
    // Method not allowed
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}