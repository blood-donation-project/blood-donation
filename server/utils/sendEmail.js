const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

async function sendEmailActivationEmail(email, url) {
    try {
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Kích hoạt email',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Kích hoạt tài khoản</title>
                <style>
                    /* Reset styles */
                    body { margin: 0; padding: 0; font-family: sans-serif; line-height: 1.6; color: #000 !important; }
        
                    /* Email container */
                    .container { max-width: 600px; margin: 0 auto; padding: 30px; background-color: #f8f8f8; }
        
                    /* Header */
                    .header { text-align: center; margin-bottom: 30px; }
                    .header img { max-width: 150px; } /* Nếu bạn có logo, hãy thêm vào đây */
        
                    /* Content */
                    .content h1 { color: #e74c3c; font-size: 24px; margin-bottom: 15px; } /* Màu chủ đạo của Blood Donation */
                    .content p { margin-bottom: 20px; }
        
                    /* Button */

                    span{
                        color: #fff;
                        text-align: center !important;
                    }
                    .btn { display: inline-block; padding: 12px 24px; background-color: #0866ff;  text-decoration: none; border-radius: 5px; text-align: center !important; }
                    .btn:hover { background-color: #1877f2; } /* Hiệu ứng hover */
        
                    /* Footer */
                    .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Xin chào! Chào mừng bạn đến với Blood Donation</h1> 
                    </div>
        
                    <div class="content">
                        <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
                        <p>Để kích hoạt tài khoản của bạn, vui lòng nhấp vào nút bên dưới:</p>
                        <a href="${url}" class="btn"><span>Kích hoạt tài khoản</span></a>
                        <p>Lưu ý: Liên kết này sẽ hết hạn sau 10 phút </p>
                        <p>Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
                    </div>
        
                    <div class="footer">
                        <p>&copy; 2024 Blood Donation.</p> 
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}

async function sendEmailForgotPassword(email, name, url) {
    try {
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Kích hoạt email',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Kích hoạt tài khoản</title>
                <style>
                    /* Reset styles */
                    body { margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #000; background-color: #f4f4f4; }
            
                    /* Email container */
                    .container { max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            
                    /* Header */
                    .header { text-align: center; margin-bottom: 30px; }
                    .header img { max-width: 150px; }
            
                    /* Content */
                    .content h1 { color: #e74c3c; font-size: 24px; margin-bottom: 15px; } /* Màu chủ đạo của Blood Donation */
                    .content p { margin-bottom: 20px; }
            
                    /* Button */
                    .btn { display: inline-block; padding: 12px 24px; background-color: #0866ff; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; }
                    .btn:hover { background-color: #1877f2; } /* Hiệu ứng hover */
            
                    /* Footer */
                    .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1717815464/news_images/c6ygagdwyczg6qapp9qx.svg" alt="Blood Donation Logo">
                        <h1>Xin chào! Chào mừng bạn đến với Blood Donation</h1> 
                    </div>
            
                    <div class="content">
                        <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
                        <p>Để kích hoạt tài khoản của bạn, vui lòng nhấp vào nút bên dưới (link sẽ tồn tại trong 5 phút):</p>
                        <a href="${url}" class="btn"><span>Kích hoạt tài khoản</span></a>
                        <p>Lưu ý: Liên kết này sẽ hết hạn sau 10 phút </p>
                        <p>Nếu bạn không yêu cầu đăng ký tài khoản này, vui lòng bỏ qua email này.</p>
                    </div>
            
                    <div class="footer">
                        <p>&copy; 2024 Blood Donation.</p> 
                    </div>
                </div>
            </body>
            </html>
            `,
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
    }
}

module.exports = {
    sendEmailActivationEmail,
    sendEmailForgotPassword,
};
