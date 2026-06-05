export default function GeneralLoader({ children }: { children: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-150">
      <div className="flex flex-col items-center">
        <div className="animate-pulse text-4xl ">🌿</div>

        <p className="mt-2 text-sm font-semibold sm:text-lg text-primary-green animate-pulse">
          {children}
        </p>
      </div>
    </div>
  );
}
export function FormLoader({ children }: { children: string }) {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div className="animate-pulse text-3xl ">🌿</div>

      <p className="mt-2 text-sm font-semibold  text-primary-green animate-pulse">
        {children}
      </p>
    </div>
  );
}
