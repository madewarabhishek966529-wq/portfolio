/**
 * Vercel Serverless Function: /api/contact
 * Direct server-side contact form handler for Abhishek Madewar's Portfolio.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, category, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log(`[Contact Form] Received message from ${name} (${email}) for category: ${category}`);

    // If Resend API Key is set in Vercel Environment Variables:
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'madewarabhishek966529@gmail.com',
          reply_to: email,
          subject: `[Portfolio Inquiry] ${category || 'General'} from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\n\nMessage:\n${message}`,
        }),
      });

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Message sent successfully via Resend' });
      }
    }

    // Default successful response
    return res.status(200).json({
      success: true,
      message: 'Transmission received successfully.',
    });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
