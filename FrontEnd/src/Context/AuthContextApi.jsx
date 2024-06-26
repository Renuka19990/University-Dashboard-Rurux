import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
 
  const userRes={
    isAuth:false,
    token:""
  }
export const AuthContext =createContext();

export const AuthContextProvider=({children})=>{
      const [isLoggedIn, setLoggedIn] = useState(userRes);
   
      const handleLogin = async({ email, password }) => {
         
         return new Promise(async(resolve,reject)=>{
            try {
                console.log(email,
                  password)
                const res = await axios.post("https://university-dashboard-rurux.onrender.com/studentApi/login", {
                  email,
                  password,
                });
              
                if(res){
                  setLoggedIn({
                    isAuth:true,
                    token:res.data.accessToken
                  })
                }
                console.log(res.data.accessToken)
                localStorage.setItem("accessToken",res.data.accessToken);
                resolve();
              } catch (error) {
                console.log(error);
                reject();
              }
            
         })
         
      };


      console.log(isLoggedIn);
    
     
      const handleLogout = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await axios.get("https://university-dashboard-rurux.onrender.com/studentApi/logout", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res);
          setLoggedIn(userRes);
          localStorage.removeItem("accessToken");
        } catch (error) {
          console.log(error);
        }
      };
   
   
   
   
    return(
        <AuthContext.Provider value={{handleLogin,handleLogout,isLoggedIn,setLoggedIn}}>
             {children}
        </AuthContext.Provider>
    )
}
