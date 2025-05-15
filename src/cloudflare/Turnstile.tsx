import  { useEffect, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: any;
  }
}

const Turnstile = ({ siteKey }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Debugging: Pastikan siteKey valid
    console.log('Site Key:', siteKey);
    if (!siteKey || typeof siteKey !== 'string') {
      console.error('Invalid or missing siteKey');
      return;
    }

    // Load Cloudflare Turnstile script dynamically
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize Turnstile after script is loaded
    const initializeTurnstile = () => {
      if (window.turnstile && containerRef.current) {
        window.turnstile.render(containerRef.current, {
          sitekey: siteKey, // Gunakan nilai siteKey
          callback: (token) => {
            console.log('Turnstile token:', token); // Handle token di sini
          },
        });
      }
    };

    script.onload = initializeTurnstile;

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey]);

  return <div ref={containerRef}></div>;
};

export default Turnstile;