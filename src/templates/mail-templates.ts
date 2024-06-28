export enum MailTemplateEnum {
  WELCOME = 'WELCOME',
  RESETPASSWORD = 'RESETPASSWORD',
  VERIFYEMAIL = 'VERIFYEMAIL',
  DELETEACCOUNT = 'DELETEACCOUNT',
  WELCOMECHATAPP = 'WELCOMECHATAPP',
}

export const MailSubjects = {
  [MailTemplateEnum.WELCOME]: 'Welcome to Our Platform!',
  [MailTemplateEnum.RESETPASSWORD]: 'Reset Your Password',
  [MailTemplateEnum.VERIFYEMAIL]: 'Verify Your Email Address',
  [MailTemplateEnum.DELETEACCOUNT]: 'Your Account Has Been Deleted',
  [MailTemplateEnum.WELCOMECHATAPP]: 'Welcome to ChatApp!',
};

const sharedStyles = `
	<style>
	  body {
		font-family: Arial, sans-serif;
		background-color: #f6f6f6;
		margin: 0;
		padding: 0;
		color: #333;
	  }
	  .container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		background-color: #ffffff;
		padding: 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	  }
	  .header {
		text-align: center;
		padding: 10px 0;
		background-color: #007bff;
		color: #ffffff;
	  }
	  .content {
		padding: 20px;
	  }
	  .button {
		display: inline-block;
		padding: 10px 20px;
		margin: 20px 0;
		color: #ffffff;
		background-color: #007bff;
		text-decoration: none;
		border-radius: 5px;
	  }
	  .footer {
		text-align: center;
		padding: 10px;
		font-size: 12px;
		color: #999999;
	  }
	</style>
  `;

export const getMailTemplate = (
  templateName: string,
  placeholders: Record<string, string>,
): string => {
  const templates = {
    [MailTemplateEnum.WELCOME]: `
		<html>
		  <head>
			${sharedStyles}
		  </head>
		  <body>
			<div class="container">
			  <div class="header">
				<h1>Welcome to ChatApp</h1>
			  </div>
			  <div class="content">
				<h2>Hello, ${placeholders.name}</h2>
				<p>Thank you for joining our chat platform. We're excited to have you on board and look forward to providing you with the best chat experience possible.</p>
			  </div>
			  <div class="footer">
				<p>&copy; ${new Date().getFullYear()} ChatApp. All rights reserved.</p>
			  </div>
			</div>
		  </body>
		</html>
	  `,
    [MailTemplateEnum.RESETPASSWORD]: `
		<html>
		  <head>
			${sharedStyles}
		  </head>
		  <body>
			<div class="container">
			  <div class="header" style="background-color: #dc3545;">
				<h1>Reset Password Request</h1>
			  </div>
			  <div class="content">
				<h2>Hello, ${placeholders.name}</h2>
				<p>We received a request to reset your password. Click the button below to reset your password.</p>
				<a href="${placeholders.resetLink}" class="button" style="background-color: #dc3545;">Reset Password</a>
			  </div>
			  <div class="footer">
				<p>&copy; ${new Date().getFullYear()} ChatApp. All rights reserved.</p>
			  </div>
			</div>
		  </body>
		</html>
	  `,
    [MailTemplateEnum.VERIFYEMAIL]: `
		<html>
		  <head>
			${sharedStyles}
		  </head>
		  <body>
			<div class="container">
			  <div class="header" style="background-color: #28a745;">
				<h1>Email Verification</h1>
			  </div>
			  <div class="content">
				<h2>Hello, ${placeholders.name}</h2>
				<p>Please verify your email address by clicking the button below.</p>
				<a href="${placeholders.verifyLink}" class="button" style="background-color: #28a745;">Verify Email</a>
			  </div>
			  <div class="footer">
				<p>&copy; ${new Date().getFullYear()} ChatApp. All rights reserved.</p>
			  </div>
			</div>
		  </body>
		</html>
	  `,
    [MailTemplateEnum.DELETEACCOUNT]: `
		<html>
		  <head>
			${sharedStyles}
		  </head>
		  <body>
			<div class="container">
			  <div class="header" style="background-color: #ff0000;">
				<h1>Account Deletion</h1>
			  </div>
			  <div class="content">
				<h2>Hello, ${placeholders.name}</h2>
				<p>Your account has been successfully deleted. If this was a mistake, please contact our support team immediately.</p>
			  </div>
			  <div class="footer">
				<p>&copy; ${new Date().getFullYear()} ChatApp. All rights reserved.</p>
			  </div>
			</div>
		  </body>
		</html>
	  `,
    [MailTemplateEnum.WELCOMECHATAPP]: `
		<html>
		  <head>
			${sharedStyles}
		  </head>
		  <body>
			<div class="container">
			  <div class="header">
				<h1>Welcome to ChatApp</h1>
			  </div>
			  <div class="content">
				<h2>Hello, ${placeholders.name}</h2>
				<p>Welcome to ChatApp! We're thrilled to have you here. Start chatting and connect with your friends and colleagues.</p>
			  </div>
			  <div class="footer">
				<p>&copy; ${new Date().getFullYear()} ChatApp. All rights reserved.</p>
			  </div>
			</div>
		  </body>
		</html>
	  `,
  };

  return templates[templateName] || '';
};
