import { format } from "date-fns";
import { BsTrash } from "react-icons/bs";
import HistoryContext from "../../context/HistoryContext";
import { useContext } from "react";

const HistoryItem = ({ date, phone, status, start, end, index }) => {
  const { setHistory } = useContext(HistoryContext);

  const range = (end - start) / 1000;
  const duration = `${Math.round(range / 60)}m ${Math.round(range % 60)}s`;

  const handleDelete = () => {
    setHistory((prev) =>
      prev.filter((item, idx) => prev.length - 1 - index !== idx)
    );
  };

  return (
    <div className="history-item">
      <div className="content">
        <div className="time">
          <div>{format(new Date(date), "MM/dd/yyyy")}</div>
          <div>{format(new Date(date), "hh:mm bbbb")}</div>
        </div>
        <div className="info">
          <span className="phone-number">{phone}</span>
          <span
            className={status === "Success" ? "status success" : "status fail"}
          >
            Status: <em>{status}</em>
          </span>
          <span className="duration">
            Duration: <em>{duration}</em>
          </span>
        </div>
      </div>

      <div className="icon-delete" onClick={handleDelete}>
        <BsTrash />
      </div>
    </div>
  );
};

export default HistoryItem;
