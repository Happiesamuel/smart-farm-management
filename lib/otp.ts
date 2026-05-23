"use server";
import Plunk from "@plunk/node";

const plunk = new Plunk("sk_44fe40a97340b1ac8d8583a196e72befbc83be656fe0e841");

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
