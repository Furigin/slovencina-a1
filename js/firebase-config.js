// =====================================================================
//  НАСТРОЙКА ОБЛАКА (Firebase). Пошагово — в README.md, раздел «Облако».
//
//  Если поставить null — сайт работает без аккаунтов, прогресс только
//  в браузере. Формат объекта firebaseConfig из консоли Firebase:
//
//  export const FIREBASE_CONFIG = {
//    apiKey: "...",
//    authDomain: "....firebaseapp.com",
//    projectId: "...",
//    storageBucket: "...",
//    messagingSenderId: "...",
//    appId: "...",
//  };
//
//  Это НЕ секрет: такой конфиг всегда виден в браузере. Защищают данные
//  правила доступа из файла firestore.rules.
// =====================================================================
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAb1vMSsT_lwwfS3QJchhWMRN7ZKu7N56c",
  authDomain: "slovencina-a1.firebaseapp.com",
  projectId: "slovencina-a1",
  storageBucket: "slovencina-a1.firebasestorage.app",
  messagingSenderId: "897953514959",
  appId: "1:897953514959:web:485ae0a87f891905f9beba",
};
