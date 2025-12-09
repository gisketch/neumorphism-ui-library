# gisketch-neumorphism

A **neumorphic** React component library based on [shadcn/ui](https://ui.shadcn.com/). Designed specifically for dashboard applications with a soft, tactile UI aesthetic.

## Features

- 🎨 **Neumorphism Design** - Soft shadows, rounded corners, and depth effects
- 🌓 **Dark/Light Mode** - Full theme support with CSS variables
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **Customizable** - Built with Tailwind CSS and CSS variables
- 📱 **Dashboard-ready** - Components designed for data visualization and admin panels

## Installation

```bash
npm install gisketch-neumorphism
```

## Quick Start

### 1. Import the styles

```tsx
import "gisketch-neumorphism/styles.css";
```

### 2. Configure Tailwind CSS

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/gisketch-neumorphism/dist/**/*.{js,ts,jsx,tsx}",
  ],
};
```

### 3. Use components

```tsx
import { Button, Card, CardContent, Input, Badge } from "gisketch-neumorphism";

export function Dashboard() {
  return (
    <Card variant="flat">
      <CardContent className="p-6 space-y-4">
        <Badge variant="success">Active</Badge>
        <Input placeholder="Search..." />
        <Button variant="primary">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Core Components
- **Button** - Interactive buttons with flat, pressed, primary, destructive, success, warning variants
- **Card** - Container with flat, pressed, convex, and interactive variants
- **Input** - Text input with pressed (inset) and flat shadow styles
- **Textarea** - Multi-line input with neumorphic styling

### Form Components
- **Select** - Dropdown select with neumorphic styling
- **RadioGroup** - Radio button groups
- **Checkbox** - Checkbox inputs with pressed/raised states
- **Switch** - Toggle switches for boolean settings
- **FileUpload** - Drag and drop file upload with preview
- **Label** - Form labels
- **FormField** - Form wrapper with label, description, and error support

### Dashboard Components
- **Sidebar** - Navigation sidebar with collapsible support
- **Table** - Data tables with neumorphic styling
- **Badge** - Status indicators and labels
- **Avatar** - User profile images with neumorphic containers
- **Progress** - Progress bars for loading states and metrics
- **Slider** - Range slider for numeric values

### Layout & Typography
- **Separator** - Visual dividers
- **Skeleton** - Loading placeholders
- **Heading** - H1-H6 typography
- **Text** - Paragraph and text variations
- **Code** - Code blocks and inline code
- **Blockquote** - Quote styling
- **List** - Ordered and unordered lists

## Neumorphism Design Tokens

The library uses CSS variables for theming:

```css
:root {
  /* Shadows */
  --shadow-light: 255, 255, 255;
  --shadow-dark: 200, 200, 210;
  
  /* Primary color (HSL components) */
  --primary-h: 217;
  --primary-s: 70%;
  --primary-l: 55%;
}

.dark {
  --shadow-light: 50, 50, 55;
  --shadow-dark: 15, 15, 18;
}
```

## Documentation

For detailed documentation, usage examples, and the complete neumorphism design guide, see [USAGE.md](./USAGE.md).

## Development

```bash
# Install dependencies
npm install

# Run dev server with component viewer
npm run dev

# Build library
npm run build
```

## License

MIT
