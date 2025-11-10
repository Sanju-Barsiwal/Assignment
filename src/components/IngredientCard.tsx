import { Ingredient } from '@/components/types/story';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface IngredientCardProps {
  ingredient: Ingredient;
  onClose: () => void;
  onCustomize: () => void;
  onAddExtra: () => void;
}

export const IngredientCard = ({ ingredient, onClose, onCustomize, onAddExtra }: IngredientCardProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">{ingredient.image}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-card-foreground">{ingredient.name}</h3>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Calories</span>
              <span className="font-semibold text-card-foreground">{ingredient.calories} cal</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Protein</span>
              <span className="font-semibold text-card-foreground">{ingredient.protein}g</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Carbs</span>
              <span className="font-semibold text-card-foreground">{ingredient.carbs}g</span>
            </div>
            
            {ingredient.allergens && ingredient.allergens.length > 0 && (
              <div className="flex items-start gap-2 pt-2 border-t border-border">
                <span className="text-amber-500 text-lg">⚠️</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">Allergens</p>
                  <p className="text-sm text-muted-foreground">{ingredient.allergens.join(', ')}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onCustomize}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Customize
            </Button>
            {ingredient.price > 0 && (
              <Button
                onClick={onAddExtra}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Extra +${ingredient.price.toFixed(2)}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
