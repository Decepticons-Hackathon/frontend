import React from "react";

interface IProps {
  isOpen
  onClose
  children: React.ReactNode;
}

const Popup: React.FC<IProps> = (props) => {

  React.useEffect(() => {
    if (!props.isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      };
    }

      document.addEventListener('keydown', handleEscClose);

      return () => document.removeEventListener("keydown", handleEscClose);
  }, [props.isOpen]);

  function handleClickClose(evt) {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={handleClickClose}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={props.onClose} />
        {props.children}
      </div>
    </div>
  );
};

export default Popup;
