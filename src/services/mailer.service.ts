import { Request, Response } from "express";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import transport from "../config/mailer.config";
import { User } from "../entities";

class mailerService {
  welcomeEmail = ({ course }: Request, res: Response, user: User) => {
    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: path.resolve("./src/views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./src/views/"),
    };

    transport.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: "'Robson Fernando' <rbsndev3@gmail.com>",
      to: user.email,
      subject: "Bem-vindo!",
      template: "email",
      context: {
        user: user.firstName,
        course: course.courseName,
        duration: course.duration,
      },
      attachments: [
        {
          filename: "kenzie.png",
          path: path.resolve("./src/views/attachments/kenzie.png"),
          cid: "logo",
        },
      ],
    };

    transport.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(424).json({ message: "Email could not be sent." });
      }

      return res
        .status(200)
        .json({ message: "Enrollment email sent successfully." });
    });
  };
}

export default new mailerService();
