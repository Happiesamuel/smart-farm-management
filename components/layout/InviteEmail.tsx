import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Button,
  Section,
  Heading,
  Hr,
} from "@react-email/components";

const main = {
  backgroundColor: "#f1f5f9",
  padding: "40px 0",
  fontFamily: "Inter, Arial, sans-serif",
};

const card = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  maxWidth: "480px",
  margin: "0 auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const badge = {
  fontSize: "12px",
  color: "#16a34a",
  backgroundColor: "#dcfce7",
  padding: "6px 10px",
  borderRadius: "999px",
  display: "inline-block",
  marginBottom: "16px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#0f172a",
  marginBottom: "12px",
};

const text = {
  fontSize: "14px",
  color: "#475569",
  lineHeight: "22px",
};

const center = {
  textAlign: "center",
  margin: "24px 0px",
} as const;
const cta = {
  backgroundColor: "#16a34a",
  color: "#ffffff",
  padding: "14px 22px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
};

const subtext = {
  fontSize: "12px",
  color: "#94a3b8",
};

const link = {
  fontSize: "12px",
  color: "#16a34a",
  wordBreak: "break-all",
} as const;

const footer = {
  fontSize: "12px",
  color: "#94a3b8",
  marginTop: "20px",
};
const divider = {
  margin: "20px 0",
  borderColor: "#eee",
};

export default function InviteEmail({
  userName,
  workspaceName,
  inviteLink,
}: {
  userName: string;
  workspaceName: string;
  inviteLink: string;
}) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={card}>
          <Text style={badge}>Workspace Invitation</Text>
          <Heading style={heading}>
            Join <span style={{ color: "#16a34a" }}>{workspaceName}</span>
          </Heading>
          <Text style={text}>Hi {userName || "there"},</Text>
          <Text style={text}>
            You&apos;ve been invited to collaborate on a workspace. Manage
            farms, track activities, and work with your team seamlessly.
          </Text>
          <Section style={center}>
            <Button href={inviteLink} style={cta}>
              Accept Invitation →
            </Button>
          </Section>
          <Text style={subtext}>Or copy this link:</Text>
          <Text style={link}>{inviteLink}</Text>
          <Text style={footer}>
            If you didn&apos;t expect this invitation, you can safely ignore it.
          </Text>
          <Hr style={divider} />{" "}
          <Text style={footer}>
            {" "}
            © {new Date().getFullYear()} Smart Farm Management System. All
            rights reserved.{" "}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
