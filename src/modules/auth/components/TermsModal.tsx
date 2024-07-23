import React, { useState } from "react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Términos y Condiciones</h2>
        <p>Aquí van los términos y condiciones...</p>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="termsCheckbox">
            Acepto los términos y condiciones
          </label>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button
            className="btn btn-danger"
            onClick={onAccept}
            disabled={!isChecked}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
