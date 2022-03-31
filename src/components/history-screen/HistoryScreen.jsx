import "./history-screen.scss";
import HistoryContext from "../../context/HistoryContext";
import { useContext } from "react";
import HistoryItem from "./HistoryItem";
import { IoMdArrowBack } from "react-icons/io";

const HistoryScreen = ({ setSeeLogs }) => {
  const { history } = useContext(HistoryContext);

  return (
    <div className="history-container">
      <div className="header">
        <div
          className="icon"
          onClick={() => {
            setSeeLogs(false);
          }}
        >
          <IoMdArrowBack className="back-icon" />
        </div>
        <h3 className="title">Call logs</h3>
      </div>
      <div className="lists">
        {history.length === 0 ? (
          <p>No recent calls</p>
        ) : (
          [...history]
            .reverse()
            .map((item, index) => (
              <HistoryItem
                date={item.startTime}
                phone={item.phoneNumber}
                start={item.start}
                end={item.end}
                status={item.status}
                key={index}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
