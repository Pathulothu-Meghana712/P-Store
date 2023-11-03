//  *** INSTALL NODEMAILER MODULE 

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: 'saipranaysp850@gmail.com',
    pass: 'xsmtpsib-26e61f25242505a5b63647db1d9a4f210b90fe390a332c14f589cd57f2b828eb-tdPvwqBIxzJ3MHYT',
  }
});

const mailOptions = {
  from: 'saipranaysp850@gmail.com', // From address remains CONSTANT
  to: 'kabhishekrao7@gmail.com',   //  Replace the To address value to the related variable.
  subject: 'Invoices due',
  text: 'Dudes, we really need your money. TEST 1 '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
