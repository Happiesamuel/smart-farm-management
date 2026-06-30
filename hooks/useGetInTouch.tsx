// hooks/useGetInTouch.ts
import { sendGetInTouch } from "@/lib/otp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useGetInTouch() {
  const { mutate: send, status } = useMutation({
    mutationFn: sendGetInTouch,
    onSuccess: () => {
      toast("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      });
    },
    onError: (err: Error) => {
      toast("Failed to send message", {
        description: err.message,
        duration: 4000,
        closeButton: true,
      });
    },
  });

  return { send, status };
}
