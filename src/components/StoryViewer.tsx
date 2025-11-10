import { useState, useEffect, useCallback } from 'react';
import { DishStory } from '@/components/types/story';
import { ProgressBar } from './ProgressBar';
import { IngredientHotspot } from './IngredientHotspot';
import { IngredientCard } from './IngredientCard';
import { CustomizationSheet } from './CustomizationSheet';
import { ChevronLeft, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface StoryViewerProps {
  story: DishStory;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  cartItemCount: number;
  onAddToCart: (dishId: string, customizations: Record<string, number>, price: number) => void;
}

export const StoryViewer = ({
  story,
  onNext,
  onPrevious,
  onClose,
  cartItemCount,
  onAddToCart,
}: StoryViewerProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customizations, setCustomizations] = useState<Record<string, number>>({});
  
  const currentMedia = story.media[currentMediaIndex];

  // Initialize customizations
  useEffect(() => {
    const initial: Record<string, number> = {};
    story.ingredients.forEach(ing => {
      initial[ing.id] = ing.quantity;
    });
    setCustomizations(initial);
  }, [story.ingredients]);

  // Progress timer
  useEffect(() => {
    if (isPaused) return;

    const duration = currentMedia.duration * 1000;
    const interval = 50;
    const increment = (interval / duration);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 1) {
          if (currentMediaIndex < story.media.length - 1) {
            setCurrentMediaIndex(prev => prev + 1);
            setProgress(0);
          } else {
            onNext();
          }
          return 0;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentMediaIndex, story.media.length, isPaused, currentMedia.duration, onNext]);

  const handleTap = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedIngredient || showCustomization) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;

    if (x < 30) {
      // Previous media
      if (currentMediaIndex > 0) {
        setCurrentMediaIndex(prev => prev - 1);
        setProgress(0);
      } else {
        onPrevious();
      }
    } else if (x > 70) {
      // Next media
      if (currentMediaIndex < story.media.length - 1) {
        setCurrentMediaIndex(prev => prev + 1);
        setProgress(0);
      } else {
        onNext();
      }
    } else {
      // Pause/resume
      setIsPaused(prev => !prev);
    }
  }, [currentMediaIndex, story.media.length, selectedIngredient, showCustomization, onNext, onPrevious]);

  const handleHotspotClick = (ingredientId: string) => {
    setIsPaused(true);
    setSelectedIngredient(ingredientId);
  };

  const handleCloseIngredientCard = () => {
    setSelectedIngredient(null);
    setIsPaused(false);
  };

  const handleCustomize = () => {
    setSelectedIngredient(null);
    setShowCustomization(true);
  };

  const handleAddExtra = () => {
    if (selectedIngredient) {
      setCustomizations(prev => ({
        ...prev,
        [selectedIngredient]: (prev[selectedIngredient] ?? 1) + 1,
      }));
      toast.success('Extra added!');
      handleCloseIngredientCard();
    }
  };

  const calculatePrice = () => {
    let total = story.basePrice;
    story.ingredients.forEach(ing => {
      const qty = customizations[ing.id] ?? ing.quantity;
      if (qty > ing.quantity) {
        total += (qty - ing.quantity) * ing.price;
      }
    });
    return total;
  };

  const getModificationCount = () => {
    let count = 0;
    story.ingredients.forEach(ing => {
      const qty = customizations[ing.id] ?? ing.quantity;
      if (qty !== ing.quantity) count++;
    });
    return count;
  };

  const handleAddToCart = () => {
    const price = calculatePrice();
    onAddToCart(story.id, customizations, price);
    toast.success('Added to cart!', {
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo'),
      },
    });
  };

  const ingredient = selectedIngredient
    ? story.ingredients.find(i => i.id === selectedIngredient)
    : null;

  const modifiedHotspots = currentMedia.hotspots.filter(h => {
    const qty = customizations[h.ingredientId] ?? 1;
    const original = story.ingredients.find(i => i.id === h.ingredientId)?.quantity ?? 1;
    return qty !== original;
  });

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onPrevious}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">{story.restaurantName}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-white/80 text-sm hover:text-white flex items-center gap-1"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({cartItemCount})</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <ProgressBar
          total={story.media.length}
          current={currentMediaIndex}
          isPaused={isPaused}
          progress={progress}
        />
      </div>

      {/* Media */}
      <div className="flex-1 relative" onClick={handleTap}>
        <img
          src={currentMedia.url}
          alt={story.dishName}
          className="w-full h-full object-cover"
        />

        {/* Hotspots - Only show when no card is open */}
        {!selectedIngredient && !showCustomization && currentMedia.hotspots.map(hotspot => (
          <IngredientHotspot
            key={hotspot.id}
            x={hotspot.x}
            y={hotspot.y}
            onClick={() => handleHotspotClick(hotspot.ingredientId)}
            isModified={modifiedHotspots.some(h => h.id === hotspot.id)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2 mb-2 text-white text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCustomization(true)}
            className="text-white hover:bg-white/20"
          >
            Customize
          </Button>
          <span className="text-white/60">·</span>
          <span className="text-white/80">Add Extra</span>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base"
        >
          Add to Cart
          {getModificationCount() > 0 && ` - ${getModificationCount()} modifications`}
          {' - $'}
          {calculatePrice().toFixed(2)}
        </Button>
      </div>

      {/* Ingredient Card */}
      {ingredient && selectedIngredient && (
        <IngredientCard
          ingredient={ingredient}
          onClose={handleCloseIngredientCard}
          onCustomize={handleCustomize}
          onAddExtra={handleAddExtra}
        />
      )}

      {/* Customization Sheet */}
      <CustomizationSheet
        isOpen={showCustomization}
        onClose={() => {
          setShowCustomization(false);
          setIsPaused(false);
        }}
        dishName={story.dishName}
        basePrice={story.basePrice}
        ingredients={story.ingredients}
        customizations={customizations}
        onUpdateCustomizations={(newCustomizations) => {
          setCustomizations(newCustomizations);
          setIsPaused(false);
        }}
      />
    </div>
  );
};
