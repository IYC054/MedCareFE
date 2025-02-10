import React, { createContext, useEffect, useState } from "react";
import { gethistoryMbbank } from "../../api/Bank/payment";
import { getpatientbyaccountid } from "../../api/Doctor/patient";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // useEffect(() => {
  //   const getTrans = async () => {
  //     await gethistoryMbbank();
  //   };
  //   getTrans();
  //   const interval = setInterval(getTrans, 5000);
  //   // Dọn dẹp interval khi component bị unmount
  //   return () => clearInterval(interval);
  // }, []);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [userRole, setUserRole] = useState(localStorage.getItem("user_scope"));
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
  useEffect(() => {
    console.log("ABC: " + userId);
    console.log("ABC: " + userRole);
  }, []);
  return (
    <AppContext.Provider
      value={{
        setisShow,
        setContent,
        content,
        specialtyid,
        setspecialtyid,
        userId,
        userRole,
      }}
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
