export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 border-4 border-primary/50 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent/50 rounded-full animate-spin [animation-duration:2s]"></div>
        <div className="absolute inset-0 flex items-center justify-center font-headline text-5xl font-bold text-primary animate-pulse">
          M
        </div>
      </div>
    </div>
  );
}
