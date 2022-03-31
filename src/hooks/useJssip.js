import { useContext, useEffect, useState, useRef } from "react";
import HistoryContext from "../context/HistoryContext";

import { useStopwatch } from "react-timer-hook";
import JsSIP from "jssip";

const useJssip = () => {
  const audioRef = useRef();
  const { setHistory } = useContext(HistoryContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ua, setUa] = useState(null);
  const [session, setSession] = useState(null);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [status, setStatus] = useState("start");
  const { seconds, minutes, isRunning, pause, reset } = useStopwatch({
    autoStart: false,
  });

  var eventHandlers = {
    failed: function (e) {
      setStatus("fail");
      setPhoneNumber("");
      setHistory((prev) => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], status: "Fail", start: 0, end: 0 },
      ]);
    },

    ended: function (e) {
      setHistory((prev) => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], end: new Date().getTime() },
      ]);

      pause();
      setStatus("start");
      setPhoneNumber("");
    },

    confirmed: function (e) {
      reset();
      setHistory((prev) => [
        ...prev.slice(0, -1),
        {
          ...prev[prev.length - 1],
          status: "Success",
          start: new Date().getTime(),
        },
      ]);
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
        e.session.connection.addEventListener("addstream", (event) => {
          audioRef.current.srcObject = event.stream;
        });
      });

      setUa(ua);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCall = () => {
    setSpeakerOff(false);
    if (phoneNumber) {
      setHistory((prev) => [
        ...prev,
        {
          startTime: new Date(),
          phoneNumber,
        },
      ]);
      ua.call(phoneNumber.replace(" ", ""), options);
      setStatus("calling");
    }
  };

  return [
    seconds,
    minutes,
    status,
    phoneNumber,
    setPhoneNumber,
    handleCall,
    session,
    speakerOff,
    setSpeakerOff,
    isRunning,
    audioRef,
  ];
};

export default useJssip;
