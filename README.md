🌍 WorldFacts
Explore Now: https://world-facts.vercel.app
Discover the world with WorldFacts – your gateway to country insights!

WorldFacts is a vibrant, user-friendly web app that lets you explore detailed information about countries worldwide. Search, filter, and save your favorite countries with a sleek, responsive interface.
🚀 Deployment
The application is live at:WorldFacts on Vercel
Share this link with friends to showcase your project!
✨ Features
🔐 User Authentication

Register: Create a new account to personalize your experience.  
Login: Access your account with existing credentials.  
Local Storage: Persists user data in localStorage (demo purposes).

🌎 Country Exploration

Browse Countries: View all countries with flags, population, and capitals.  
Search: Find countries instantly by name.  
Filter: Sort by region or language.  
Detailed View: Explore in-depth country profiles.

📍 Detailed Country View

Official Info: Flags, official names, and capitals.  
Stats: Population, area, currencies, languages.  
Interactive Map: Locate countries with React-Leaflet.  
Live Clock: Compare local and country time.

❤️ User Preferences

Favorites: Save and manage favorite countries.  
Quick Toggle: Switch between all countries and favorites.  
Dark Mode: Seamless light/dark theme switching.

🛠️ Tech Stack



Category
Tools



Frontend
React 18, React Router 6, Tailwind CSS 3, Framer Motion, React-Leaflet, React Clock


Development
Vite, Jest, React Testing Library, ESLint


Storage
Browser localStorage (demo)


API
REST Countries API


Hosting
Vercel


📦 Setup & Installation

Clone the Repository  
git clone https://github.com/Shanuka095/Rest-Countries-App-Frontend.git
cd Rest-Countries-App-Frontend


Install Dependencies  
npm install


Start the Development Server  
npm run dev

Open http://localhost:5173 in your browser.

Build for Production  
npm run build

Artifacts are stored in dist/.

Run Tests  
npm test



📂 Project Structure
Rest-Countries-App-Frontend/
├── src/
│   ├── components/              # UI components
│   │   ├── CountryCard.jsx      # Country summary card
│   │   ├── SearchFilter.jsx     # Search and filter UI
│   │   ├── Header.jsx           # Navigation header
│   │   ├── __tests__/           # Component tests
│   ├── pages/                   # App pages
│   │   ├── Home.jsx             # Country list
│   │   ├── CountryDetails.jsx   # Country details
│   │   ├── __tests__/           # Page tests
│   ├── services/                # API services
│   │   ├── api.js               # REST Countries API calls
│   ├── __mocks__/               # Test mocks

🌐 API Integration
The app leverages the REST Countries API with endpoints:

getAllCountries(): Fetch all countries.
getCountryByName(name): Search by name.
getCountriesByRegion(region): Filter by region.
getCountryByCode(code): Get country by code.

Environment Variable:  

VITE_API_URL=https://restcountries.com/v3.1 (configured in Vercel).

📱 Mobile Access
Access WorldFacts on any device:  

Open https://world-facts.vercel.app in your mobile browser (Chrome, Safari).  
Enjoy a responsive design optimized for phones and tablets.

📸 Screenshot
Explore countries with an intuitive interface.
📝 Technical Report
Why REST Countries API?

Rich Data: Flags, population, languages, timezones, and more.
No Auth: Freely accessible, no API keys needed.
Reliable: Stable with fast response times.
Well-Documented: Easy-to-use endpoints.

Challenges & Solutions

Client-Side Authentication  

Challenge: No backend for user management.  
Solution: Used localStorage for session and credential storage (demo-friendly).


Responsive Design  

Challenge: Supporting mobile and desktop layouts.  
Solution: Tailwind CSS with responsive utilities and media queries.


Time Zone Handling  

Challenge: Accurate time display for countries.  
Solution: Intl.DateTimeFormat for conversions, React Clock for visuals.


Efficient Filtering  

Challenge: Fast search/filter on large datasets.  
Solution: Client-side filtering with cached country data.


Testing Dependencies  

Challenge: Testing API-dependent components.  
Solution: Jest mocks for API and localStorage.



Future Enhancements

Backend for secure authentication.
Advanced filters (e.g., population, area).
Country comparison and charts.
Offline mode with service workers.
Multilingual UI support.

📜 License
Developed for an academic assignment at SLIIT.

Built with ❤️ by Shanuka InduranShare the app: world-facts.vercel.app
