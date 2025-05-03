export default function SearchFilter({ searchTerm, setSearchTerm, region, setRegion, language, setLanguage }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-fadeIn">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300 animate-slideInLeft"
      />
      <div className="flex gap-4 w-full md:w-auto">
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full md:w-40 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300 animate-slideInRight"
        >
          <option value="">Filter by Region</option>
          {regions.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-[#20B2AA] dark:border-[#1A8E88] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded-lg w-full md:w-40 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#20B2AA] dark:focus:ring-[#1A8E88] transition-all duration-300 animate-slideInRight"
        >
          <option value="">Filter by Language</option>
          {languages.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
        </select>
      </div>
    </div>
  );
}