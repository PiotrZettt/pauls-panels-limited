import { google } from "googleapis";

const sendEmail = async ({ to, subject, text }) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "path/to/keyfile.json",
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });
    const accessToken = await auth.getAccessToken();
    const gmail = google.gmail({ version: "v1", auth });
    const message = Buffer.from(
      `To: ${to}\nSubject: ${subject}\n\n${text}`
    ).toString("base64");
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: message,
      },
    });
    } catch (error) {
        console.error(error);
      }
    };
export default sendEmail