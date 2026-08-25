<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to the Team</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f0fb; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f0fb; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #eae6f5;">

          <!-- Header -->
          <tr>
            <td style="padding:24px 32px; border-bottom:1px solid #eee8f9;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:20px; padding-right:8px;">🛡️</td>
                  <td style="font-size:18px; font-weight:bold; color:#1a1a2e; font-family:Arial, Helvetica, sans-serif;">Admin Workspace</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <p style="margin:0 0 12px 0; font-size:24px; font-weight:bold; color:#1a1a2e; font-family:Arial, Helvetica, sans-serif;">
                Welcome to the Team, {{$name}}!
              </p>
              <p style="margin:0; font-size:15px; line-height:1.6; color:#555555; font-family:Arial, Helvetica, sans-serif;">
                We're thrilled to have you on board. You have been granted access to the management portal where you can oversee dashboard operations, manage users, and review recent activity.
              </p>
            </td>
          </tr>

          <!-- Credentials Box -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2eefb; border-radius:8px;">
                <tr>
                  <td style="padding:20px 24px 8px 24px;">
                    <p style="margin:0 0 12px 0; font-size:12px; font-weight:bold; letter-spacing:0.5px; color:#6b6b80; font-family:Arial, Helvetica, sans-serif;">
                      YOUR LOGIN CREDENTIALS
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #e2ddf2;">
                      <tr>
                        <td style="padding:12px 0; font-size:14px; color:#555555; font-family:Arial, Helvetica, sans-serif;">Dashboard URL</td>
                        <td align="right" style="padding:12px 0; font-size:14px; font-weight:bold; color:#1a1a2e; font-family:Arial, Helvetica, sans-serif;">admin.slowliving.com</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #e2ddf2;">
                      <tr>
                        <td style="padding:12px 0; font-size:14px; color:#555555; font-family:Arial, Helvetica, sans-serif;">Username</td>
                        <td align="right" style="padding:12px 0; font-size:14px; font-weight:bold; color:#1a1a2e; font-family:Arial, Helvetica, sans-serif;">{{$email}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 24px 20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:12px 0; font-size:14px; color:#555555; font-family:Arial, Helvetica, sans-serif;">Temporary Password</td>
                        <td align="right" style="padding:12px 0;">
                          <span style="display:inline-block; background-color:#e2d9fb; color:#4b3fd6; font-weight:bold; font-size:14px; padding:6px 12px; border-radius:6px; font-family:'Courier New', Courier, monospace;">
                            {{$password}}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:32px 32px 8px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color:#4f3fe0; border-radius:24px;">
                    <a href="https://admin.slowliving.com" style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:bold; color:#ffffff; text-decoration:none; font-family:Arial, Helvetica, sans-serif;">
                      Access My Account &nbsp;&rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f6fa; border-radius:8px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px 0; font-size:14px; font-weight:bold; color:#1a1a2e; font-family:Arial, Helvetica, sans-serif;">
                      🛡️ Security Note
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:14px; color:#555555; padding-bottom:6px; font-family:Arial, Helvetica, sans-serif;">&bull;&nbsp;&nbsp;Please change your password immediately upon your first login.</td>
                      </tr>
                      <tr>
                        <td style="font-size:14px; color:#555555; font-family:Arial, Helvetica, sans-serif;">&bull;&nbsp;&nbsp;Enable Two-Factor Authentication (2FA) in your Account Settings.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:#f3f0fb; padding:20px 32px; border-top:1px solid #eae6f5;">
              <p style="margin:0 0 4px 0; font-size:13px; color:#555555; font-family:Arial, Helvetica, sans-serif;">
                Need help? Contact the <a href="#" style="color:#4f3fe0; text-decoration:none;">System Administrator</a>.
              </p>
              <p style="margin:0; font-size:12px; color:#999999; font-family:Arial, Helvetica, sans-serif;">
                &copy; 2024 Admin Workspace. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>