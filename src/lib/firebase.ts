import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Replace with your Firebase config from console.firebase.google.com
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
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
