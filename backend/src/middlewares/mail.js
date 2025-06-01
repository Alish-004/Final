import nodemailer from "nodemailer"

/// sendEmail.js or inside your route

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use 'smtp.ethereal.email' for testing
    auth: {
      user: "raialish987@gmail.com",
      pass: "exjo esij bfjb gjuc"
    }
  });

  const mailOptions = {
    from: formData.email,
    to: "raialish987@gmail.com",
    subject: formData.subject,
    html: `
      <h3>Message from ${formData.name}</h3>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;

