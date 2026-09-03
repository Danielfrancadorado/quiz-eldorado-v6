import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCY8-9dL0g-fumrPTALntFgw8kRJKBArWY",
  authDomain: "quiz-eldorado.firebaseapp.com",
  projectId: "quiz-eldorado",
  storageBucket: "quiz-eldorado.firebasestorage.app",
  messagingSenderId: "232797126629",
  appId: "1:232797126629:web:b45a3a418f6bfec272790c",
  measurementId: "G-6BSQHSFYRX"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.orderBy = orderBy;
window.limit = limit;
window.onSnapshot = onSnapshot;
window.doc = doc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
