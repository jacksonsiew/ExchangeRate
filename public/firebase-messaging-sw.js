importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyBcYDuN9XHDii0qiv0sEv7Wq6I2yEbe42Y",
  authDomain: "unifo-tenant.firebaseapp.com",
  databaseURL: "https://unifo-tenant.firebaseio.com",
  projectId: "unifo-tenant",
  storageBucket: "unifo-tenant.appspot.com",
  messagingSenderId: "297998470675",
  appId: "1:297998470675:web:53db47a4e7a35f616879e6",
  measurementId: "G-R4NWHF2LSV"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(async function(payload) {
  try {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: './firebase-logo.png'
    };
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  } catch(error) {
    console.log(error);
  }
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});