# 🚀 MERN Stack Developer Portfolio

A modern, responsive, and professional portfolio website built with React and Material-UI, showcasing MERN Stack development skills with an attractive design and excellent user experience.

## ✨ Features

- **Modern Design**: Dark theme with gradient accents and smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Smooth scrolling, hover effects, and animations
- **Professional Sections**: Hero, About, Skills, Projects, Experience, and Contact
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance**: Optimized for fast loading and smooth interactions
- **Accessibility**: WCAG compliant with proper focus management

## 🛠️ Technologies Used

- **Frontend**: React 19, Material-UI (MUI)
- **Styling**: CSS3 with custom animations and gradients
- **Build Tool**: Vite
- **Icons**: Material-UI Icons
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Hero.jsx            # Hero section with animated text
│   │   ├── About.jsx           # About me section
│   │   ├── Skills.jsx          # Skills and expertise
│   │   ├── Projects.jsx        # Portfolio projects
│   │   ├── Experience.jsx      # Work experience and education
│   │   ├── Contact.jsx         # Contact form and information
│   │   └── Footer.jsx          # Footer with social links
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Custom CSS and animations
│   └── main.jsx                # Application entry point
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🎨 Customization Guide

### 1. Personal Information

Update the following files with your personal information:

#### Hero Section (`components/Hero.jsx`)
- Change "Your Name" to your actual name
- Update the description text
- Modify the animated text array
- Update social media links

#### About Section (`components/About.jsx`)
- Update your personal story
- Modify education details
- Update work experience
- Customize your values and mindset

#### Skills Section (`components/Skills.jsx`)
- Adjust skill levels (percentages)
- Add/remove skills based on your expertise
- Update skill categories

#### Projects Section (`components/Projects.jsx`)
- Replace project data with your actual projects
- Update project images, descriptions, and links
- Modify technologies used
- Add your GitHub and live demo links

#### Experience Section (`components/Experience.jsx`)
- Update work history with your experience
- Modify education details
- Add your certifications
- Update achievements and responsibilities

#### Contact Section (`components/Contact.jsx`)
- Update email address
- Modify phone number
- Update location
- Update social media links

#### Footer (`components/Footer.jsx`)
- Update copyright information
- Modify social media links
- Update contact information

### 2. Styling and Theme

#### Color Scheme
The portfolio uses a custom dark theme with:
- Primary: `#00d4ff` (Cyan)
- Secondary: `#ff6b6b` (Coral)
- Background: `#0a0a0a` to `#1a1a1a`
- Text: `#ffffff` and `#b0b0b0`

To change colors, update the theme object in `App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
      // ... other color variations
    },
    secondary: {
      main: '#your-secondary-color',
      // ... other color variations
    },
    // ... other theme options
  },
});
```

#### Typography
Customize fonts in the theme object:

```javascript
typography: {
  fontFamily: '"Your Font", "Roboto", "Helvetica", "Arial", sans-serif',
  // ... other typography options
}
```

### 3. Images and Assets

#### Project Images
- Replace placeholder images in the Projects section
- Use high-quality images (recommended: 800x600px)
- Optimize images for web (compress to reduce file size)

#### Profile Picture
- Add your profile picture to the Hero section
- Update the image path in the component

### 4. Content Updates

#### Text Content
- Review and update all text content to match your experience
- Ensure consistency in tone and style
- Proofread for grammar and spelling

#### Links
- Update all external links (GitHub, LinkedIn, etc.)
- Test all links to ensure they work correctly
- Add your actual project URLs

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## ♿ Accessibility Features

- Proper heading hierarchy
- Alt text for images
- Focus management
- Keyboard navigation support
- High contrast support
- Reduced motion support

## 🎯 Performance Optimization

- Lazy loading for images
- Optimized animations
- Efficient CSS
- Minimal bundle size
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Material-UI for the component library
- Unsplash for placeholder images
- React community for inspiration

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Reach out on social media

---

**Happy coding! 🎉**

Remember to showcase your best work and let your personality shine through in your portfolio. Good luck with your job search or client projects!
