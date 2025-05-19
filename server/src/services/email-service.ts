interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  send(data: EmailData) {
    console.log("Email sent", data);
  }
}
