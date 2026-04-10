importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyASpt0_nfVQpkdOP1fjof0h7RgoX_QK3ts",
  authDomain: "alhuda-staff.firebaseapp.com",
  projectId: "alhuda-staff",
  storageBucket: "alhuda-staff.firebasestorage.app",
  messagingSenderId: "26066694621",
  appId: "1:26066694621:web:ea974304cf73fdeae1c634"
});

const messaging = firebase.messaging();

// Handle background push notifications (when app is closed or in background)
messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'Alhuda Staff';
  const body  = payload.notification?.body  || '';
  self.registration.showNotification(title, {
    body,
    icon:  '/icon-192.png',
    badge: '/icon-192.png',
    data:  payload.data || {}
  });
});

// Open app when notification is clicked
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('https://staff.alhudaadvance.com');
    })
  );
});
