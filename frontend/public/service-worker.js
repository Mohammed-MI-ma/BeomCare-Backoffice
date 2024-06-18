/* eslint-disable no-undef */
// public/service-worker.js
/* eslint-disable no-restricted-globals */
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received.");

  event.notification.close();

  const targetUrl = "https://yourdomain.com"; // Change to your application's URL

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }
        // If no matching client is found, open a new window/tab with the target URL
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});

self.addEventListener("pushsubscriptionchange", (event) => {
  console.log("Push subscription change event detected.");

  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then((subscription) => {
        fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
  );
});
