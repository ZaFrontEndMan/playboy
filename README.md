# PLAYBOY - Luxury Streetwear E-Commerce

A high-end, Awwwards style fashion e-commerce website built with **Next.js 15**, featuring smooth scrolling, interactive 3D elements, and stunning animations.

![Project Preview](https://via.placeholder.com/1200x600/000000/05783A?text=PLAYBOY+PREVIEW)

## 🎨 Key Features

- **Buttery Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) for that premium high-end feel.
- **Micro-Animations**: Extensive use of [Framer Motion](https://www.framer.com/motion/) for fluid text reveals, transitions, and hover effects.
- **3D Interactive Scenes**: Seamless integration with [Spline](https://spline.design/) for immersive web experiences.
- **Dynamic Layouts**: Horizontal scroll product showcases and adaptive grids.
- **Responsive & Accessible**: Fully optimized for mobile, tablet, and desktop.
- **Advanced UI**: Built with Tailwind CSS v4 and DaisyUI for a modern, customizable look.

## 🎯 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [@studio-freight/react-lenis](https://github.com/darkroomengineering/react-lenis)
- **3D Engine**: [@splinetool/react-spline](https://github.com/splinetool/react-spline)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/ZaFrontEndMan/playboy.git
   cd fw
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                # Next.js App Router (Pages, Layouts, API)
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── public/             # Static assets (Images, SVGs)
├── store/              # Zustand state management
└── styles/             # Global CSS and Tailwind configs
```

## 🛠️ Customization

### Adding Spline 3D Scenes
Modify `components/Hero.tsx` or any specific section to include your Spline URL:
```tsx
import Spline from '@splinetool/react-spline';

export default function MyComponent() {
  return <Spline scene="YOUR_SPLINE_SCENE_URL" />;
}
```

### Global Styles
Colors and basic theme tokens can be adjusted in `app/globals.css`:
```css
:root {
  --brand-green: #05783A;
  --brand-pink: #E079B7;
}
```

## 🤝 Contributing
Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ for the future of digital fashion.
