
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Abhishek Sharma
          </div>
          <p className="text-gray-400 mb-6">
            Building the future, one line of code at a time.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Resume
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Abhishek Sharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
