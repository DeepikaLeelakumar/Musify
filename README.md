# Musify 🎵

Musify is a modern, responsive music streaming web application built with React, Vite, and Firebase.  
It allows users to browse, search, and play songs with a sleek, intuitive interface.

---

## Features

- Browse a collection of songs and albums  
- Search for music by title, artist, or genre  
- Responsive design for desktop and mobile  
- Smooth audio playback with play/pause controls  
- User data and songs storage powered by Firebase  
- Easy navigation with React Router  
- Deployed live on Vercel  

---

## Demo

Check out the live demo here:  
https://musify-eba6c.web.app/


---

## Technologies Used

- React (with functional components and hooks)  
- Vite for fast development and build  
- Firebase for backend services (Authentication, Firestore/Realtime Database, Storage)  
- React Router for navigation  
- Vercel for deployment  

---

## Installation and Setup

### 1. Clone the repository:

```bash
git clone https://github.com/DeepikaLeelakumar/musify.git
cd musify

### 2.Install dependencies:
```bash
npm install

###3.Create a Firebase project and add your Firebase config in the project (e.g., in .env or a config file).

###4.Start the development server:
```bash
npm run dev

###5.Open your browser at http://localhost:5173 (or the port Vite shows) to view the app.

## Firebase Setup
Make sure to:

Enable Firebase Authentication (email/password or other providers you use)

Setup Firestore or Realtime Database to store user data and songs metadata

Setup Firebase Storage for uploading and serving music files

Add your Firebase config keys securely 

## Build and Deploy
### To build the production version:
```bash
npm run build

This creates a dist folder with optimized files.
You can deploy the dist folder to platforms like Vercel.

##Usage
. Use the search bar to find your favorite songs.
. Click on any song to play or pause the audio.
. Login/signup using Firebase Authentication to save your playlists or preferences (if implemented).
. Navigate between different pages using the menu.

