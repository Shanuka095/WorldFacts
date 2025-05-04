WorldFacts 🌐
Live Demo: https://world-facts.vercel.app
Your elegant guide to exploring countries worldwide.

  
  
  
  
  


WorldFacts is a sophisticated, responsive web application that empowers users to explore, search, and save country information with a modern, intuitive interface. Built with cutting-edge technologies, it offers a seamless experience across devices.
🌟 Features

AuthenticationSecurely register and log in, with user data persisted in localStorage for a demo experience.

Country ExplorationBrowse all countries, search by name, filter by region or language, and access detailed profiles.

Rich Country DetailsView flags, population, currencies, languages, interactive maps (via React-Leaflet), and real-time clocks comparing local and country time.

PersonalizationSave favorite countries, toggle between all and favorite views, and switch between light/dark themes.


🛠 Tech Stack



Category
Technologies



Frontend
React 18, React Router 6, Tailwind CSS 3, Framer Motion, React-Leaflet, React Clock


Development
Vite, Jest, React Testing Library, ESLint


Storage
Browser localStorage (demo)


API
REST Countries API


Deployment
Vercel with vercel.json for SPA routing


📦 Setup & Installation

Clone the Repository  
git clone https://github.com/Shanuka095/Rest-Countries-App-Frontend.git
cd Rest-Countries-App-Frontend


Install Dependencies  
npm install


Start Development Server  
npm run dev

Open http://localhost:5173.

Build for Production  
npm run build

Output in dist/.

Run Tests  
npm test



📂 Project Structure
Rest-Countries-App-Frontend/
├── src/
│   ├── components/              # UI components
│   │   ├── CountryCard.jsx      # Country summary
│   │   ├── SearchFilter.jsx     # Search/filter UI
│   │   ├── Header.jsx           # Navigation
│   │   ├── __tests__/           # Tests
│   ├── pages/                   # Pages
│   │   ├── Home.jsx             # Country list
│   │   ├── CountryDetails.jsx   # Country details
│   │   ├── __tests__/           # Tests
│   ├── services/                # API logic
│   │   ├── api.js               # API calls
│   ├── __mocks__/               # Test mocks
├── vercel.json                  # Vercel routing

🌍 API Integration
The app integrates the REST Countries API:  

GET /all: Fetch all countries.  
GET /name/{name}: Search by name.  
GET /region/{region}: Filter by region.  
GET /alpha/{code}: Get country by code.

Environment Variable:  
VITE_API_URL=https://restcountries.com/v3.1

📱 Mobile Experience
Access WorldFacts anywhere:  

Open https://world-facts.vercel.app in any mobile browser.  
Enjoy a fully responsive, touch-optimized interface.

📸 Screenshots

  
  


Explore countries with a clean, modern UI.
🔍 Technical Insights

Why REST Countries API?


Rich Data: Comprehensive details like flags, population, and timezones.  
No Authentication: Free and accessible without keys.  
Reliable: Stable with fast responses.  
Documented: Clear, predictable endpoints.


Challenges & Solutions


Authentication Without Backend  

Challenge: No server for user management.  
Solution: localStorage for user sessions (demo).


Responsive Design  

Challenge: Cross-device compatibility.  
Solution: Tailwind CSS with responsive utilities.


Time Zone Rendering  

Challenge: Accurate country time display.  
Solution: Intl.DateTimeFormat and React Clock.


Performant Filtering  

Challenge: Fast search/filter on large data.  
Solution: Client-side filtering with caching.


Vercel 404 on Reload  

Challenge: 404 errors on sub-routes.  
Solution: vercel.json with rewrite rule for SPA routing.




Future Enhancements


Backend for secure authentication.  
Advanced filters (e.g., population ranges).  
Interactive charts for comparisons.  
Offline support via service workers.  
Multilingual UI.

🤝 Get Involved
This project is an academic assignment, but feedback is welcome! Open an issue on GitHub.
📜 License
Developed for an academic assignment at SLIIT.


  Created with passion by Shanuka Induran  
  🌍 Discover the world at world-facts.vercel.app
  Share with friends and explore together! 🚀
