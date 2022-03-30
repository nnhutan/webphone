import "./home.scss";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { VscHistory } from "react-icons/vsc";
import { TiBackspaceOutline, TiBackspace } from "react-icons/ti";
import useFormatPhoneNumber from "./../../hooks/useFormatPhoneNumber";
import KeyPad from "../key-pad/KeyPad";

const Home = ({ phoneNumber, setPhoneNumber, handleCall, setSeeLogs }) => {
  const [isHovered, setIsHovered] = useState(false);
  const formatPhoneNumber = useFormatPhoneNumber();

  return (
    <div className="mobile-container">
      <div className="header">
        <div className="logo">WebPhone</div>
        <div
          className="history-btn"
          onClick={() => {
            setSeeLogs(true);
          }}
        >
          <VscHistory />
        </div>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          value={formatPhoneNumber(phoneNumber)}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="Phone number"
          className="phone-number-input"
        />
        {phoneNumber && (
          <div
            className="delete-btn"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setPhoneNumber((prev) => prev.slice(0, -1).trim())}
          >
            {isHovered ? (
              <TiBackspace className="delete-icon" />
            ) : (
              <TiBackspaceOutline className="delete-icon" />
            )}
          </div>
        )}
      </div>

      <KeyPad setPhoneNumber={setPhoneNumber} />

      <button className="call-btn" onClick={handleCall}>
        <FiPhone className="call-icon" />
      </button>
    </div>
  );
};

export default Home;
