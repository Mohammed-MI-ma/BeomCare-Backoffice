/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyCtoZA4wdYLxJxkEEXSydYG6NObGrRFM4I",
  authDomain: "beomecare-bacoffice.firebaseapp.com",
  projectId: "beomecare-bacoffice",
  storageBucket: "beomecare-bacoffice.appspot.com",
  messagingSenderId: "461051106876",
  appId: "1:461051106876:web:e911ec9f95dd5353f75539",
  measurementId: "G-7TPQNCN3S7",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  if (payload.notification) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/logo192.png",
      actions: [
        { action: "view", title: "View" },
        { action: "dismiss", title: "Dismiss" },
      ],
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } else {
    console.log("No notification data found in payload");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  if (event.action === "view") {
    clients.openWindow("https://admin.beomcare.com");
  } else {
    console.log("rrrrrrrrrrrr");
  }
});
