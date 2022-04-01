import "./history-screen.scss";
import HistoryContext from "../../context/HistoryContext";
import { useContext } from "react";
import HistoryItem from "./HistoryItem";
import { IoMdArrowBack } from "react-icons/io";
import { BsTrash } from "react-icons/bs";

const HistoryScreen = ({ setSeeLogs }) => {
  const { history, setHistory } = useContext(HistoryContext);

  return (
    <div className="history-container">
      <div className="header">
        <div className="wrapper">
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

        <div
          className="delete-icon"
          onClick={() => {
            setHistory([]);
          }}
        >
          <BsTrash />
        </div>
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
                index={index}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
