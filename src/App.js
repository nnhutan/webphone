import "./App.scss";
import JsSIP from "jssip";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import CallScreen from "./components/call-screen/CallScreen";
import { useRef } from "react";
import { useStopwatch } from "react-timer-hook";

function App() {
  const audioRef = useRef();
  const [status, setStatus] = useState("start");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ua, setUa] = useState(null);
  const [session, setSession] = useState(null);
  const [speakerOff, setSpeakerOff] = useState(false);
  const { seconds, minutes, isRunning, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

  var eventHandlers = {
    failed: function (e) {
      setStatus("start");
      setPhoneNumber("");
    },

    ended: function (e) {
      pause();
      setStatus("start");
      setPhoneNumber("");
    },

    confirmed: function (e) {
      reset();
    },
  };

  var options = {
    eventHandlers: eventHandlers,
    mediaConstraints: { audio: true, video: true },
  };

  useEffect(() => {
    try {
      var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
      var configuration = {
        sockets: [socket],
        session_timers: false,
        uri: "105@2-test1.gcalls.vn:50061",
        password: "test1105",
      };
      var ua = new JsSIP.UA(configuration);
      ua.start();
      ua.on("newRTCSession", function (e) {
        setSession(e.session);
        console.log("newRTCSession", e);
        console.log("session", e.session.answer);
        e.session.connection.addEventListener("addstream", (event) => {
          console.log(event);
          audioRef.current.srcObject = event.stream;
        });
        e.session.connection.addEventListener("removestream", (event) => {
          console.log("removestream", event);
        });
      });

      setUa(ua);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="App">
      {status === "start" ? (
        <Home
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          ua={ua}
          options={options}
          setSpeakerOff={setSpeakerOff}
          setStatus={setStatus}
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
