# Personal Portfolio
Academic portfolio built with Next.js, Tailwind CSS, and Lucide React, showcasing my academic profile as a Mechatronics Engineering student at Unicamp.

## 🚀 Technologies Used
- **Next.js 14** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **TypeScript** - Static typing for JavaScript

## 📋 Prerequisites
Before getting started, make sure you have installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation and Setup

### 1. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```
or
```bash
yarn install
```
This will install all required dependencies, including:
- Next.js
- React and React DOM
- Tailwind CSS and its dependencies (PostCSS, Autoprefixer)
- Lucide React
- TypeScript and type definitions

### 2. Run the Project in Development Mode
After installing the dependencies, run:
```bash
npm run dev
```
or
```bash
yarn dev
```
The project will be available at [http://localhost:3000](http://localhost:3000)

### 3. Production Build
To create an optimized production build:
```bash
npm run build
```
And to run the production version:
```bash
npm start
```

## 📁 Project Structure
```
Portfolio1/
├── app/
│   ├── layout.tsx       # Main application layout
│   ├── page.tsx         # Main page (portfolio)
│   └── globals.css      # Global styles with Tailwind
├── public/              # Static files (if needed)
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## 🎨 Customization

### Colors and Theme
The elegant dark theme uses Tailwind's Slate palette. To customize the colors, edit the `app/page.tsx` file and update the Tailwind CSS classes.

### Content
The main content is located in `app/page.tsx`. You can edit:
- Personal information in the Hero section
- Contact links (LinkedIn and Email)
- Experience and education
- Projects and their descriptions
- Skills and technologies

## 📱 Responsiveness
The design is fully responsive and optimized for:
- Mobile devices (smartphones)
- Tablets
- Desktops

## 🔧 Tailwind CSS Configuration
Tailwind CSS is already configured and working. The configuration is in `tailwind.config.js` and the global styles are in `app/globals.css`.

If you need to add new classes or further customize the styles, refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs).

## 📝 Available Scripts
- `npm run dev` - Starts the development server
- `npm run build` - Creates the production build
- `npm start` - Starts the production server
- `npm run lint` - Runs the ESLint linter

## 🌐 Deployment
This project can be easily deployed on platforms such as:
- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- Any server that supports Node.js

## 📄 License
This is a personal and academic project.

## 👤 Author
**Rafael Melo**
- Email: rafaelrpm10@gmail.com
- LinkedIn: [Rafael Melo](https://www.linkedin.com/in/rafael-rodrigues-pimentel-de-melo-9588a02b3/)

---
Built with ❤️ using Next.js and Tailwind CSS
