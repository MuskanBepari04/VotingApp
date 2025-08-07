import { useState } from "react";
import userContext from "./userContext";

const UseContextProvider = ({children}) => {
    const [userInfo , setUserInfo]=useState({});
  return (
    <userContext.Provider value={{userInfo , setUserInfo}}>
      {children}
    </userContext.Provider>
  )
}

export default UseContextProvider
