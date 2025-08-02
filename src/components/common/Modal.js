import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

// Create a portal container for the modal to ensure proper stacking context
const ModalPortal = ({ children }) => {
  const el = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      el.current = document.createElement('div');
      const modalRoot = document.getElementById('modal-root') || document.body;
      modalRoot.appendChild(el.current);
      setMounted(true);
      
      return () => {
        if (el.current) {
          modalRoot.removeChild(el.current);
        }
      };
    }
  }, []);

  // Only render the portal when mounted on the client
  return mounted && el.current ? createPortal(children, el.current) : null;
};

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent content shift when scrollbar disappears
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div 
        className="modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className="modal-content"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
              {title}
            </h2>
            <button 
              type="button"
              onClick={onClose}
              className="modal-close"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
