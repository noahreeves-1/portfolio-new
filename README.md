# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This portfolio showcases my journey from management consultant to developer, featuring animated sections, project showcases, and a contact form.

## Features

- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Animated UI**: GSAP animations for a modern, engaging experience
- **Project Showcase**: Modal-based project display with details and links
- **Contact Form**: Functional contact form with email integration
- **Dark Theme**: Sleek dark theme with teal accents

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Icons**: React Icons
- **Email**: Nodemailer for contact form
- **Analytics**: PostHog (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file based on `.env.local.example` and add your email credentials

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

- **Personal Information**: Update your name, bio, and contact details
- **Projects**: Add your own projects in the `ProjectsSection.tsx` component
- **Resume**: Update your work history and skills in the Resume page
- **Images**: Replace placeholder images in the `public` directory
- **Colors**: Modify the color scheme in the Tailwind config

## Deployment

This project is ready to deploy on Vercel:

```bash
npm run build
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT

## Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from React Icons
- Animation techniques from GSAP
