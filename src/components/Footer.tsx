import { Link } from 'react-router-dom';
import { DnaIcon, Github } from 'lucide-react';

function Footer() {
  const footerItems = [
    { name: 'Beranda', path: '/' },
    // { name: 'Tentang Deret', path: '/about' },
    { name: 'Pemodelan', path: '/modeling' },
    { name: 'Kuis', path: '/quiz' },
    { name: 'Bantuan', path: '/help' },
  ];

  const title = 'geometpop';

  return (
    <footer className="w-full border-t border-t-custom-gray bg-custom-gray/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link
              to="/"
              className="flex justify-start lg:justify-start text-dark-blue font-bold text-4xl"
            >
              <span className="text-custom-yellow font-bold text-4xl">
                Geomet
              </span>
              <span className="text-dark-blue font-bold text-4xl">Pop</span>
              <DnaIcon className="text-custom-yellow ml-0" size={34} />
            </Link>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-left lg:text-left">
              "GeometPop membantu Anda memahami konsep Geometri dengan cara yang
              lebih mudah dan interaktif."
            </p>
          </div>

          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-gray-900 font-medium mb-7">
              Quick Links
            </h4>
            <ul className="text-sm  transition-all duration-500">
              {footerItems.map((item) => (
                <li key={item.path} className="mb-6">
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">
              Contribute
            </h4>
            <Link
              to="https://github.com/Raka-coder/geo-pop-dynamics"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <Github className="mr-1" size={16} />
              <span>View on GitHub</span>
            </Link>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 items-center">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-500 ">
              <Link to="/" target="_blank" rel="noopener noreferrer">
                &copy;{title}
              </Link>{' '}
              2025, All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
