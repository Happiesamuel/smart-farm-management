export default function GeneralLoader({ children }: { children: string }) {
  return (
    <div className="flex gap-4 md:gap-6 lg:gap-8 flex-col items-center justify-center min-h-[80vh] bg-white">
      <div className="w-12 h-12 border-4 border-light-green/30 border-t-primary-green rounded-full animate-spin"></div>
      <p className="font-bold text-zinc-500/50 tracking-wider text-lg md:text-2xl lg:text-4xl">
        {children}
      </p>
    </div>
  );
}
