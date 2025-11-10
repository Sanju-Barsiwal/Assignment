import { useState } from 'react';
import { Restaurant, DishStory } from '@/components/types/story';
import { StoryCircle } from '@/components/StoryCircle';
import { StoryViewer } from '@/components/StoryViewer';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import burgerImg from '@/assests/burger.jpg';
import saladImg from '@/assests/salad.jpg';
import pizzaImg from '@/assests/pizza.jpg';
import restaurant1 from '@/assests/restaurant1.jpg';
import restaurant2 from '@/assests/restaurant2.jpg';
import restaurant3 from '@/assests/restaurant3.jpg';

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'Burger House',
    imageUrl: restaurant1,
    stories: [
      {
        id: 's1',
        restaurantId: 'r1',
        restaurantName: 'Burger House',
        dishName: 'Classic Burger',
        price: 12.99,
        basePrice: 12.99,
        media: [
          { 
            type: 'image', 
            url: burgerImg, 
            duration: 5,
            hotspots: [
              { id: 'h1', ingredientId: 'i1', x: 50, y: 45 },
              { id: 'h2', ingredientId: 'i2', x: 50, y: 35 },
              { id: 'h3', ingredientId: 'i3', x: 35, y: 40 },
              { id: 'h4', ingredientId: 'i4', x: 65, y: 40 },
            ]
          },
        ],
        ingredients: [
          {
            id: 'i1',
            name: 'Beef Patty',
            image: '🥩',
            x: 50,
            y: 45,
            calories: 250,
            protein: 26,
            carbs: 0,
            price: 3.0,
            quantity: 1,
            allergens: [],
            canRemove: false,
          },
          {
            id: 'i2',
            name: 'Cheddar Cheese',
            image: '🧀',
            x: 50,
            y: 35,
            calories: 113,
            protein: 7,
            carbs: 1,
            price: 1.0,
            quantity: 1,
            allergens: ['Dairy'],
            canRemove: true,
          },
          {
            id: 'i3',
            name: 'Lettuce',
            image: '🥬',
            x: 35,
            y: 40,
            calories: 5,
            protein: 0.5,
            carbs: 1,
            price: 0.5,
            quantity: 1,
            allergens: [],
            canRemove: true,
          },
          {
            id: 'i4',
            name: 'Tomato',
            image: '🍅',
            x: 65,
            y: 40,
            calories: 22,
            protein: 1,
            carbs: 5,
            price: 0.5,
            quantity: 2,
            allergens: [],
            canRemove: true,
          },
        ],
      },
    ],
  },
  {
    id: 'r2',
    name: 'Green Bowl',
    imageUrl: restaurant2,
    stories: [
      {
        id: 's2',
        restaurantId: 'r2',
        restaurantName: 'Green Bowl',
        dishName: 'Caesar Salad',
        price: 9.99,
        basePrice: 9.99,
        media: [
          { 
            type: 'image', 
            url: saladImg, 
            duration: 5,
            hotspots: [
              { id: 'h5', ingredientId: 'i5', x: 45, y: 50 },
              { id: 'h6', ingredientId: 'i6', x: 60, y: 35 },
              { id: 'h7', ingredientId: 'i7', x: 40, y: 60 },
            ]
          },
        ],
        ingredients: [
          {
            id: 'i5',
            name: 'Romaine Lettuce',
            image: '🥬',
            x: 45,
            y: 50,
            calories: 17,
            protein: 1.2,
            carbs: 3.3,
            price: 0.8,
            quantity: 1,
            allergens: [],
            canRemove: false,
          },
          {
            id: 'i6',
            name: 'Parmesan',
            image: '🧀',
            x: 60,
            y: 35,
            calories: 110,
            protein: 10,
            carbs: 1,
            price: 1.5,
            quantity: 1,
            allergens: ['Dairy'],
            canRemove: true,
          },
          {
            id: 'i7',
            name: 'Croutons',
            image: '🍞',
            x: 40,
            y: 60,
            calories: 122,
            protein: 3.6,
            carbs: 22,
            price: 0.5,
            quantity: 1,
            allergens: ['Gluten'],
            canRemove: true,
          },
        ],
      },
    ],
  },
  {
    id: 'r3',
    name: 'Pizza Palace',
    imageUrl: restaurant3,
    stories: [
      {
        id: 's3',
        restaurantId: 'r3',
        restaurantName: 'Pizza Palace',
        dishName: 'Margherita Pizza',
        price: 14.99,
        basePrice: 14.99,
        media: [
          { 
            type: 'image', 
            url: pizzaImg, 
            duration: 5,
            hotspots: [
              { id: 'h8', ingredientId: 'i8', x: 50, y: 50 },
              { id: 'h9', ingredientId: 'i9', x: 35, y: 45 },
              { id: 'h10', ingredientId: 'i10', x: 65, y: 55 },
            ]
          },
        ],
        ingredients: [
          {
            id: 'i8',
            name: 'Mozzarella',
            image: '🧀',
            x: 50,
            y: 50,
            calories: 280,
            protein: 22,
            carbs: 3,
            price: 2.0,
            quantity: 1,
            allergens: ['Dairy'],
            canRemove: false,
          },
          {
            id: 'i9',
            name: 'Tomato Sauce',
            image: '🍅',
            x: 35,
            y: 45,
            calories: 29,
            protein: 1.5,
            carbs: 7,
            price: 0.5,
            quantity: 1,
            allergens: [],
            canRemove: true,
          },
          {
            id: 'i10',
            name: 'Fresh Basil',
            image: '🌿',
            x: 65,
            y: 55,
            calories: 1,
            protein: 0.2,
            carbs: 0.1,
            price: 0.3,
            quantity: 5,
            allergens: [],
            canRemove: true,
          },
        ],
      },
    ],
  },
];

const Index = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const allStories = MOCK_RESTAURANTS.flatMap(r => r.stories);

  const handleStoryClick = (restaurantId: string) => {
    const storyIndex = allStories.findIndex(s => s.restaurantId === restaurantId);
    setActiveStoryIndex(storyIndex);
  };

  const handleNext = () => {
    if (activeStoryIndex !== null && activeStoryIndex < allStories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrevious = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const handleClose = () => {
    setActiveStoryIndex(null);
  };

  const handleAddToCart = (dishId: string, customizations: Record<string, number>, price: number) => {
    setCartCount(prev => prev + 1);
    toast.success('Added to cart!', {
      description: `$${price.toFixed(2)} - Customizations applied`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">FoodStories</h1>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Stories Row */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_RESTAURANTS.map(restaurant => (
            <StoryCircle
              key={restaurant.id}
              restaurantName={restaurant.name}
              imageUrl={restaurant.imageUrl}
              onClick={() => handleStoryClick(restaurant.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Tap a Story to Explore
          </h2>
          <p className="text-muted-foreground text-lg">
            Interactive food stories with ingredient details. Tap any ingredient hotspot to learn more, 
            customize portions, or add extras to your order!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2 text-card-foreground">Interactive Hotspots</h3>
              <p className="text-sm text-muted-foreground">Tap ingredient markers to see nutrition info</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-semibold mb-2 text-card-foreground">Customize Freely</h3>
              <p className="text-sm text-muted-foreground">Adjust portions and add extras</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="font-semibold mb-2 text-card-foreground">Quick Ordering</h3>
              <p className="text-sm text-muted-foreground">Add to cart with a single tap</p>
            </div>
          </div>
        </div>
      </main>

      {/* Story Viewer */}
      {activeStoryIndex !== null && (
        <StoryViewer
          story={allStories[activeStoryIndex]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onClose={handleClose}
          cartItemCount={cartCount}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Index;
