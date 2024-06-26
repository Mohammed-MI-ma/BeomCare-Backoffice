// serviceWorkerRegistration.js

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async function () {
      navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        },
        function (err) {
          console.error("Service Worker registration failed:", err);
        }
      );
    });
  } else {
    console.warn("Service Worker is not supported in this browser.");
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error("Error unregistering Service Worker:", error);
      });
  }
}
