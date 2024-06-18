// serviceWorkerRegistration.js

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${process.env.REACT_APP_BASE_API_URI_DEV}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Error registering Service Worker:", error);
        });
    });
  } else {
    console.warn("Service Worker is not supported by this browser");
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
