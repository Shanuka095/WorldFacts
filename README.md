🌍 WorldFacts
🌟 Explore WorldFacts Live: https://world-facts.vercel.app
Embark on a global journey with WorldFacts – your ultimate guide to country insights!

WorldFacts is a sleek, responsive web application that brings the world to your fingertips. Explore countries, search and filter data, save favorites, and enjoy a modern UI with interactive maps and real-time clocks.
🚀 Deployment
Live and ready to explore:WorldFacts on VercelShare this link with friends to showcase your creation!
✨ Features
🔐 Seamless Authentication

Sign Up: Create a personalized account.  
Log In: Access your profile effortlessly.  
Persistent Data: User sessions stored in localStorage (demo mode).

🌎 Global Exploration

Browse Countries: Discover all countries with vibrant flags and key stats.  
Instant Search: Find countries by name in real-time.  
Smart Filters: Sort by region or language with ease.  
Rich Profiles: Dive into detailed country information.

📍 Immersive Country Details

Official Data: Flags, official names, capitals, and more.  
Key Stats: Population, area, currencies, languages.  
Interactive Maps: Pinpoint locations with React-Leaflet.  
Real-Time Clock: Compare local and country time instantly.

❤️ Personalized Experience

Favorites: Save and revisit your favorite countries.  
Toggle Views: Switch between all countries and favorites.  
Dark Mode: Enjoy a light or dark theme for comfort.

🛠️ Tech Stack



Category
Tools



Frontend
React 18, React Router 6, Tailwind CSS 3, Framer Motion, React-Leaflet, React Clock


Development
Vite, Jest, React Testing Library, ESLint


Storage
Browser localStorage (demo purposes)


API
REST Countries API


Hosting
Vercel with vercel.json for SPA routing


📦 Setup & Installation

Clone the Repository  
git clone https://github.com/Shanuka095/Rest-Countries-App-Frontend.git
cd Rest-Countries-App-Frontend


Install Dependencies  
npm install


Run the Development Server  
npm run dev

Visit http://localhost:5173 in your browser.

Build for Production  
npm run build

Output stored in dist/.

Execute Tests  
npm test



📂 Project Structure
Rest-Countries-App-Frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CountryCard.jsx      # Displays country summaries
│   │   ├── SearchFilter.jsx     # Search and filter controls
│   │   ├── Header.jsx           # Navigation bar
│   │   ├── __tests__/           # Component unit tests
│   ├── pages/                   # Application pages
│   │   ├── Home.jsx             # Country list view
│   │   ├── CountryDetails.jsx   # Detailed country view
│   │   ├── __tests__/           # Page unit tests
│   ├── services/                # API interactions
│   │   ├── api.js               # REST Countries API functions
│   ├── __mocks__/               # Mock data for testing
├── vercel.json                  # Vercel routing configuration

🌐 API Integration
Powered by the REST Countries API:  

getAllCountries(): Retrieve all countries.  
getCountryByName(name): Search countries by name.  
getCountriesByRegion(region): Filter by region.  
getCountryByCode(code): Fetch country by code.

Environment Variable:  

VITE_API_URL=https://restcountries.com/v3.1 (configured in Vercel).

📱 Mobile-Friendly Design
Experience WorldFacts on any device:  

Open https://world-facts.vercel.app in Chrome, Safari, or any mobile browser.  
Enjoy a responsive, touch-friendly interface optimized for phones and tablets.

📸 Screenshots
Browse countries with a vibrant, user-friendly design.
Dive into detailed country profiles with maps and stats.
📝 Technical Report
Why REST Countries API?

Comprehensive: Offers flags, population, languages, timezones, and more.  
Accessible: No authentication or API keys required.  
Reliable: Stable with fast, consistent responses.  
Well-Documented: Clear endpoints for seamless integration.

Challenges & Solutions

Client-Side Authentication  

Challenge: No backend for user management.  
Solution: Used localStorage for user sessions (demo-friendly).


Responsive Design  

Challenge: Ensuring a seamless experience across devices.  
Solution: Tailwind CSS with responsive utilities and media queries.


Time Zone Display  

Challenge: Accurate country time rendering.  
Solution: Intl.DateTimeFormat for conversions, React Clock for visuals.


Efficient Data Filtering  

Challenge: Performant search and filtering.  
Solution: Client-side filtering with cached API data.


Vercel 404 on Reload  

Challenge: 404 errors on sub-route reloads due to client-side routing.  
Solution: Added vercel.json with a rewrite rule to route all requests to index.html.



Future Enhancements

Backend integration for secure authentication.  
Advanced filters (e.g., population, area ranges).  
Interactive charts for country comparisons.  
Offline support with service workers.  
Multilingual interface for global users.

🤝 Contributing
This project is part of an academic assignment, but feedback is welcome! Open an issue or submit a pull request on GitHub.
📜 License
Developed for an academic assignment at SLIIT.

Crafted with ❤️ by Shanuka Induran🌍 Share the journey: world-facts.vercel.app📢 Show your friends and explore the world together!
