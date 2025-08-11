import { prisma } from "./prisma";
import { transporter } from "./Transporter";
import fs from "fs/promises";
import Handlebars from "handlebars";
import path from "path";

export const getStudentPendingList = async () => {
  const studentList = await prisma.user.findMany({
    where: {
      roleId: { in: [2, 3] },
      requestTo: {
        some: {
          status: "Pending",
        },
      },
    },
    include: {
      requestTo: {
        where: {
          status: "Pending",
        },
      },
    },
  });

  return studentList;
};

export const sendReminder = async (
  email: string,
  name: string,
  pendingCount: number
) => {
  try {
    const emailTemplate = await fs.readFile(
      path.join(__dirname, "../Templates/PendingLeaves.hbs"),
      "utf8"
    );

    const template = Handlebars.compile(emailTemplate);

    const htmlToSend = template({
      name: name,
      pendingLeave: pendingCount,
      footer: "Accept as soon as possible!",
    });
    const mailOption = {
      from: "Master Definition - LMS",
      to: email,
      subject: "Reminder for pending leaves status!",
      html: htmlToSend,
    };

    transporter.sendMail(mailOption, (err, info) => {
      if (err) return console.log("Email Not Sent!");

      if (info) return console.log("Email Sent!");
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendMail = async () => {
  const students = await getStudentPendingList();

  for (let student of students) {
    await sendReminder(student.email, student.name, student.requestTo.length);
  }
};
