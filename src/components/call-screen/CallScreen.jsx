import "./call-screen.scss";
import { BsPersonFill, BsMicMute } from "react-icons/bs";
import { IoIosKeypad } from "react-icons/io";
import {
  IoCloseCircleOutline,
  IoCloseCircle,
  IoVolumeMuteSharp,
} from "react-icons/io5";
import { ImPhoneHangUp } from "react-icons/im";
import useFormatPhoneNumber from "./../../hooks/useFormatPhoneNumber";
import { useState } from "react";
import KeyPad from "./../key-pad/KeyPad";

const CallScreen = ({
  phoneNumber,
  ua,
  session,
  speakerOff,
  setSpeakerOff,
  seconds,
  minutes,
  isRunning,
}) => {
  const [currNum, setCurrNum] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showKeyPad, setShowKeyPad] = useState(false);
  const [muted, setMuted] = useState(false);

  const formatPhoneNumber = useFormatPhoneNumber();
  return (
    <div className="call-container">
      <div className="call-top">
        <div className="avatar">
          <BsPersonFill className="person-icon" />
        </div>
        <div className="phone-number">{formatPhoneNumber(phoneNumber)}</div>
        {!isRunning ? (
          <span className="status">Calling...</span>
        ) : (
          <span className="status">{minutes + " : " + seconds}</span>
        )}
      </div>
      <div className="call-bottom">
        {!showKeyPad ? (
          <div className="actions">
            <span
              className={speakerOff ? "actions-item active" : "actions-item"}
              onClick={() => {
                setSpeakerOff(!speakerOff);
              }}
            >
              <IoVolumeMuteSharp className="actions-icon" />
            </span>
            <span
              className={muted ? "actions-item active" : "actions-item"}
              onClick={() => {
                muted ? session.unmute() : session.mute();
                setMuted(!muted);
              }}
            >
              <BsMicMute className="actions-icon" />
            </span>
            <span
              className="actions-item"
              onClick={() => {
                setShowKeyPad(true);
              }}
            >
              <IoIosKeypad className="actions-icon" />
            </span>
          </div>
        ) : (
          <div className="keypad">
            <div className="phone-number">{currNum}</div>
            <KeyPad setPhoneNumber={setCurrNum} />
            <div
              className="close-icon"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              onClick={() => {
                setCurrNum("");
                setShowKeyPad(false);
              }}
            >
              {isHovered ? <IoCloseCircle /> : <IoCloseCircleOutline />}
            </div>
          </div>
        )}
        <button
          className="cancel"
          onClick={() => {
            ua.terminateSessions();
          }}
        >
          <ImPhoneHangUp className="cancle-icon" />
        </button>
      </div>
    </div>
  );
};

export default CallScreen;
