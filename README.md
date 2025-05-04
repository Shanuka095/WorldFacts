# 🌍 WorldFacts

**Live Demo:** [world-facts.vercel.app](https://world-facts.vercel.app)

WorldFacts is a modern, responsive web application that allows users to explore detailed information about countries around the world. Built with cutting-edge technologies and clean UI/UX principles, WorldFacts lets you search, filter, and favorite countries, all with real-time data and interactive maps.

---

## 🚀 Features

- 🔐 **Authentication**  
  Register and log in securely (demo mode) with data stored in `localStorage`.

- 🌐 **Country Exploration**  
  Browse all countries, search by name, filter by region or language, and access detailed profiles.

- 📍 **Detailed Country View**  
  View flags, population, currencies, languages, live clocks, and interactive maps via React-Leaflet.

- ⭐ **Personalization**  
  Save favorite countries, toggle grid/list views, and switch between light and dark themes.

---

## 🛠️ Tech Stack

| Category      | Technologies                                                                 |
|---------------|------------------------------------------------------------------------------|
| **Frontend**  | React 18, React Router 6, Tailwind CSS 3, Framer Motion, React-Leaflet, React Clock |
| **Development** | Vite, Jest, React Testing Library, ESLint                                 |
| **Storage**   | Browser `localStorage` (for demo)                                             |
| **API**       | [REST Countries API](https://restcountries.com/)                             |
| **Deployment**| Vercel with custom `vercel.json` for SPA routing                             |

---

## 📦 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/Shanuka095/Rest-Countries-App-Frontend.git
cd Rest-Countries-App-Frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Visit in browser
http://localhost:5173

# Build for production
npm run build

# Output: dist/

# Run tests
npm test
```

---

## 📁 Project Structure

```
Rest-Countries-App-Frontend/
├── src/
│   ├── components/
│   │   ├── CountryCard.jsx         # Country summary card
│   │   ├── SearchFilter.jsx        # Search and filter controls
│   │   ├── Header.jsx              # Navigation header
│   │   └── __tests__/              # Component unit tests
│   ├── pages/
│   │   ├── Home.jsx                # Country listing page
│   │   ├── CountryDetails.jsx      # Detailed country view
│   │   └── __tests__/              # Page-specific tests
│   ├── services/
│   │   └── api.js                  # API interaction layer
│   └── __mocks__/                  # Mock data for testing
├── vercel.json                     # SPA routing rules for Vercel
```

---

## 🌍 API Integration

WorldFacts uses the REST Countries API to retrieve global data.

**Endpoints Used:**

- `GET /all` – Fetch all countries  
- `GET /name/{name}` – Search by name  
- `GET /region/{region}` – Filter by region  
- `GET /alpha/{code}` – Get by ISO country code

**Environment Variable:**

```
VITE_API_URL=https://restcountries.com/v3.1
```

---

## 📱 Mobile Experience

The app is fully responsive and mobile-friendly.  
Simply visit: [world-facts.vercel.app](https://world-facts.vercel.app) on any smartphone or tablet to enjoy an optimized experience.

---

## 🧠 Technical Insights

### Why REST Countries API?

- ✅ No API key required  
- 🌐 Rich data: flags, languages, population, and more  
- ⚡ Fast, stable, and well-documented  

### Key Challenges & Solutions

| Challenge                      | Solution                                                   |
|-------------------------------|------------------------------------------------------------|
| Authentication (no backend)   | Used `localStorage` for demo-mode user data               |
| Device responsiveness          | Tailwind CSS responsive utilities                         |
| Timezone accuracy              | Implemented with `Intl.DateTimeFormat` + `React Clock`    |
| Efficient filtering/search     | Client-side caching and optimized filter logic            |
| SPA Routing on Vercel (404s)   | Custom `vercel.json` with rewrite rules                   |

---

## 🚧 Future Enhancements

- 🔒 Full backend for authentication  
- 📊 Advanced filters (e.g., by population, sub-region)  
- 📈 Data visualization with charts  
- 📶 Offline support with service workers  
- 🌐 Multilingual interface support  

---

## 🤝 Contributing

This is an academic project developed for a course at SLIIT. While it’s not actively maintained, contributions, suggestions, and feedback are welcome!

> To contribute: Open an issue or submit a pull request on [GitHub](https://github.com/Shanuka095/Rest-Countries-App-Frontend).

---

## 📄 License

Developed for educational purposes at the **Sri Lanka Institute of Information Technology (SLIIT)**.  
Usage and modification are permitted with attribution.

---

## ✨ Created By

**Shanuka Induran**  
> Discover the world — one country at a time: [WorldFacts 🌍](https://world-facts.vercel.app)

---
