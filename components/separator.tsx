import { cn } from "@/lib/utils";

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-border",
        "before:absolute before:-left-[100vw] before:top-0 before:z-[-1] before:h-full before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_1px,transparent_0,transparent_10px)] ",
        className
      )}
    />
  );
}

export default Separator;
