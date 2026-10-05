<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset OTP</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f2f2f2; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <!-- Wrapper Table -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f2f2f2; padding: 30px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #1a1a1a; padding: 35px 20px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 23px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                Password Reset
              </h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 35px 20px 35px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #1a1a1a; line-height: 1.6;">
                Hi <strong style="color: #000000;">{{$user}}</strong>,
              </p>
              <p style="margin: 0 0 25px 0; font-size: 15px; color: #4d4d4d; line-height: 1.6;">
                We received a request to reset your password. Use the OTP below to complete the process. This code is valid for <strong style="color: #1a1a1a;">1 minute</strong>.
              </p>

              <!-- OTP Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 10px 0 28px 0;">
                    <div style="display: inline-block; background-color: #f5f5f5; border: 2px dashed #1a1a1a; border-radius: 8px; padding: 18px 40px;">
                      <span style="font-size: 34px; font-weight: 800; color: #000000; letter-spacing: 10px; font-family: 'Courier New', monospace;">
                        {{$otp_token}}
                      </span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Info Note -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5; border-left: 4px solid #1a1a1a; border-radius: 4px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 14px 18px;">
                    <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.5;">
                      🔒 <strong style="color: #000000;">Security Tip:</strong> Never share this OTP with anyone. Our team will never ask you for this code.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666666; line-height: 1.6;">
                If you didn't request a password reset, you can safely ignore this email. Your account remains secure.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 35px;">
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 25px 35px 35px 35px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #808080;">
                Need help? Contact us at
                <a href="mailto:support@yourdomain.com" style="color: #1a1a1a; text-decoration: none; font-weight: 600; border-bottom: 1px solid #1a1a1a;">support@yourdomain.com</a>
              </p>
              <p style="margin: 0; font-size: 12px; color: #b3b3b3;">
                © 2025 Your Company. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>