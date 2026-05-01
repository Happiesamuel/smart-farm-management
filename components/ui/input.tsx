// import * as React from "react";

// import { cn } from "@/lib/utils";

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "h-8 w-full min-w-0 rounded-lg focus-visible:border-light-green border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring- aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { Input };
import * as React from "react";

import { cn } from "@/lib/utils";

type InputValue =
  | string
  | readonly string[]
  | number
  | undefined
  | File
  | (string | File)[]
  | boolean
  | Date
  | { address: string; lat: number; lng: number }
  | { from: Date; to: Date };

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  className?: string;
  value?: InputValue;
};

type NonFileValue = Exclude<
  InputValue,
  | File
  | boolean
  | (string | File)[]
  | { address: string; lat: number; lng: number }
  | Date
  | { from: Date; to: Date }
>;

function Input({ className, value, type, ...props }: InputProps) {
  if (type === "file") {
    return <input type="file" {...props} />;
  }

  return (
    <input
      type={type}
      value={value as NonFileValue}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg focus-visible:border-light-green border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring- aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
