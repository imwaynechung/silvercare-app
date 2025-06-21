import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface RegistrationRecord {
  id: string;
  first_name: string;
  email: string | null;
  relation: string;
  status: string | null;
  created_at: string;
  concerns: string[] | null;
  whatsapp_number: string | null;
  assessment_data: any | null;
  risk_level: string | null;
  fall_probability: number | null;
  report_id: string | null;
}

function convertToCSV(data: RegistrationRecord[]): string {
  if (data.length === 0) return '';

  // Define headers
  const headers = [
    'ID',
    'Name',
    'Email',
    'WhatsApp Number',
    'Relation',
    'Status',
    'Created At',
    'Concerns',
    'Risk Level',
    'Fall Probability (%)',
    'Report ID',
    'Age Group',
    'Has Frailty',
    'Fallen Last Year',
    'Taking Psychoactive Meds',
    'Difficulty with ADL',
    'Fearful of Falling',
    'Use Assistive Device'
  ];

  // Convert data to CSV rows
  const csvRows = [headers.join(',')];

  data.forEach(record => {
    const row = [
      `"${record.id}"`,
      `"${record.first_name || ''}"`,
      `"${record.email || 'Not provided'}"`,
      `"${record.whatsapp_number || 'Not provided'}"`,
      `"${record.relation || ''}"`,
      `"${record.status || ''}"`,
      `"${new Date(record.created_at).toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })}"`,
      `"${record.concerns ? record.concerns.join('; ') : ''}"`,
      `"${record.risk_level || ''}"`,
      `"${record.fall_probability || ''}"`,
      `"${record.report_id || ''}"`,
      `"${record.assessment_data?.ageGroup || ''}"`,
      `"${record.assessment_data?.hasFrailty ? 'Yes' : 'No'}"`,
      `"${record.assessment_data?.fallenLastYear ? 'Yes' : 'No'}"`,
      `"${record.assessment_data?.takingPsychoactiveMeds ? 'Yes' : 'No'}"`,
      `"${record.assessment_data?.difficultyWithADL ? 'Yes' : 'No'}"`,
      `"${record.assessment_data?.fearfulOfFalling ? 'Yes' : 'No'}"`,
      `"${record.assessment_data?.useAssistiveDevice ? 'Yes' : 'No'}"`
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}

function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

async function sendEmailWithAttachment(csvContent: string, recordCount: number): Promise<void> {
  const today = new Date().toLocaleDateString('en-HK', { 
    timeZone: 'Asia/Hong_Kong',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const csvBase64 = encodeBase64(csvContent);
  const filename = `registrations_${today.replace(/\//g, '-')}.csv`;

  // Use the existing GOFA email API with attachment support
  const emailPayload = {
    toList: ["gary.m@gofa.co", "diana.n@gofa.co", "business@gofa.co"],
    fromName: "SilverCare System",
    fromEmail: "noreply@gofa.co",
    subject: `Daily Registrations Report - ${today} (${recordCount} records)`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #08449E; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .stats { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Daily Registrations Report</h2>
            <p>Generated on ${today} at ${new Date().toLocaleTimeString('en-HK', { timeZone: 'Asia/Hong_Kong' })} HKT</p>
          </div>
          <div class="content">
            <div class="stats">
              <h3>Summary</h3>
              <p><strong>Total Registrations:</strong> ${recordCount}</p>
              <p><strong>Report Date:</strong> ${today}</p>
              <p><strong>File:</strong> ${filename}</p>
            </div>
            <p>Please find the complete registrations data attached as a CSV file. The file can be opened in Excel or any spreadsheet application.</p>
            <p>The report includes all registration records with assessment data, risk levels, and contact information.</p>
          </div>
          <div class="footer">
            <p>This is an automated report from SilverCare by GOFA</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: filename,
        content: csvBase64,
        type: "text/csv",
        disposition: "attachment"
      }
    ]
  };

  const response = await fetch('https://uat.gofa.app/api/email', {
    method: 'POST',
    headers: {
      'AdminToken': '9e1e7e551f5d57b8a9f5c6cd8be9386f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    console.log('Starting daily registrations report generation...');
    console.log('Current time:', new Date().toISOString());
    console.log('HK time:', new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' }));

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        }
      }
    );

    // Fetch all registrations data
    const { data: registrations, error } = await supabaseClient
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch registrations: ${error.message}`);
    }

    console.log(`Fetched ${registrations?.length || 0} registration records`);

    if (!registrations || registrations.length === 0) {
      console.log('No registrations found, sending empty report');
      await sendEmailWithAttachment('No registrations found', 0);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Empty report sent successfully',
          recordCount: 0,
          timestamp: new Date().toISOString(),
          hkTime: new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Convert to CSV
    const csvContent = convertToCSV(registrations);
    console.log('CSV content generated successfully');

    // Send email with attachment
    await sendEmailWithAttachment(csvContent, registrations.length);
    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Daily report sent successfully',
        recordCount: registrations.length,
        timestamp: new Date().toISOString(),
        hkTime: new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in send-registrations-report function:', error);
    
    // Send error notification email
    try {
      await fetch('https://uat.gofa.app/api/email', {
        method: 'POST',
        headers: {
          'AdminToken': '9e1e7e551f5d57b8a9f5c6cd8be9386f',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          toList: ["gary.m@gofa.co", "diana.n@gofa.co", "business@gofa.co"],
          fromName: "SilverCare System Alert",
          fromEmail: "noreply@gofa.co",
          subject: "⚠️ Daily Registrations Report Failed",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #dc2626;">Daily Report Generation Failed</h2>
              <p><strong>Error:</strong> ${error.message}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })} HKT</p>
              <p><strong>UTC Time:</strong> ${new Date().toISOString()}</p>
              <p>Please check the system logs and retry manually if needed.</p>
            </div>
          `
        })
      });
    } catch (emailError) {
      console.error('Failed to send error notification email:', emailError);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        hkTime: new Date().toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});