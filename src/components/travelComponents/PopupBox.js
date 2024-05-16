import React from "react";
import "../../styles/popupbox.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const PopupBox = ({ content, onClose }) => {
    return (
      <div className="popup-box" style={{display:"flex",zIndex:"1000px"}}>
        <div className="popup-content">
         <div> <button className="close-button" onClick={onClose}><CloseOutlinedIcon/></button></div>
          <div className="full-content-scrollable">
            <p>{content}</p>
          </div>
        </div>
      </div>
    );
  };
  export default PopupBox;