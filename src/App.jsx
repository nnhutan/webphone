import "./App.scss";
import Home from "./components/home/Home";
import CallScreen from "./components/call-screen/CallScreen";
import HistoryScreen from "./components/history-screen/HistoryScreen";
import useJssip from "./hooks/useJssip";
import { useState } from "react";

function App() {
  const [
    seconds,
    minutes,
    status,
    phoneNumber,
    setPhoneNumber,
    handleCall,
    ua,
    session,
    speakerOff,
    setSpeakerOff,
    isRunning,
    audioRef,
  ] = useJssip();
  const [seeLogs, setSeeLogs] = useState(false);

  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return (
    <div className="App">
      {seeLogs ? (
        <HistoryScreen setSeeLogs={setSeeLogs} />
      ) : status !== "calling" ? (
        <Home
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleCall={handleCall}
          setSeeLogs={setSeeLogs}
        />
      ) : (
        <CallScreen
          phoneNumber={phoneNumber}
          ua={ua}
          session={session}
          speakerOff={speakerOff}
          setSpeakerOff={setSpeakerOff}
          seconds={secondTime}
          minutes={minuteTime}
          isRunning={isRunning}
        />
      )}
      <audio ref={audioRef} autoPlay hidden={true} muted={speakerOff} />
    </div>
  );
}

export default App;
