// emails/GetInTouchEmail.tsx
import {
  Html, Head, Body, Container, Heading,
  Text, Hr, Section, Preview,
} from "@react-email/components";

interface GetInTouchEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function GetInTouchEmail({
  name,
  email,
  subject,
  message,
}: GetInTouchEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name} — {subject}</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", fontFamily: "sans-serif" }}>
        <Container
          style={{
            maxWidth: "560px",
            margin: "40px auto",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e4e4e7",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#03732b",
              padding: "32px 40px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                fontSize: "20px",
                margin: 0,
                fontWeight: 700,
              }}
            >
              New Contact Message
            </Heading>
            <Text style={{ color: "#a7f3d0", fontSize: "13px", margin: "6px 0 0" }}>
              Someone reached out via the contact form
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: "32px 40px" }}>
            <Text style={{ fontSize: "13px", color: "#71717a", margin: "0 0 4px" }}>
              FROM
            </Text>
            <Text style={{ fontSize: "15px", color: "#18181b", fontWeight: 600, margin: "0 0 20px" }}>
              {name} &lt;{email}&gt;
            </Text>

            <Text style={{ fontSize: "13px", color: "#71717a", margin: "0 0 4px" }}>
              SUBJECT
            </Text>
            <Text style={{ fontSize: "15px", color: "#18181b", fontWeight: 600, margin: "0 0 20px" }}>
              {subject}
            </Text>

            <Hr style={{ borderColor: "#e4e4e7", margin: "0 0 20px" }} />

            <Text style={{ fontSize: "13px", color: "#71717a", margin: "0 0 8px" }}>
              MESSAGE
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#3f3f46",
                lineHeight: "1.7",
                backgroundColor: "#f9fafb",
                padding: "16px",
                borderRadius: "8px",
                margin: 0,
              }}
            >
              {message}
            </Text>
          </Section>

          {/* Footer */}
          <Section
            style={{
              padding: "16px 40px",
              borderTop: "1px solid #e4e4e7",
              textAlign: "center",
            }}
          >
            <Text style={{ fontSize: "11px", color: "#a1a1aa", margin: 0 }}>
              Smart Farm Management • This message was sent via the contact form
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}