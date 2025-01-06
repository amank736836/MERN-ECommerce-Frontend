import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAapSLmyk5u4dNM4_99u7XHd4EJcnfiCao",
  authDomain: "mern-ecommerce-ak-2024.firebaseapp.com",
  projectId: "mern-ecommerce-ak-2024",
  storageBucket: "mern-ecommerce-ak-2024.appspot.com",
  messagingSenderId: "638425419027",
  appId: "1:638425419027:web:eabb8e9a9bfbf03c7e5ee6",
  measurementId: "G-SD80TMKLS2",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
