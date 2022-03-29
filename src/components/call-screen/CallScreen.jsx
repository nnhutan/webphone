import "./call-screen.scss";
import { BsPersonFill, BsMicMute } from "react-icons/bs";
import { GiSpeaker } from "react-icons/gi";
import { IoIosKeypad } from "react-icons/io";
import { ImPhoneHangUp } from "react-icons/im";
import useFormatPhoneNumber from "./../../hooks/useFormatPhoneNumber";

const CallScreen = ({ phoneNumber }) => {
  const formatPhoneNumber = useFormatPhoneNumber();
  return (
    <div className="call-container">
      <div className="call-top">
        <div className="avatar">
          <BsPersonFill className="person-icon" />
        </div>
        <div className="phone-number">{formatPhoneNumber(phoneNumber)}</div>
        <span className="status">Calling...</span>
      </div>
      <div className="call-bottom">
        <div className="actions">
          <span className="actions-item">
            <GiSpeaker className="actions-icon" />
          </span>
          <span className="actions-item">
            <BsMicMute className="actions-icon" />
          </span>
          <span className="actions-item">
            <IoIosKeypad className="actions-icon" />
          </span>
        </div>
        <button className="cancel">
          <ImPhoneHangUp className="cancle-icon" />
        </button>
      </div>
    </div>
  );
};

export default CallScreen;
