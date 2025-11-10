interface IngredientHotspotProps {
  x: number;
  y: number;
  onClick: () => void;
  isModified?: boolean;
}

export const IngredientHotspot = ({ x, y, onClick, isModified }: IngredientHotspotProps) => {
  return (
    <button
      className="absolute group z-30"
      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label="View ingredient details"
    >
      <div className="relative">
        {/* Pulsing ring */}
        <div className="absolute inset-0 w-12 h-12 -left-2 -top-2 rounded-full bg-primary/40 animate-pulse" />
        
        {/* Main dot */}
        <div className={`relative w-8 h-8 rounded-full border-3 border-white shadow-2xl flex items-center justify-center transition-all group-hover:scale-125 group-active:scale-95 ${
          isModified ? 'bg-secondary' : 'bg-primary'
        }`}>
          {isModified && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </div>
      </div>
    </button>
  );
};
