const nodemailer = require('nodemailer');
const config = require('../config/app.config');
const jwt = require('jsonwebtoken');
const {log_error, log_success } = require('./logging');

const verifyNewAccount = async (dataAuth) => {
    const token = jwt.sign(
        {
            id_user: dataAuth.id_user,
            nama_pengguna: dataAuth.nama_pengguna,
            id_peternakan: dataAuth.id_peternakan,
            message: 'verification'
        }, config.jwt.secret, {expiresIn: '1h'});

    const link = `${process.env.URL}/api/auth/verify-account?token=${token}`;
    message = `<h1>VERIFY ACCOUNT GOMO</h1>
                <h2>Hi ${dataAuth.nama_pengguna}</h2>
                <p>We just need to verify your email address before you can access <strong>GomoApp</strong>.<br>
                Verify your email address :</p>
                <a href="${link}">${link}</a>
                <br>
                <br>
                <h4>Thanks! – SembadaFarm team</h4>
                `
    
    return emailVerify(dataAuth.email, 'Verify Account', message);
}

const verifyEmailForgotPassword = async (dataAuth, newPass) => {
    message = `<h1>FORGOT PASSWORD GOMO</h1>
                <h2>Hi ${dataAuth.nama_pengguna}</h2>
                <p>Your new password is : <strong>${newPass}<strong><br>
                Please change your password after login</p>
                <br>
                <br>
                <h4>Thanks! – SembadaFarm team</h4>`
    
    return emailVerify(dataAuth.email, 'Forgot Password', message);
}

const bodEmailRegister = async (email, pass) => {
    message = `<h1>REGISTER ACCOUNT GOMO</h1>
                <h2>Hi</h2>
                <p>Your account has been created. Please login with your email and password below :</p>
                <p>Email : ${email}</p>
                <p>Password : ${pass}</p>
                <br>
                <br>
                <h4>Thanks! – SembadaFarm team</h4>`

    return emailVerify(email, 'BOD Account', message);
}

const emailVerify = async (email, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.auth.email,
          pass: config.auth.password_app
        }
      });
      
    var mailOptions = {
        from: config.auth.email,
        to: email,
        subject: subject,
        html: message
    };

    transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                log_error('Email Verification', error);
            } else {
                log_success('Email Verification', 'Email sent: ' + info.response);
            }
        }
    );
}

module.exports = {emailVerify, verifyNewAccount, verifyEmailForgotPassword, bodEmailRegister};