import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        }
      }
    );

    // Get table info and count
    const { count, error: countError } = await supabaseClient
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new Error(`Failed to get count: ${countError.message}`);
    }

    // Get sample data (first row)
    const { data: sampleData, error: sampleError } = await supabaseClient
      .from('registrations')
      .select('id, created_at')
      .limit(1)
      .single();

    if (sampleError && sampleError.code !== 'PGRST116') {
      throw new Error(`Failed to get sample: ${sampleError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        count,
        hasAccess: true,
        sampleData: sampleData || null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        hasAccess: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});