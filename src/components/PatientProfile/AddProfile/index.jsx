import React from "react";
import Breadcrumbs from "../../Hospital/Breadcrumbs";

function AddProfile(props) {
  return (
    <div className="flex justify-center py-5">
      <div className="w-4/5 mb-2">
        <Breadcrumbs />
        <div className="w-full h-screen  justify-center grid grid-cols-2 bg-slate-500 rounded-lg mt-5">
          <div className="col-span- w-full h-full bg-orange-800 rounded-tl-lg rounded-bl-lg"></div>
          <div className="col-span- w-full h-full bg-violet-300">
            <img
              src="https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=1694&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="banner"
              className="w-full h-full object-cover rounded-tr-lg rounded-br-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProfile;
