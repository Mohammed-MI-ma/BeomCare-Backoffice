// src/pushNotification.js

export const registerPushSubscription = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js"
      );
      console.log("Service Worker registered:", registration);
      console.log("sqdfdsd566,", process.env.PUBLIC_VAPID_KEY);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BDKzVo1g_EOKmSU31ezL0KTEu3iDm4mXtIKKtLEBdNme7cqKKB11_W87DDBWo8jGDYg1cDiKbdRucfMqbBsfcJs"
        ),
      });

      console.log("Push subscription:", subscription);

      await fetch("/api/saveSubscription", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Push subscription registered with backend");
    } catch (error) {
      console.error(
        "Error during service worker registration or push subscription:",
        error
      );
    }
  } else {
    console.warn("Push messaging is not supported");
  }
};

// Utility function to convert VAPID key
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};
