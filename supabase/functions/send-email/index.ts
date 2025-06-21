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
    const { firstName, email, whatsappNumber, relation, reportId, language = 'en' } = await req.json()

    // Generate report URL if reportId exists
    const reportUrl = reportId ? 
      `https://silvercare.gofa.co/report${language === 'zh' ? '-zh' : ''}/${reportId}` : 
      null;

    // Quick assessment URL
    const quickAssessmentUrl = `https://silvercare.gofa.co${language === 'zh' ? '/chatbot-zh' : '/chatbot'}`;

    // Mask WhatsApp number
    const maskedWhatsApp = whatsappNumber ? 
      `${whatsappNumber.slice(0, 4)}${'*'.repeat(whatsappNumber.length - 4)}` : 
      'Not provided';

    const response = await fetch('https://uat.gofa.app/api/email', {
      method: 'POST',
      headers: {
        'AdminToken': '9e1e7e551f5d57b8a9f5c6cd8be9386f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        toList: [email || "business@gofa.co"],
        ccList: ["business@gofa.co"],
        fromName: language === 'zh' ? "GOFA 銀齡樂評估" : "GOFA SilverCare Assessment",
        fromEmail: "noreply@gofa.co",
        subject: language === 'zh' ? "恭喜您！您已成為銀齡樂創始會員" : "Welcome to SilverCare!",
        htmlContent: language === 'zh' ? `
          <!DOCTYPE html>
          <html lang="zh">
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.8; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #08449E, #063275); padding: 30px 20px; text-align: center; }
              .logo { width: 180px; height: auto; margin-bottom: 20px; }
              .content { padding: 40px 30px; }
              .footer { text-align: center; padding: 20px; background-color: #f1f5f9; }
              h1 { font-size: 28px; color: white; margin: 0; }
              .contact-info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
              .report-link { margin: 20px 0; padding: 10px; background-color: #f8fafc; border-radius: 4px; }
              .cta-button { display: inline-block; padding: 10px 20px; background-color: #08449E; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
              .video-section { background-color: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .video-button { display: inline-block; padding: 10px 20px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://iili.io/3rSv1St.png" alt="GOFA Logo" class="logo">
                <h1>歡迎加入銀齡樂大家庭！</h1>
              </div>
              <div class="content">
                <p>親愛的 ${firstName}：</p>
                <p>感謝您採取主動關注健康，為自己和家人的未來作好準備。您比97%的香港人更早關注跌倒預防，這是邁向健康生活的重要一步！</p>
                <p>我們的團隊將會透過以下聯絡方式與您聯繫：</p>
                <p>WhatsApp：${maskedWhatsApp}</p>
                <p>我們將在48小時內與您聯絡，為您介紹防跌計劃詳情。</p>
                ${reportId ? `
                  <div class="report-link">
                    <p>查看您的評估報告：${reportUrl}</p>
                  </div>
                ` : `
                  <div class="report-link">
                    <p>在我們為您準備全面AI評估之前，您可以先進行快速評估，了解您的跌倒風險：</p>
                    <a href="${quickAssessmentUrl}" class="cta-button">立即進行快速評估</a>
                  </div>
                `}
                <div class="video-section">
                  <h2>了解更多關於銀齡樂</h2>
                  <p>觀看我們的介紹影片，了解銀齡樂如何幫助預防跌倒，保護您的摯愛。</p>
                  <a href="https://youtu.be/NdO9QaRa-pA" class="video-button" target="_blank">觀看介紹影片</a>
                </div>
              </div>
              <div class="footer">
                <div class="contact-info">
                  <p>關注我們的社交媒體：</p>
                  <p>
                    <a href="https://www.facebook.com/people/Gofa銀齡樂/61575923133608/">Facebook</a> | 
                    <a href="https://www.instagram.com/gofa.silvercare.zh">Instagram</a>
                  </p>
                  <p>聯絡我們：<a href="mailto:business@gofa.co">business@gofa.co</a></p>
                </div>
                <p>此為銀齡樂系統自動發送的訊息</p>
              </div>
            </div>
          </body>
          </html>
        ` : `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.8; margin: 0; padding: 0; background-color: #f8fafc; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #08449E, #063275); padding: 30px 20px; text-align: center; }
              .logo { width: 180px; height: auto; margin-bottom: 20px; }
              .content { padding: 40px 30px; }
              .footer { text-align: center; padding: 20px; background-color: #f1f5f9; }
              h1 { font-size: 28px; color: white; margin: 0; }
              .contact-info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
              .report-link { margin: 20px 0; padding: 10px; background-color: #f8fafc; border-radius: 4px; }
              .cta-button { display: inline-block; padding: 10px 20px; background-color: #08449E; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
              .video-section { background-color: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; }
              .video-button { display: inline-block; padding: 10px 20px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://iili.io/3rSv1St.png" alt="GOFA Logo" class="logo">
                <h1>Welcome to SilverCare!</h1>
              </div>
              <div class="content">
                <p>Dear ${firstName},</p>
                <p>Thank you for taking proactive steps towards your health and well-being. You're ahead of 97% of Hong Kong residents in addressing fall prevention - that's a significant step towards a healthier future!</p>
                <p>Our team will contact you via:</p>
                <p>WhatsApp: ${maskedWhatsApp}</p>
                <p>We'll be in touch within 48 hours to guide you through your personalized fall prevention journey.</p>
                ${reportId ? `
                  <div class="report-link">
                    <p>View your assessment report: ${reportUrl}</p>
                  </div>
                ` : `
                  <div class="report-link">
                    <p>Before we conduct your comprehensive AI assessment, you can take a quick assessment to understand your fall risk:</p>
                    <a href="${quickAssessmentUrl}" class="cta-button">Take Quick Assessment Now</a>
                  </div>
                `}
                <div class="video-section">
                  <h2>Learn More About SilverCare</h2>
                  <p>Watch our introduction video to see how SilverCare can help prevent falls and protect your loved ones.</p>
                  <a href="https://youtu.be/NdO9QaRa-pA" class="video-button" target="_blank">Watch Introduction Video</a>
                </div>
              </div>
              <div class="footer">
                <div class="contact-info">
                  <p>Follow us on social media:</p>
                  <p>
                    <a href="https://www.facebook.com/gofaapp">Facebook</a> | 
                    <a href="https://www.instagram.com/gofa.silvercare">Instagram</a>
                  </p>
                  <p>Contact us: <a href="mailto:business@gofa.co">business@gofa.co</a></p>
                </div>
                <p>This is an automated message from SilverCare by GOFA</p>
              </div>
            </div>
          </body>
          </html>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email')
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