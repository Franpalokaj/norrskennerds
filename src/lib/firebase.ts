import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkY9dKPrrHkUcuUXrK4brK_V7aNea79Mw",
  authDomain: "norrsken-workshop.firebaseapp.com",
  databaseURL: "https://norrsken-workshop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "norrsken-workshop",
  storageBucket: "norrsken-workshop.firebasestorage.app",
  messagingSenderId: "264539975123",
  appId: "1:264539975123:web:3e92d26e864b5f79435326",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const stepRef = ref(db, "workshop/currentStep");

export function setStep(step: number) {
  return set(stepRef, step);
}

export function onStepChange(callback: (step: number) => void) {
  return onValue(stepRef, (snapshot) => {
    const val = snapshot.val();
    callback(typeof val === "number" ? val : -1);
  });
}
