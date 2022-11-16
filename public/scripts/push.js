if ("showNotification" in ServiceWorkerRegistration.prototype) {
	document.querySelector("#push").style.display = "block";
}
document
	.getElementById("btnPushSubscribe")
	.addEventListener("click", async (event) => {
		if ("showNotification" in ServiceWorkerRegistration.prototype) {
			const state = await Notification.requestPermission(); // if abusing this requestPermission, chrome will auto block new reuestPermission from this app
			if (state === "granted") {
				// we can request push subscription
				const swReg = await navigator.serviceWorker.ready;
				const details = await swReg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey:
						"BK-FpMEya0VsTNQBSiRMgYQhvkVv5W5Dpu0XS1ECYM8SmHi2EamVzHXGCa96Ykgj7Ca-uJBbuuFqIAU-z9fDiYk", // npx web-push generate-vapid-keys // here public key
				});
				console.log(details);
				log("web push subscribed");
				fetch("/push/subscribe", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						endpoint: details.endpoint,
						keys: {
							auth: arrayBufferToBase64(details.getKey("auth")),
							p256dh: arrayBufferToBase64(details.getKey("p256dh")),
						},
					}),
				});
			}
		} else {
			log("Web push not available");
		}
	});

/*** DATA CONVERSION UTILITIES ***/

function arrayBufferToBase64(buffer) {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

// Snippet from https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
