// src/components/TurnstileModal.jsx
import { Turnstile } from '@marsidev/react-turnstile';

const WidgetTurnstile = ({ siteKey, onSuccess, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Turnstile
          siteKey={siteKey}
          onSuccess={(token) => {
            console.log('Token:', token);
            onSuccess(token);
            onClose(); // Close modal after success
          }}
        />
        <button
          className="mt-4 text-sm text-blue-600 hover:underline"
          onClick={onClose}
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default WidgetTurnstile;
