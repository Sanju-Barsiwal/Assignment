# FoodStories - Interactive Food Ordering App

## Overview

FoodStories is an Instagram Stories-inspired food ordering application that provides an engaging, interactive way to browse and customize dishes. The app transforms traditional food ordering into an immersive story-telling experience where users can explore restaurants, view dishes, and customize ingredients through interactive hotspots.

## Problem Solution

### Challenge
Create an engaging food ordering interface that combines social media interaction patterns with e-commerce functionality.

### Solution
- **Instagram Stories UI Pattern**: Implemented a familiar swipe-through interface with progress bars and auto-advance
- **Interactive Hotspots**: Added clickable ingredient markers on food images that open detailed customization options
- **Real-time Price Updates**: Dynamic pricing that updates as users modify ingredients
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Custom Design System**: Orange/green color scheme with semantic tokens for consistent theming

## Tech Stack

- **React 18** - Component-based UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component primitives
- **Lucide React** - Icon library
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/
│   ├── StoryViewer.tsx          # Main story container with swipe navigation
│   ├── StoryCircle.tsx          # Restaurant story circle button
│   ├── ProgressBar.tsx          # Story progress indicator
│   ├── IngredientHotspot.tsx    # Interactive ingredient markers
│   ├── IngredientCard.tsx       # Ingredient detail display
│   ├── CustomizationSheet.tsx   # Bottom sheet for dish customization
│   └── ui/                      # shadcn/ui components
├── pages/
│   └── Index.tsx                # Main page with restaurant grid
├── types/
│   └── story.ts                 # TypeScript interfaces
├── assets/                      # Food and restaurant images
└── index.css                    # Design system tokens
```

## How It Works

### 1. Story Navigation
- Users tap restaurant circles to view their dishes
- Progress bars show position in story sequence
- Swipe or tap to navigate between stories
- Auto-advance after viewing duration

### 2. Interactive Ingredients
- Pulsing hotspots mark customizable ingredients
- Tap hotspots to view ingredient details
- Toggle ingredients on/off with price updates
- Visual indicators show modified state

### 3. Customization Flow
- Select a dish to open customization sheet
- Review all available ingredients
- Add/remove ingredients with real-time pricing
- Order button shows final total

### 4. Design System
- Semantic color tokens (primary, secondary, accent)
- HSL color space for consistency
- Custom animations (pulse-ring, scale-in)
- Responsive breakpoints

## Building the Code

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation


# Install dependencies
npm install
```

### Build for Production

```bash
# Create optimized production build
npm run build



### Build Output
- Minified JavaScript bundles
- Optimized CSS with Tailwind
- Compressed images and assets
- Ready for deployment to any static host

## Running the Application

### Development Mode

```bash
# Start development server with hot reload
npm run dev
```

The app will be available at:
- Local: `http://localhost:8080`
- Network: `http://[your-ip]:8080`

### Preview Production Build

```bash
# Build and preview production version
npm run build
npm run preview
```

### Testing the Features

1. **View Restaurant Stories**
   - Click any restaurant circle on the homepage
   - Stories will open in fullscreen mode

2. **Navigate Stories**
   - Tap right side to go forward
   - Tap left side to go backward
   - Swipe left/right on mobile
   - Press Escape to close

3. **Interact with Ingredients**
   - Look for pulsing orange dots on food images
   - Click dots to view ingredient details
   - Card appears with name, description, and price

4. **Customize Dishes**
   - Click "Customize Your Dish" button
   - Toggle ingredients on/off
   - Watch price update in real-time
   - Click "Order Now" to complete

5. **Responsive Testing**
   - Resize browser to test mobile views
   - Test touch interactions on mobile devices
   - Verify hotspot positioning across sizes

## Key Features

- ✅ Instagram Stories-style interface
- ✅ Interactive ingredient hotspots
- ✅ Real-time price calculations
- ✅ Smooth animations and transitions
- ✅ Fully responsive design
- ✅ Type-safe with TypeScript
- ✅ Accessible keyboard navigation
- ✅ Touch-friendly mobile interactions

## Design Principles

1. **Mobile-First**: Optimized for touch interactions
2. **Performance**: Fast load times with optimized assets
3. **Accessibility**: Keyboard navigation and ARIA labels
4. **Consistency**: Semantic design tokens throughout
5. **User Experience**: Familiar interaction patterns

## Future Enhancements

- Backend integration with Lovable Cloud
- User authentication and order history
- Payment processing with Stripe
- Real restaurant and menu data
- Push notifications for orders
- User reviews and ratings


