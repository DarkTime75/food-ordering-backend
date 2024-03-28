export function getPasswordResetLinkHtmlBody(passwordResetLink) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            /* Basic styling for email body */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333;
            }
            p {
                color: #666;
            }
            .reset-link {
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset</h2>
            <p>You have requested to reset your password. Please click the link below to reset your password:</p>
            <p><a class="reset-link" href="${passwordResetLink}">Reset Password</a></p>
            <p><strong>Note:</strong> This link is valid for 1 hour only.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    </body>
    </html>
    `;
}