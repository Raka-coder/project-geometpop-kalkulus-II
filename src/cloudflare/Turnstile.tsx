import { useEffect } from 'react';

const Turnstile = ({ siteKey }) => {
  useEffect(() => {
    // Load Cloudflare Turnstile script dynamically
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="turnstile-container">
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-callback="onTurnstileSubmit"
      ></div>
    </div>
  );
};

export default Turnstile;