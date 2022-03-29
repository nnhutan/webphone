import "./App.scss";
import JsSIP from "jssip";
import { useState } from "react";
import Home from "./components/home/Home";
import CallScreen from "./components/call-screen/CallScreen";

var socket = new JsSIP.WebSocketInterface("wss://sbc03.tel4vn.com:7444");
var configuration = {
  sockets: [socket],
  session_timers: false,
  uri: "105@2-test1.gcalls.vn:50061",
  password: "test1105",
};

var ua = new JsSIP.UA(configuration);

ua.start();

// Register callbacks to desired call events
var eventHandlers = {
  progress: function (e) {
    console.log("call is in progress");
  },
  failed: function (e) {
    console.log(e);
    console.log("call failed with cause: ");
  },
  ended: function (e) {
    console.log("call ended with cause: ");
  },
  confirmed: function (e) {
    console.log("call confirmed");
  },
};

var options = {
  eventHandlers: eventHandlers,
  mediaConstraints: { audio: true, video: true },
};

// var session = ua.call("sip:bob@example.com", options);

function App() {
  const [phoneNumber, setPhoneNumber] = useState("0123456789");

  return (
    <div className="App">
      {/* <Home phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} /> */}
      <CallScreen phoneNumber={phoneNumber} />
    </div>
  );
}

export default App;
