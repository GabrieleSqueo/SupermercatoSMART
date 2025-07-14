import React, { useEffect } from 'react';

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl shadow-xl px-6 py-4 border-2 border-blue-200 text-center">
        <div className="p-2  text-blue-800 font-semibold rounded">
          {message}
        </div>
      </div>
    </div>
  );
};

export default PopupMessage; 