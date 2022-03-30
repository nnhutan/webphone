import { createContext, useEffect, useState } from "react";

const HistoryContext = createContext({});
export const HistoryProvider = ({ children }) => {
  const callHistory = localStorage.getItem("call-history");
  const lst = (callHistory && JSON.parse(callHistory)) || [];
  const [history, setHistory] = useState(lst);

  useEffect(() => {
    localStorage.setItem("call-history", JSON.stringify(history));
  }, [history]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
