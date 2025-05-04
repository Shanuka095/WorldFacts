🌍 WorldFacts
Welcome to WorldFacts, a dynamic web application that lets you explore detailed information about countries worldwide. Search, filter, and save your favorite countries with an intuitive and responsive interface.
🚀 Deployment
The application is live and accessible at:
WorldFacts on Vercel
Share this link with friends to showcase your project!
✨ Features
🔐 User Authentication

Register: Create a new account to personalize your experience.
Login: Access your account with existing credentials.
Local Storage: User data is stored in the browser’s localStorage for persistence (demo purposes).

🌎 Country Exploration

Browse Countries: View a list of all countries with key details (flag, population, capital).
Search: Find countries by name using real-time search.
Filter: Narrow down countries by region or language.
Detailed View: Dive into comprehensive country profiles.

📍 Detailed Country View

Official Info: See flags, official names, and capitals.
Stats: Explore population, area, currencies, and languages.
Interactive Map: View the country’s location on a map (powered by Leaflet).
Time Display: Compare local time with the country’s time using a real-time clock.

❤️ User Preferences

Favorites: Save countries to a favorites list.
Quick Access: Toggle between all countries and your favorites.
Dark Mode: Switch between light and dark themes for better usability.

🛠️ Tech Stack
Frontend

React 18: Core framework for building the UI.
React Router 6: Seamless navigation between pages.
Tailwind CSS 3: Modern, utility-first styling.
Framer Motion: Smooth animations and transitions.
React-Leaflet: Interactive maps for country locations.
React Clock: Real-time clock for time zone display.

Development Tools

Vite: Fast build tool and development server.
Jest & React Testing Library: Unit testing for components.
ESLint: Code quality and consistency.
Vercel: Hosting and automatic deployments.

Data Storage

LocalStorage: Stores user data and favorites (for demo purposes).
REST Countries API: Fetches comprehensive country data.

📦 Setup & Installation

Clone the Repository
git clone https://github.com/Shanuka095/Rest-Countries-App-Frontend.git
cd Rest-Countries-App-Frontend


Install Dependencies
npm install


Start the Development Server
npm run dev

Open your browser and navigate to http://localhost:5173.

Building for Production
npm run build

The build artifacts will be stored in the dist/ directory.

Running Tests
npm test



📂 Project Structure
Rest-Countries-App-Frontend/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── CountryCard.jsx      # Card for country summaries
│   │   ├── SearchFilter.jsx     # Search and filter controls
│   │   ├── Header.jsx           # Navigation header
│   │   ├── __tests__/           # Component tests
│   ├── pages/                   # Main application pages
│   │   ├── Home.jsx             # Country list page
│   │   ├── CountryDetails.jsx   # Detailed country view
│   │   ├── __tests__/           # Page tests
│   ├── services/                # API services
│   │   ├── api.js               # REST Countries API functions
│   ├── __mocks__/               # Mock files for testing

🌐 API Integration
The app uses the REST Countries API with the following endpoints:

getAllCountries(): Fetches all countries.
getCountryByName(name): Searches countries by name.
getCountriesByRegion(region): Filters countries by region.
getCountryByCode(code): Retrieves a specific country by code.

Environment variable:

VITE_API_URL=https://restcountries.com/v3.1 (set in Vercel).

📝 Technical Report
Choice of API
The REST Countries API was chosen for:

Comprehensive Data: Includes flags, population, languages, timezones, and more.
No Authentication: Freely accessible, simplifying development.
Reliability: Stable with good uptime and fast responses.
Documentation: Clear and predictable response structure.

Challenges and Solutions

Client-Side Authentication

Challenge: Managing user authentication without a backend.
Solution: Used localStorage to store user credentials and session data, suitable for a frontend-only demo.


Responsive Design

Challenge: Ensuring the app looks great on mobile and desktop.
Solution: Leveraged Tailwind CSS for responsive layouts with media queries and flexbox.


Time Zone Display

Challenge: Showing accurate country time vs. local time.
Solution: Used Intl.DateTimeFormat for timezone conversions and React Clock for real-time display.


Efficient Filtering

Challenge: Performant search and filter on a large dataset.
Solution: Implemented client-side filtering with React state, caching the country list to reduce API calls.


Testing Reliability

Challenge: Testing components with API dependencies.
Solution: Mocked API services using Jest to isolate components and ensure reliable tests.



Future Improvements

Add a backend for secure authentication and data storage.
Implement advanced filters (e.g., population, area).
Add country comparison and statistical charts.
Support offline mode with service workers.
Introduce multilingual UI support.

📱 Mobile Access
The app is fully responsive and works on mobile devices:

Open https://world-facts.vercel.app in your mobile browser (e.g., Chrome, Safari).
Explore countries, search, and view details on the go.
Share the link with friends for easy access on their devices.

📜 License
This project was developed as part of an academic assignment at SLIIT.

Built with ❤️ by Shanuka Induran
