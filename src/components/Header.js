import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl font-bold">REST Countries</Link>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}