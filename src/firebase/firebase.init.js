import { initializeApp } from "firebase/app";
import firebaseConfig from "./firabase.config";

const initializationFirebase = () => {
  initializeApp(firebaseConfig);
};

export default initializationFirebase;