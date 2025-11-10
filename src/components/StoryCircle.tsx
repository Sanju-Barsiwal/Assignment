interface StoryCircleProps {
  restaurantName: string;
  imageUrl: string;
  onClick: () => void;
}

export const StoryCircle = ({ restaurantName, imageUrl, onClick }: StoryCircleProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 flex-shrink-0 group"
    >
      <div className="relative">
        {/* Gradient border ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-amber-500 to-secondary p-[3px] animate-pulse-ring">
          <div className="w-full h-full rounded-full bg-background" />
        </div>
        
        {/* Image */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-background group-hover:scale-105 transition-transform">
          <img
            src={imageUrl}
            alt={restaurantName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Restaurant name */}
      <span className="text-xs font-medium text-foreground max-w-[80px] truncate">
        {restaurantName}
      </span>
    </button>
  );
};
