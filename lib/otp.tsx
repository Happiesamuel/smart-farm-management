"use server";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import InviteEmail from "../components/layout/InviteEmail";
import { appwriteConfig } from "@/servers/appwrite-client";
import GetInTouchEmail from "@/components/layout/GetInTouchEmail";
const plunk = new Plunk(appwriteConfig.plunkApiKey);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtp = async (email: string) => {
  const otp = generateOTP();
  await plunk.emails.send({
    to: email,
    subject: "Your OTP Code",
    body: `
      <div style="font-family: Arial; text-align:center;">
        <h2>Your verification code</h2>
        <h1 style="color:#2e7d32; font-size:32px;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });

  return otp;
};
export const inviteUser = async (
  email: string,
  userName: string,
  workspaceName: string,
  inviteLink: string,
) => {
  const html = await render(
    <InviteEmail
      userName={userName}
      workspaceName={workspaceName}
      inviteLink={inviteLink}
    />,
  );

  await plunk.emails.send({
    to: email,
    subject: `You're invited to join ${workspaceName}`,
    body: html,
  });
};
// actions/contact.ts

export const sendGetInTouch = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const html = await render(
    <GetInTouchEmail
      name={name}
      email={email}
      subject={subject}
      message={message}
    />,
  );

  await plunk.emails.send({
    // from: "noreply@yourdomain.com",
    to: "odionsamuel2005@gmail.com",
    subject: `New message: ${subject}`,
    body: html,
  });
};
