import React, { createContext, useEffect, useState } from "react";
import { gethistoryMbbank } from "../../api/Bank/payment";
import getpatientbyaccountid from "../../api/Doctor/patient";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  useEffect(() => {
    const getTrans = async () => {
      await gethistoryMbbank();
    };
    getTrans();
    const interval = setInterval(getTrans, 5000);
    // Dọn dẹp interval khi component bị unmount
    return () => clearInterval(interval);
  }, []);
  const [patient, setPatient] = useState([]);
  useEffect(() => {
    const getPatient = async () => {
      try {
        const result = await getpatientbyaccountid(1);
        console.log("result : " + JSON.stringify(result));
        setPatient(result);
      } catch (error) {
        console.error("Error fetching patient by account ID:", error);
      }
    };
    getPatient();
  }, []);
  const [isShow, setisShow] = useState(false);
  const [content, setContent] = useState();
  const [specialtyid, setspecialtyid] = useState(0);
  console.log(isShow, content);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [isShow]);

  return (
    <AppContext.Provider
      value={{ setisShow, setContent, content, specialtyid, setspecialtyid, patient }}
    >
      {children}
      {isShow && (
        <div className="fixed inset-0 z-[100000]">
          <div
            className="absolute inset-0 flex items-center justify-center  bg-slate-600/60"
            onClick={() => setisShow(false)}
          >
            <div className="z-[100002]" onClick={(e) => e.stopPropagation()}>
              {content}
            </div>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};

export default AppProvider;
