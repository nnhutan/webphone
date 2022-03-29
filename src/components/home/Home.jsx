import "./home.scss";
import { useState } from "react";
import NumberItem from "../number-item/NumberItem";
import { FiPhone } from "react-icons/fi";
import { TiBackspaceOutline, TiBackspace } from "react-icons/ti";

const keyboard = [
  { num: 1, text: "" },
  { num: 2, text: "abc" },
  { num: 3, text: "def" },
  { num: 4, text: "ghi" },
  { num: 5, text: "jkl" },
  { num: 6, text: "mno" },
  { num: 7, text: "pqrs" },
  { num: 8, text: "tuv" },
  { num: 9, text: "wxyz" },
  { num: "*", text: "" },
  { num: 0, text: "+" },
  { num: "#", text: "" },
];

function formatPhoneNumber(value) {
  if (value.includes("*") || value.includes("#")) return value;
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
    3,
    6
  )} ${phoneNumber.slice(6, 10)}`;
}

const Home = ({ phoneNumber, setPhoneNumber }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mobile-container">
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

      <div className="number-keyboard">
        {keyboard.map((item, index) => (
          <div className="item" key={index}>
            <NumberItem
              num={item.num}
              text={item.text}
              setPhoneNumber={setPhoneNumber}
            />
          </div>
        ))}
      </div>

      <button className="call-btn">
        <FiPhone className="call-icon" />
      </button>
    </div>
  );
};

export default Home;
