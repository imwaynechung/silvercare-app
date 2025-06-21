# Daily Registrations Report Function

This Edge Function automatically generates and sends daily registration reports via email with CSV attachments.

## Features

- Fetches all registration data from the database
- Converts data to CSV format with comprehensive fields
- Sends email with CSV attachment to specified recipients
- Includes assessment data and risk levels
- Handles errors gracefully with notification emails
- **Scheduled to run twice daily at 3:30 PM HKT and 11:30 PM HKT**

## Recipients

- gary.m@gofa.co
- diana.n@gofa.co  
- business@gofa.co

## CSV Fields Included

- Basic Info: ID, Name, Email, WhatsApp, Relation, Status, Created At
- Assessment Data: Age Group, Risk Level, Fall Probability
- Health Indicators: Frailty, Fall History, Medications, etc.
- Concerns and Report ID

## Scheduling

The function is scheduled to run twice daily:

- **3:30 PM HKT** (7:30 AM UTC) - Cron: `30 7 * * *`
- **11:30 PM HKT** (3:30 PM UTC) - Cron: `30 15 * * *`

### Deployment Commands

To deploy the function with dual schedules:

```bash
# Deploy the function first
supabase functions deploy send-registrations-report

# Set up cron schedules (if supported by your Supabase plan)
# Note: Multiple schedules may require separate deployments or external scheduling
```

### Alternative: GitHub Actions Scheduling

For reliable dual scheduling, use GitHub Actions with `.github/workflows/daily-report.yml`:

```yaml
name: Daily Registrations Report
on:
  schedule:
    - cron: '30 7 * * *'   # 3:30 PM HKT (7:30 AM UTC)
    - cron: '30 15 * * *'  # 11:30 PM HKT (3:30 PM UTC)
  workflow_dispatch:  # Allow manual trigger

jobs:
  send-report:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Report
        run: |
          curl -X POST https://dseacnhqknljujkkmniv.supabase.co/functions/v1/send-registrations-report \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

## Manual Testing

You can test the function manually by calling:

```bash
curl -X POST https://dseacnhqknljujkkmniv.supabase.co/functions/v1/send-registrations-report \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Error Handling

- If the function fails, an error notification email is sent to the same recipients
- All errors are logged with timestamps in both UTC and HK time
- Empty reports are handled gracefully
- Enhanced logging shows execution times in both UTC and HK timezone

## Dependencies

- Uses existing GOFA email API with attachment support
- Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
- No additional secrets needed as it uses the existing email service

## Troubleshooting

1. **Check Supabase Dashboard**: Look for function logs and execution history
2. **Verify Environment Variables**: Ensure all required env vars are set
3. **Test Manually**: Use curl to test the function directly
4. **Check Email Delivery**: Verify emails are not going to spam
5. **Monitor Logs**: Check both success and error logs for patterns
6. **Timezone Verification**: Logs now include both UTC and HK time for debugging

## Logging Enhancements

The function now includes enhanced logging:
- Start time in both UTC and HK timezone
- Record count and processing status
- Detailed error information with timestamps
- Success confirmations with timing data