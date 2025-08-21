# Crux - Adventure Logbook Social Platform (Rock Climbing, Canyoning, Caving, Alpinism, Diving)

## Overview

Crux is a social platform and digital logbook designed for adventure sports enthusiasts. It provides a central place to document, share, and discover adventures across activities such as rock climbing, canyoning, caving, alpinism, and diving.

The platform enables users to keep detailed records of their logs, upload media, track progress across disciplines, and connect with others who share the same passions. With an emphasis on community and storytelling, Crux turns your logbook into a living archive of your journey outdoors.

This project began as a personal initiative to combine my love for outdoor sports with web development. It’s an ongoing full-stack project where I’ve built the database structure, authentication, media handling, and much of the frontend UI.

## Features (work in progress)

- **Logs**: Record adventures across multiple sports with discipline-specific details (e.g. climbing grades, cave technical styles, canyon descent notes). Dedicated pages for each log with full notes, stats, and media.
- **Media Uploads**: Add photos and videos with captions to your logs
- **Log Feed & User Profiles**: Browse logs from yourself and others, filterable by sport or activity, showcasing adventure history and media.
- **Editing & Updates**: Update past logs and manage uploaded media with previews, add/remove, and captions.
- **Authentication**: Secure login and account management with JWT-based auth.
- **AI-Powered Objective Discovery**: Integrating **Gemini AI** into Crux’s **Explore** page to help adventurers discover new outdoor objectives in new locations. Search and receive tailored suggestions for climbs, caves, canyons, and alpine routes that match their interests, skill level, and travel goals.
- **Interactive Map**: Where user logs are displayed as pins at their recorded locations. Each pin will expand into a preview showing activity type, photos, captions, and log details, making it easy to visually explore the adventures of the Crux community.



## Technology Stack

- **Frontend**: React, TypeScript, TailwindCSS, Radix UI, Swiper.js
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (production), SQLite (development)
- **Authentication**: Auth0
- **UI Components**: Radix UI, Headless UI, Shadcn UI
- **Animation**: GSAP, Anime.js, Vanta.js for background effects
- **Build Tools**: Vite, ESBuild



You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).

