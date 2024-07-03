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
                    .text-btn {color: #fff !important;}
                    /* Footer */
                    .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1718878055/news_images/Untitled_design_3_tfe68y.png" alt="Blood Donation Logo">
                        <h1>Xin chào 👋 ${name}</h1> 
                    </div>
            
                    <div class="content">
                        <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Để đặt lại mật khẩu, vui lòng nhấp vào liên kết dưới đây:</p>
                        <a href="${url}" class="btn"><span class="text-btn">Đặt lại mật khẩu</span></a>
                        <p>Lưu ý: Liên kết này sẽ hết hạn sau 10 phút </p>
                        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không bị thay đổi.</p>
                        <p>Nếu bạn có bất kỳ câu hỏi nào, xin vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi qua email: vanquang200310@gmail.com</p>
                        <p>Cảm ơn bạn 🥰</p>
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

async function sendEmailRequestHelp(email, emailNeeder, phoneNeeder, name, helper, url) {
    try {
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Yêu cầu hỗ trợ hiến máu - Blood Donation',
            html: `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${name} đã gửi một yêu cầu hiến máu tới bạn. Bạn có thể giúp đỡ ${name} không?</title>
                <style>
                    body { margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #000; background-color: #f4f4f4; }
                    .container { max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                    .header { text-align: center; margin-bottom: 30px; }
                    .header img { max-width: 150px; }
                    .content h1 { color: #e74c3c; font-size: 24px; margin-bottom: 15px; }
                    .content p { margin-bottom: 20px; }
                    .btn { display: inline-block; padding: 12px 24px; background-color: #0866ff; color: #fff; text-decoration: none; border-radius: 5px; text-align: center; }
                    .btn:hover { background-color: #1877f2; }
                    .text-btn {color: #fff;}
                    .footer { text-align: center; font-size: 12px; color: #666; margin-top: 30px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1718878055/news_images/Untitled_design_3_tfe68y.png" alt="Blood Donation Logo">
                        <h1>Xin chào ${helper} 👋, bạn nhận được một yêu cầu hỗ trợ hiến máu từ ${name}</h1>
                    </div>
                    <div class="content">
                        <h3>Chúng tôi hy vọng bạn đang có một ngày tốt lành. Hiện tại, chúng tôi đang cần sự giúp đỡ từ cộng đồng hiến máu và mong nhận được sự hỗ trợ từ bạn.</h3>
                        <h3>Thông tin người gửi yêu cầu:</h3>
                        <p><strong>Tên người dùng: ${name}</strong></p>
                        <p><strong>Email liên hệ: ${emailNeeder}</strong></p>
                        <p><strong>Số điện thoại liên hệ: ${phoneNeeder}</strong></p>
                        <p>Chúng tôi tin rằng bạn sẽ không ngần ngại giúp đỡ người khác. Nếu bạn có thể hiến máu hoặc biết ai đó có thể giúp, hãy cho chúng tôi biết.</p>
                        <p>Sự đóng góp của bạn sẽ mang lại hy vọng và cứu sống một mạng người. Chúng tôi xin chân thành cảm ơn tấm lòng nhân ái và sự hỗ trợ quý báu từ bạn.</p>
                        <p>Trân trọng,</p>
                        <a href="${url}" class="btn"><span class="text-btn">Giúp đỡ <strong>${name}</strong></span></a>
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

async function sendEmailForgotPassByIdCard(email, token) {
    try {
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Xác thực Email của bạn',
            html: `
            <!DOCTYPE html>
<html>
<head>
    <style>
        /* CSS Styles */
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .logo {
            max-width: 150px; /* Điều chỉnh kích thước logo */
            margin-bottom: 20px;
        }

        .otp-code {
    font-size: 48px; /* Tăng kích thước chữ số */
    font-weight: bold;
    letter-spacing: 20px; /* Khoảng cách giữa các chữ số */
    margin-bottom: 20px;
    display: flex; /* Sử dụng flexbox để căn giữa */
    justify-content: center; /* Căn giữa theo chiều ngang */
    perspective: 800px;
}

.otp-digit {
    width: 50px; /* Độ rộng mỗi chữ số */
    height: 60px; /* Chiều cao mỗi chữ số */
    background-color: #fff; /* Màu nền chữ số */
    border-radius: 8px; /* Bo tròn góc chữ số */
    margin: 0 5px; /* Khoảng cách giữa các chữ số */
    display: flex; /* Sử dụng flexbox để căn giữa chữ số */
    align-items: center; /* Căn giữa theo chiều dọc */
    justify-content: center; /* Căn giữa theo chiều ngang */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Hiệu ứng đổ bóng */
    transition: transform 0.2s ease; /* Hiệu ứng chuyển động mượt */
    transform-style: preserve-3d;
}

.otp-digit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* Màu nền mờ cho mặt trước */
  border-radius: 8px;
  transform: translateZ(5px); /* Tạo độ sâu cho mặt trước */
}

.otp-digit:hover {
  transform: translateY(-3px) rotateX(15deg); /* Xoay và nâng lên khi hover */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3); /* Đổ bóng mạnh hơn */
}


        .message {
            margin-bottom: 30px;
        }

        .footer {
            font-size: 12px;
            color: #777;
        }

        
    </style>
</head>
<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dkjwdmndq/image/upload/v1718878055/news_images/Untitled_design_3_tfe68y.png" alt="Logo" class="logo">
        <div class="otp-code">
    <div class="otp-digit">${token.charAt(0)}</div>
    <div class="otp-digit">${token.charAt(1)}</div>
    <div class="otp-digit">${token.charAt(2)}</div>
    <div class="otp-digit">${token.charAt(3)}</div>
    </div>
        <p class="message">Đây là mã OTP của bạn. Mã có hiệu lực trong 5 phút.</p>
        <p class="footer">Nếu bạn không yêu cầu mã OTP này, vui lòng bỏ qua email.</p>
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
    sendEmailRequestHelp,
    sendEmailForgotPassByIdCard,
};
