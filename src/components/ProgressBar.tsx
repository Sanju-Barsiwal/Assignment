import { cn } from '@/components/lib/utils';

interface ProgressBarProps {
  total: number;
  current: number;
  isPaused: boolean;
  progress: number;
}

export const ProgressBar = ({ total, current, isPaused, progress }: ProgressBarProps) => {
  return (
    <div className="flex gap-1 w-full">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="h-0.5 bg-white/30 rounded-full flex-1 overflow-hidden"
        >
          <div
            className={cn(
              "h-full bg-white rounded-full origin-left transition-transform",
              index === current && !isPaused && "animate-progress",
              index < current && "scale-x-100",
              index > current && "scale-x-0"
            )}
            style={{
              transform: index === current ? `scaleX(${progress})` : undefined,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        </div>
      ))}
    </div>
  );
};
