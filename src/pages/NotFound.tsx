import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream newspaper-texture newspaper-font">
      <div className="text-center bg-cream border border-gray-300 rounded-lg shadow-md p-8 newspaper-font newspaper-texture">
        <h1 className="text-4xl font-bold mb-4 newspaper-font">404</h1>
        <p className="text-xl text-gray-700 mb-4 newspaper-font">Oops! Page not found</p>
        <a href="/" className="text-blue-700 hover:text-blue-900 underline newspaper-font">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
