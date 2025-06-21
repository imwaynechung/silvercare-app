import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { firstName, email, whatsappNumber, userType, ageGroup, language = 'en' } = await req.json()

    // Mask WhatsApp number
    const maskedWhatsApp = whatsappNumber ? 
      `${whatsappNumber.slice(0, 4)}${'*'.repeat(whatsappNumber.length - 4)}` : 
      'Not provided';

    const ageGroupTranslations: Record<string, string> = {
      'under60': '60歲以下 / Under 60',
      '60to69': '60-69歲 / 60-69',
      '70to79': '70-79歲 / 70-79',
      '80plus': '80歲或以上 / 80 or above'
    }

    const userTypeTranslations: Record<string, string> = {
      'senior': '長者 / Senior',
      'caregiver': '照顧者 / Caregiver'
    }

    const response = await fetch('https://uat.gofa.app/api/email', {
      method: 'POST',
      headers: {
        'AdminToken': '9e1e7e551f5d57b8a9f5c6cd8be9386f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        toList: ["marketing@gofa.co", "diana.n@gofa.co", "gary.m@gofa.co"],
        fromName: "SilverCare Assessment System",
        fromEmail: "noreply@gofa.co",
        subject: `New SilverCare member has joined!`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #08449E; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .info-item { margin: 10px 0; }
              .label { font-weight: bold; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Assessment Registration</h2>
              </div>
              <div class="content">
                <div class="info-item">
                  <span class="label">Name:</span>
                  <span>${firstName}</span>
                </div>
                <div class="info-item">
                  <span class="label">Email:</span>
                  <span>${email || 'Not provided'}</span>
                </div>
                <div class="info-item">
                  <span class="label">WhatsApp:</span>
                  <span>${maskedWhatsApp}</span>
                </div>
                <div class="info-item">
                  <span class="label">User Type:</span>
                  <span>${userTypeTranslations[userType] || userType}</span>
                </div>
                <div class="info-item">
                  <span class="label">Age Group:</span>
                  <span>${ageGroupTranslations[ageGroup] || ageGroup || 'Not provided'}</span>
                </div>
                <div class="info-item">
                  <span class="label">Language:</span>
                  <span>${language === 'zh' ? '中文' : 'English'}</span>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send internal email')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})