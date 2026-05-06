import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LuWalletMinimal } from "react-icons/lu";

export default function NotBoxes({
  arr,
  header,
}: {
  header: string;
  arr: { name: string; text: string; switch: boolean }[];
}) {
  return (
    <div className="w-full flex-1 space-y-4 p-4 cursor-pointer  bg-transparent  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0">
      <h4 className="text-base font-semibold text-dark/90">{header}</h4>
      <div className="space-y-3">
        {arr.map((a) => (
          <div key={a.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-4">
              <LuWalletMinimal className="text-base text-zinc-500" />
              <div className="space-y-1">
                <Label
                  htmlFor={a.name.split(" ").join("-")}
                  className="text-sm text-dark font-medium"
                >
                  {a.name}
                </Label>
                <p className="text-sm text-zinc-500 font-medium">{a.text}</p>
              </div>
            </div>
            <div>
              <Switch
                //   checked={a.switch}
                id={a.name.split(" ").join("-")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
