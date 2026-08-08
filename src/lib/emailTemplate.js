// lib/emailTemplate.js

/**
 * Generate a premium HTML email template for leads.
 * Uses inline CSS for maximum email client compatibility.
 */
export function generateEmailHtml(formName, data) {
  const {
    fullName = '',
    email = '',
    phone = '',
    company = '',
    selectedService = '',
    budget = '',
    website = '',
    city = '',
    state = '',
    country = '',
    message = '',
    ip = '',
    browser = '',
    device = '',
    referrer = '',
    submittedAt = new Date().toLocaleString(),
  } = data;

  const rows = [
    ['Full Name', fullName],
    ['Email Address', email],
    ['Phone Number', phone],
    ['Company Name', company],
    ['Selected Service', selectedService],
    ['Budget', budget],
    ['Website URL', website],
    ['City', city],
    ['State', state],
    ['Country', country],
    ['Message', message],
    ['Form Name', formName],
    ['Submission Date & Time', submittedAt],
    ['User IP Address', ip],
    ['Browser', browser],
    ['Device', device],
    ['Referrer URL', referrer],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px; color:#333; font-weight:600; border-bottom:1px solid #eaeaea;">${label}</td>
        <td style="padding:8px 12px; color:#555; border-bottom:1px solid #eaeaea; word-break:break-word;">${value}</td>
      </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Lead Received</title>
  </head>
  <body style="margin:0; padding:0; background:#f9f9f9; font-family:Arial,sans-serif;">
    <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background:#ff5722; padding:20px; text-align:center; color:#fff;">
        <h1 style="margin:0; font-size:24px;">Digital Marketing TenX</h1>
        <p style="margin:4px 0 0; font-size:16px;">New Lead Received</p>
      </div>
      <!-- Body -->
      <div style="padding:24px;">
        <h2 style="font-size:20px; color:#333; margin-top:0;">Lead Information</h2>
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
          ${tableRows}
        </table>
      </div>
      <!-- Footer -->
      <div style="background:#fafafa; padding:16px; text-align:center; color:#777; font-size:12px;">
        © ${new Date().getFullYear()} Digital Marketing TenX. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
}

