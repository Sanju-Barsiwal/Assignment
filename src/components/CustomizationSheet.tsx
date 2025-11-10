import { useState } from 'react';
import { Ingredient } from '@/components/types/story';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
interface CustomizationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
  basePrice: number;
  ingredients: Ingredient[];
  customizations: Record<string, number>;
  onUpdateCustomizations: (customizations: Record<string, number>) => void;
}

export const CustomizationSheet = ({
  isOpen,
  onClose,
  dishName,
  basePrice,
  ingredients,
  customizations,
  onUpdateCustomizations,
}: CustomizationSheetProps) => {
  const [localCustomizations, setLocalCustomizations] = useState(customizations);

  const updateQuantity = (ingredientId: string, delta: number) => {
    setLocalCustomizations(prev => {
      const current = prev[ingredientId] ?? 1;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [ingredientId]: newValue };
    });
  };

  const handleSubstitute = (ingredientId: string, substitution: string) => {
    // In a real app, this would update the ingredient
    console.log('Substitute', ingredientId, 'with', substitution);
  };

  const calculatePrice = () => {
    let total = basePrice;
    ingredients.forEach(ing => {
      const qty = localCustomizations[ing.id] ?? ing.quantity;
      if (qty > ing.quantity) {
        total += (qty - ing.quantity) * ing.price;
      }
    });
    return total;
  };

  const getModificationCount = () => {
    let count = 0;
    ingredients.forEach(ing => {
      const qty = localCustomizations[ing.id] ?? ing.quantity;
      if (qty !== ing.quantity) count++;
    });
    return count;
  };

  const handleReset = () => {
    const reset: Record<string, number> = {};
    ingredients.forEach(ing => {
      reset[ing.id] = ing.quantity;
    });
    setLocalCustomizations(reset);
  };

  const handleUpdate = () => {
    onUpdateCustomizations(localCustomizations);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-xl">
            {dishName} - ${basePrice.toFixed(2)}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[calc(80vh-180px)]">
          <h3 className="font-semibold text-lg">Ingredient List</h3>
          
          {ingredients.map(ingredient => {
            const qty = localCustomizations[ingredient.id] ?? ingredient.quantity;
            return (
              <div key={ingredient.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{ingredient.image}</span>
                    <div>
                      <p className="font-semibold">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ingredient.price > 0 ? `+$${ingredient.price.toFixed(2)} each` : 'Included'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(ingredient.id, -1)}
                      disabled={!ingredient.canRemove && qty <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{qty}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(ingredient.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {ingredient.canRemove && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs"
                      onClick={() => setLocalCustomizations(prev => ({ ...prev, [ingredient.id]: 0 }))}
                    >
                      Remove
                    </Button>
                  )}
                  {ingredient.substitutions && ingredient.substitutions.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {ingredient.substitutions.map(sub => (
                        <Button
                          key={sub}
                          size="sm"
                          variant="outline"
                          className="text-xs h-7"
                          onClick={() => handleSubstitute(ingredient.id, sub)}
                        >
                          Replace → {sub}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Running adjustments:</span>
            <span className="font-semibold text-primary">+${(calculatePrice() - basePrice).toFixed(2)}</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Reset to Default
            </Button>
            <Button
              onClick={handleUpdate}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Update & Close
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
