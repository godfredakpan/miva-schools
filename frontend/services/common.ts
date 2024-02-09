import { User } from "../utils/types";

  export const getUser = () => {
    if (typeof sessionStorage !== 'undefined') {
        const userStr = sessionStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        else return null;
      } else {
        console.error('sessionStorage is not available in this environment');
      }
    
  }
   

  export const getToken = () => {
    if (typeof sessionStorage !== 'undefined') {
        return sessionStorage.getItem('token') || null;
      } else {
        console.error('sessionStorage is not available in this environment');
      }
    
  }
   

  export const removeUserSession = () => {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = "/auth/login";
      } else {
        console.error('sessionStorage is not available in this environment');
      }
    
  }
   

  export const setUserSession = (token:string, user: User) => {
    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('sessionStorage is not available in this environment');
      }
    
  }
