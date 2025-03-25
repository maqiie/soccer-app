Soccer Games App
Overview
The Soccer Games App is a React Native application built with Expo that fetches upcoming Major League Soccer (MLS) matches from the Free Sports API. The app includes authentication, profile management, search functionality, and favorites using Firebase and Redux Toolkit.

Features
1. Authentication
Users can sign up and log in using Firebase Authentication.

Protected routes ensure only logged-in users can access the app.

2. Home Screen (Upcoming Matches)
Displays upcoming MLS soccer games fetched dynamically from the Free Sports API.

Implements search functionality using Redux to filter games by team name or league.

Infinite scrolling for seamless browsing.

3. Profile Management
Users can update their profile (name, favorite team, profile picture).

Users can delete their account if needed.

All updates sync in real time with Firebase Firestore.

4. Favorites
Users can favorite matches, and selections are stored in Firebase Firestore.

Favorite matches are listed in the Favorites tab for easy access.

5. Match Details
Clicking on a match opens a detailed match view with additional information.

6. Real-time Updates
Profile changes update in real time using Firestore.

Soccer match data is fetched dynamically.

7. Responsive Design
Built with GlueStack UI for a modern and smooth UI.

Works on both Android and iOS.

Tech Stack
Frontend: React Native (Expo 50+)

State Management: Redux Toolkit

Backend: Firebase (Firestore, Firebase Auth)

API: Free Sports API (https://www.thesportsdb.com/)

Navigation: React Navigation / Expo Router

UI Components: GlueStack UI
