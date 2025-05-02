export default function SearchFilter({ searchTerm, setSearchTerm, region, setRegion }) {
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 rounded w-full md:w-1/5"
        >
          <option value="">Filter by Region</option>
          {regions.map((reg) => <option key={reg} value={reg}>{reg}</option>)}
        </select>
      </div>
    );
  }