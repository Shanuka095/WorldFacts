export default function SearchFilter({ searchTerm, setSearchTerm, region, setRegion }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  return (
    <div className="flex justify-between items-center gap-6 mb-10 animate-fadeIn">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full md:w-1/3 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform animate-fadeInRight"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border-2 border-[#740938] dark:border-[#a0114e] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 p-4 rounded-xl w-full md:w-1/5 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#740938]/50 dark:focus:ring-[#a0114e]/50 transition-all duration-500 focus:scale-105 transform animate-fadeInLeft"
      >
        <option value="">Filter by Region</option>
        {regions.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
      </select>
    </div>
  );
}