import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST,
  port: process.env.ETHEREAL_PORT,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const emailTemplateSource = await fs.readFile(
  path.join(__dirname, "./mail.hbs"),
  "utf8"
);

const template = handlebars.compile(emailTemplateSource);

const emails = ["pratham@gmail.com", "meet@gmail.com", "palak@gmail.com"];

function sendEmail() {
  emails.map((email) => {
    const htmlToSend = template({
      header: `Hello, ${email}`,
      footer: `Will see you soon!`,
    });
    const mailOptions = {
      from: process.env.ETHEREAL_USER,
      to: email,
      subject: "Greetings from Patoliya infotech!",
      html: htmlToSend,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.log(error);

      if (info) return console.log("Email sent!");
    });
  });
}

// (second, minutes, hours, each day of month, each month of year, each day of week)
cron.schedule("* * * * *", () => {
  sendEmail();
});
