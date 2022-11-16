self.addEventListener("push", (event) => {
	console.log("we v received a push message");
	self.registration.showNotification("sof", {
		body: "hello world",
		icon: "/images/icon.png",
	});
});

self.addEventListener("sync", (event) => {
	switch (event.tag) {
		case "like":
			console.log("Sync Operation for like");
			break;
		default:
			console.log(`Unknown Sync Operation for ${event.tag}`);
	}
});

self.addEventListener("periodicsync", (event) => {
	switch (event.tag) {
		case "dailynews":
			console.log("Periodic sync for dailynews");
			break;
		default:
			console.log(`Unknown Periodic Sync Operation for ${event.tag}`);
	}
});

self.addEventListener("backgroundfetchsuccess", async (event) => {
	console.log("files received");
	const downloadedFiles = await event.registration.matchAll();
});
