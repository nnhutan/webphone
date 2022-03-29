import "./App.scss";
import JsSIP from "jssip";
import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import CallScreen from "./components/call-screen/CallScreen";
import { useRef } from "react";

// ua.start();

// Register callbacks to desired call events

// var session = ua.call("sip:bob@example.com", options);

function App() {
  const audioRef = useRef();
  const [status, setStatus] = useState("start");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ua, setUa] = useState(null);
  const [session, setSession] = useState(null);

  var eventHandlers = {
    progress: function (e) {
      console.log("call is in progress", e);
      setStatus("calling");
    },
    failed: function (e) {
      console.log(e);
      console.log("call failed with cause: ", e);
      setStatus("start");
      setPhoneNumber("");
    },
    ended: function (e) {
      console.log("call ended with cause: ", e);
      setStatus("start");
      setPhoneNumber("");
    },
    confirmed: function (e) {
      console.log("call confirmed", e);
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
      });

      setUa(ua);
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log(session);
  return (
    <div className="App">
      {status === "start" ? (
        <Home
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          ua={ua}
          options={options}
        />
      ) : (
        <CallScreen phoneNumber={phoneNumber} ua={ua} session={session} />
      )}
      <audio ref={audioRef} autoPlay hidden={true} />
    </div>
  );
}

export default App;
