export default function SearchFilter({ searchTerm, setSearchTerm, region, setRegion, language, setLanguage }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'];
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 animate-fadeIn">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full md:w-1/3 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform animate-fadeInRight"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full md:w-1/5 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform animate-fadeInLeft"
      >
        <option value="">Filter by Region</option>
        {regions.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
      </select>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border-2 border-[#000080] dark:border-[#0000b3] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full md:w-1/5 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#000080]/50 dark:focus:ring-[#0000b3]/50 transition-all duration-500 focus:scale-105 transform animate-fadeInLeft"
      >
        <option value="">Filter by Language</option>
        {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
      </select>
    </div>
  );
}