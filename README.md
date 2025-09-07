# Photography Portfolio Website

A modern, responsive React portfolio website inspired by professional photography portfolios. This project features a clean, minimal design with a focus on showcasing photography work.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal design with smooth animations
- **Portfolio Gallery**: Grid-based layout for showcasing photography work
- **Project Detail Pages**: Click on any project to view full photo galleries
- **Image Navigation**: Browse through multiple photos in each project
- **Multiple Sections**: Commissioned Work, Personal Projects, Headshots
- **Admin Panel**: Easy project management with Firebase integration
- **Contact Form**: Functional contact form for inquiries
- **About Page**: Professional information and statistics
- **Smooth Navigation**: React Router for seamless page transitions
- **Firebase Integration**: Cloud-based project management (optional)

## Pages

- **Home**: Hero section with featured work
- **Commissioned Work**: Commercial photography portfolio
- **Personal**: Personal photography projects
- **Headshots**: Professional headshot portfolio
- **Project Detail**: Individual project pages with photo galleries
- **Admin Panel**: Project management interface (accessible at `/admin`)
- **About**: Photographer information and experience
- **Contact**: Contact form and information

## Technologies Used

- React 18
- React Router DOM
- Firebase (Firestore Database)
- CSS3 with modern features
- Responsive Grid Layout
- Font Awesome (for icons)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

4. **Set up Firebase (Optional)**
   - Follow the instructions in `FIREBASE_SETUP.md`
   - Or use the app with local storage (works without Firebase)

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Header.css
│   ├── Gallery.js
│   ├── Gallery.css
│   ├── ProjectDetail.js
│   ├── ProjectDetail.css
│   ├── AdminPanel.js
│   └── AdminPanel.css
├── pages/
│   ├── Home.js
│   ├── Home.css
│   ├── CommissionedWork.js
│   ├── Personal.js
│   ├── Headshots.js
│   ├── About.js
│   ├── About.css
│   ├── Contact.js
│   ├── Contact.css
│   └── Page.css
├── firebase/
│   ├── config.js
│   └── projectService.js
├── utils/
│   └── dataMigration.js
├── data/
│   └── portfolioData.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Customization

### Adding Your Own Images

**Option 1: Using the Admin Panel (Recommended)**
1. Navigate to `/admin` in your browser
2. Click "Add New Project"
3. Fill in the project details and image URLs
4. Save the project

**Option 2: Manual Data Update**
1. Replace the placeholder images in `src/data/portfolioData.js`
2. Update the image URLs to point to your actual photos
3. Modify the titles and categories as needed

### Styling

- Main styles are in `src/App.css`
- Component-specific styles are in their respective CSS files
- Color scheme can be modified in the CSS variables

### Content

- Update the photographer information in the About page
- Modify contact information in the Contact page
- Add your own portfolio data in the data files

## Deployment

### Option 1: GitHub Pages (Recommended)

1. **Create GitHub Repository**
   - Create a new repository on GitHub
   - Update the `homepage` field in `package.json` with your GitHub username and repository name:
     ```json
     "homepage": "https://yourusername.github.io/your-repo-name"
     ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

4. **Access Your Site**
   Your site will be available at: `https://yourusername.github.io/your-repo-name`

### Option 2: Vercel (Alternative)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to deploy

3. **Access Your Site**
   Your site will be available at the provided Vercel URL

### Option 3: Netlify

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `build` folder to [Netlify](https://netlify.com)
   - Or connect your GitHub repository for automatic deployments

3. **Access Your Site**
   Your site will be available at the provided Netlify URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

---

**Note**: This is a template project. Replace placeholder content with your actual photography work and information.
