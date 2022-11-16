navigator.serviceWorker.register("/sw.js");

// Page Visibility API
let backgroundInitialTimestamp;
window.addEventListener("visibilitychange", (event) => {
	if (document.visibilityState === "hidden") {
		// we are in background
		const now = new Date().toLocaleTimeString();
		log(`going to the background at ${now}`);
		backgroundInitialTimestamp = performance.now();
	} else {
		// we are from background
		const timeElapsed = parseInt(
			performance.now() - backgroundInitialTimestamp
		);
		log(`we are back from the background after ${timeElapsed / 1000}s`);
	}
});

// Beacon
document.getElementById("btnBeacon").addEventListener("click", (event) => {
	const data = {
		message: "hello from front end",
	};
	const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
	navigator.sendBeacon("/log", blob);
});

// Background Sync
document.getElementById("btnSync").addEventListener("click", async (event) => {
	const swReg = await navigator.serviceWorker.ready;
	swReg.sync.register("like");
});

// Background Periodic Sync
document
	.getElementById("btnPeriodicSync")
	.addEventListener("click", async (event) => {
		const swReg = await navigator.serviceWorker.ready;
		const permissionStatus = await navigator.permissions.query({
			name: "periodic-background-sync",
		});
		if (permissionStatus.state === "granted") {
			swReg.periodicSync.register("dailynew", {
				minInterval: 12 * 60 * 60 * 1000,
			});
		}
	});

// Background Fetch
document.getElementById("btnFetch").addEventListener("click", async (event) => {
	const swReg = await navigator.serviceWorker.ready;
	const fetch = await swReg.backgroundFetch.fetch(
		"media-files",
		["/media/audio.mp3", "/media/video.mp4"],
		{
			title: "Fem media files",
			icons: [
				{
					src: "/media/thumb.png",
					type: "image/png",
					sizes: "800x800",
				},
			],
		}
	);
});
