import "./keypad.scss";
import NumberItem from "../number-item/NumberItem";

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

const KeyPad = ({ setPhoneNumber }) => {
  return (
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
  );
};

export default KeyPad;
