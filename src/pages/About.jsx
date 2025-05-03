export default function About() {
  return (
    <div className="container mx-auto p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-fadeInUp">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-extrabold text-[#000080] dark:text-[#0000b3] mb-6 tracking-tight">About This App</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">React app for Application Framework module using REST Countries API.</p>
      </div>
    </div>
  );
}