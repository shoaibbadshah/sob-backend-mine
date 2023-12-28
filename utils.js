const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
module.exports.generateAuthToken = (id, key) => {
  const options = {
    expiresIn: "1h", // Set the expiration time (e.g., 1 hour)
  };
  const token = jwt.sign({ _id: id }, key, options);
  return token;
};

module.exports.decodeAuthToken = (token, key) => {
  return new Promise((resolve, reject) => {
    try {
      let decode = jwt.verify(token, key);
      resolve(decode);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.decodeBase64 = (str) => {
  return Buffer.from(str, "base64").toString("utf-8");
};

module.exports.encodeBase64 = (str) => {
  return Buffer.from(str, "utf8").toString("base64");
};

module.exports.sendMail = async (to, token) => {
  // console.log("🚀 ~ file: utils.js:28 ~ module.exports.sendMail= ~ token:", to);
  // const transporter = nodemailer.createTransport({
  //   // host: "smtp.titan.email",
  //   // port: 465,
  //   // secure: true,
  //   service: "gmail",
  //   auth: {
  //     user: "thebadshahsir@gmail.com",
  //     // pass: "HeerR5nkBddw2uF@",
  //     pass: "Asedking123@",
  //   },
  // });

  const html = await this.loginEmailTemplate(token);
  const mailOptions = {
    from: "thebadshahsir@gmail.com",
    to: to,
    subject: "Your Login Link - Access Your Account Now",
    // text: 'Hi, this is a test email',
    html: html,
  };

  // let emailTransporter = await this.createTransporter();
  // await emailTransporter.sendMail(mailOptions);

  // const mailOptions = {
  //   from: "thebadshahsir@gmail.com",
  //   to: to,
  //   subject: "Your Login Link - Access Your Account Now",

  //   html: html,
  // };

  try {
    // const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.response);
    let emailTransporter = await this.createTransporter();
    const info = await emailTransporter.sendMail(mailOptions);

    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};
module.exports.createTransporter = async () => {
  const OAuth2 = google.auth.OAuth2;

  try {
    const oauth2Client = new OAuth2(
      "283801907519-h5vcbg860ipcc65lgl88mfoc7gho1kdf.apps.googleusercontent.com",
      "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",
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token:
        "1//04TekW4FMTqizCgYIARAAGAQSNwF-L9Ir3DMjsYh5-eh1iMPVb7wz9HhWkFTA44TsF1xUnKkAKhOyaqvwWRh4aftmz3aRLkxLEgM",
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "thebadshahsir@gmail.com",
        accessToken,
        clientId:
          "283801907519-h5vcbg860ipcc65lgl88mfoc7gho1kdf.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:
          "1//04TekW4FMTqizCgYIARAAGAQSNwF-L9Ir3DMjsYh5-eh1iMPVb7wz9HhWkFTA44TsF1xUnKkAKhOyaqvwWRh4aftmz3aRLkxLEgM",
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};
module.exports.loginEmailTemplate = async (token) => {
  const emailTemplate = `<!doctype html>
  <html ⚡4email data-css-strict>
  
  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <style amp4email-boilerplate>
      body {
        visibility: hidden
      }
    </style>
  
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  
  
    <style amp-custom>
      .u-row {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 0;
        margin-right: 0;
      }
      
      .u-row .u-col {
        position: relative;
        width: 100%;
        padding-right: 0;
        padding-left: 0;
      }
      
      .u-row .u-col.u-col-100 {
        flex: 0 0 100%;
        max-width: 100%;
      }
      
      @media (max-width: 767px) {
        .u-row:not(.no-stack) {
          flex-wrap: wrap;
        }
        .u-row:not(.no-stack) .u-col {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      
      body {
        margin: 0;
        padding: 0;
      }
      
      table,
      tr,
      td {
        vertical-align: top;
        border-collapse: collapse;
      }
      
      p {
        margin: 0;
      }
      
      .ie-container table,
      .mso-container table {
        table-layout: fixed;
      }
      
      * {
        line-height: inherit;
      }
      
      table,
      td {
        color: #000000;
      }
      
      #u_body a {
        color: #0000ee;
        text-decoration: underline;
      }
    </style>
  
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:21px 10px 24px;font-family:'Cabin',sans-serif;" align="left">
  
                              <h1 style="margin: 0px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word; font-family: arial black,AvenirNext-Heavy,avant garde,arial; font-size: 30px; font-weight: 700;"><strong>School Of BitCoin</strong></h1>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;background-color: #ffc000;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">
  
                              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                  <td style="padding-right: 0px;padding-left: 0px;" align="center">
  
                                    <amp-img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" width="335" height="93" layout="intrinsic" style="width: 26%;max-width: 26%;">
  
                                    </amp-img>
                                  </td>
                                </tr>
                              </table>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                              <div style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">
  
                              <div style="font-size: 14px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong>&nbsp;Your Login Link - Access Your Account Now</strong></span></p>
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">
  
                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>
                                <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px;"><strong>We hope this message finds you well. We have received a request to log in to your account, and we're excited to assist you in gaining access. For security purposes, we have generated a one-time login link that you can use to access your account.</strong></span></p>
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                              <!--[if mso]><style>.v-button {background: transparent;}</style><![endif]-->
                              <div align="center">
                                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href=https://sob-frontend.onrender.com?token=${token}
                                } style="height:46px; v-text-anchor:middle; width:134px;" arcsize="8.5%"  stroke="f" fillcolor="#ffc000"><w:anchorlock/><center style="color:#000000;"><![endif]-->
                                <a href=https://sob-frontend.onrender.com?token=${token}
                                } target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;text-align: center;color: #000000; background-color: #ffc000; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; font-size: 14px;">
                                  <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">LOGIN</span></strong>
                                  </span>
                                  </span>
                                </a>
                                <!--[if mso]></center></v:roundrect><![endif]-->
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">
  
                              <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">School of Bitcoin</span></p>
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                             
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div style="padding: 0px;">
              <div style="max-width: 600px;margin: 0 auto;background-color: #ffc000;">
                <div class="u-row">
  
                  <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <div style="width: 100%;padding:0px;">
  
                      <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">
  
                              <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>
                              </div>
  
                            </td>
                          </tr>
                        </tbody>
                      </table>
  
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
        </tr>
      </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`;

  return emailTemplate;
};

// const loginEmailTemplate =
