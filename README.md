# Perkins Creative — Francis Annor's Portfolio Website

A modern, production-ready portfolio website built with React, Tailwind CSS, and Framer Motion. Featuring elegant design, smooth animations, and optimal performance.

## ✨ What's New

### **Complete Redesign to International Standards**

This is a complete rebuild of the portfolio using modern web technologies:

- **Framework**: React 18 + Vite (instant HMR, optimized builds)
- **Styling**: Tailwind CSS (utility-first, highly scalable)
- **Animations**: Framer Motion (smooth, performant animations)
- **Icons**: React Feather (clean, lightweight SVG icons)
- **Dark Mode**: Built-in dark theme (can be extended to light theme)

### **Key Features**

✅ **Modern UI/UX Design** — Elegant, professional, international-standard aesthetic  
✅ **Smooth Animations** — Framer Motion for delightful micro-interactions  
✅ **Responsive Design** — Mobile-first approach, works perfectly on all devices  
✅ **Performance Optimized** — Fast load times, optimized images, code splitting  
✅ **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation  
✅ **SEO Ready** — Meta tags, structured data, optimized for search engines  
✅ **Contact Form** — Built-in contact form with validation  
✅ **Case Studies** — Detailed project showcases with filterable categories  
✅ **Pricing Table** — Clear, scannable pricing with feature comparisons  
✅ **Social Proof** — Stats, testimonials, client success metrics  

## 📂 Project Structure

```
/src
  /components
    - Navigation.jsx      # Top navigation with mobile menu
    - Hero.jsx           # Hero section with CTA
    - About.jsx          # About section with skills
    - SocialProof.jsx    # Stats and client testimonials
    - CaseStudies.jsx    # Detailed project showcases
    - Services.jsx       # Services offered with process overview
    - Process.jsx        # Step-by-step project timeline
    - Pricing.jsx        # Pricing plans and additional services
    - Contact.jsx        # Contact form and contact information
    - Footer.jsx         # Footer with links and social media
  
  - App.jsx             # Main app component
  - main.jsx            # React entry point
  - index.css           # Global styles + Tailwind directives

- index.html            # HTML entry point for Vite
- vite.config.js        # Vite configuration
- tailwind.config.js    # Tailwind CSS configuration
- postcss.config.js     # PostCSS configuration
- package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **Installation**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173/`

## 🎨 Customization

### **Colors**
Edit `tailwind.config.js` to change the primary color scheme:

```js
colors: {
  primary: '#88CC00',  // Change primary brand color here
  // ... other colors
}
```

### **Personal Information**
Update contact details and personal info throughout components:
- `Navigation.jsx` — Logo and navigation links
- `About.jsx` — Bio, skills, contact info
- `Contact.jsx` — Email, phone, WhatsApp
- `Footer.jsx` — Social links and contact

### **Projects/Case Studies**
Edit `CaseStudies.jsx` to add your projects:

```js
const projects = [
  {
    id: 1,
    title: 'Your Project Title',
    category: 'category-name',
    image: 'url-to-image',
    challenge: 'What was the challenge?',
    solution: 'How did you solve it?',
    results: ['Result 1', 'Result 2'],
    stack: ['Tech 1', 'Tech 2'],
    url: 'link-to-project',
  },
]
```

### **Pricing Plans**
Edit `Pricing.jsx` to update pricing and plans

### **Testimonials**
Edit `SocialProof.jsx` to add real client testimonials with photos

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components are tested on multiple screen sizes.

## 🔧 Build & Deployment

### **Production Build**
```bash
npm run build
```
Creates optimized files in `/dist` folder

### **Deployment Options**

**Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```

**Netlify**
1. Connect your Git repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

**Traditional Hosting**
1. Run `npm run build`
2. Upload `/dist` folder to your web server

## 🎯 SEO Optimization

- Meta tags for title, description, keywords
- Open Graph tags for social sharing
- Structured data ready (add as needed)
- Optimized for Core Web Vitals
- Sitemap and robots.txt (add manually or use plugins)

## 🔐 Security

- No sensitive data in frontend
- Contact form should be connected to backend service
- Environment variables support (use .env files)

## 📊 Performance

- Vite ensures <100ms HMR (hot module replacement)
- Optimal code splitting for faster loads
- Tailwind CSS purges unused styles
- Framer Motion optimized for 60fps animations

## 🛠️ Troubleshooting

### Issue: Styles not showing
Make sure you have `npm install` completed and all Tailwind directives are in `src/index.css`

### Issue: Images not loading
Update image URLs in components to use correct paths or external URLs

### Issue: Contact form not working
Form is set up for frontend validation. Connect to a backend service (Formspree, Netlifiy Forms, etc.)

## 📝 Next Steps

1. **Add Your Personal Image** — Replace placeholder images with your professional photos
2. **Update Projects** — Add your real case studies with actual results
3. **Customize Colors** — Adjust primary color to match your brand
4. **Add Testimonials** — Add real client testimonials with photos and company logos
5. **Connect Contact Form** — Set up backend for form submissions
6. **Deploy** — Put it live on Vercel, Netlify, or your hosting

## 🌟 Features to Consider Adding

- Blog section
- Resume/CV download
- Real-time chat integration
- Client project gallery
- Team page (if you expand)
- Newsletter signup
- Analytics integration

## 📄 License

This portfolio is custom-built for Francis Annor. Feel free to modify and use as your personal portfolio.

## 💡 Tips for Success

1. **Keep it Updated** — Regularly add new projects and testimonials
2. **Mobile First** — Always test on mobile devices
3. **Fast Load Times** — Optimize images and minimize JavaScript
4. **Clear CTAs** — Make it easy for visitors to contact you
5. **Social Proof** — Always include real client testimonials and results

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
