import { format } from "date-fns";

const HistoryItem = ({ date, phone, status, start, end }) => {
  const range = (end - start) / 1000;
  const duration = `${Math.round(range / 60)}m ${Math.round(range % 60)}s`;
  return (
    <div className="history-item">
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
  );
};

export default HistoryItem;
