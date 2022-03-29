import "./number-item.scss";

const NumberItem = ({ num, text, setPhoneNumber }) => {
  return (
    <div
      className="number-item"
      onClick={() => {
        setPhoneNumber((prev) => prev + String(num));
      }}
    >
      <span className="number">{num}</span>
      <span className="letters">{text || <br />}</span>
    </div>
  );
};

export default NumberItem;
