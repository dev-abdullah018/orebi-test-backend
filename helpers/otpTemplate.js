function otpTemplate(otp) {
   return `
     <html>
       <head>
         <style>
           body {
             font-family: 'Helvetica', 'Arial', sans-serif;
             min-width: 1000px;
             overflow: auto;
             line-height: 2;
           }
           .email-container {
             margin: 50px auto;
             width: 70%;
             padding: 20px 0;
           }
           .header {
             border-bottom: 1px solid #eee;
           }
           .company-link {
             font-size: 1.4em;
             color: #00466a;
             text-decoration: none;
             font-weight: 600;
           }
           .greeting {
             font-size: 1.1em;
           }
           .message-content {
             font-size: 0.9em;
           }
           .otp-code {
             background: #00466a;
             margin: 0 auto;
             width: max-content;
             padding: 0 10px;
             color: #fff;
             border-radius: 4px;
           }
           .closing-message {
             font-size: 0.9em;
           }
           .address-info {
             float: right;
             padding: 8px 0;
             color: #aaa;
             font-size: 0.8em;
             line-height: 1;
             font-weight: 300;
           }
         </style>
       </head>
       <body>
         <div class="email-container">
           <div class="header">
             <a href="" class="company-link">OREBI</a>
           </div>
           <p class="greeting">Hi, User</p>
           <p class="message-content">Thank you for joining Orebi. Use the following code to finish the account creation process. The code will be valid for the following 5 minutes </p>
           <h2 class="otp-code">${otp?.randomOTP}</h2>
           <p class="closing-message">Thank you<br />Team Orebi.</p>
           <hr style="border:none; border-top:1px solid #eee" />
           <div class="address-info">
             <p>Orebi</p>
             <p>651 N Broad St Suite 201 Middletown, DE 19709</p>
             <p>United States</p>
           </div>
         </div>
       </body>
     </html>
   `;
 }
 
 module.exports = otpTemplate;
 
 
 
 