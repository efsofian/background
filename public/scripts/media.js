// Media playing
document.getElementById("btnPlay").addEventListener("click", (event) => {
	navigator.mediaSession.metadata = new MediaMetadata({
		title: "Too much funk",
		artist: "Steve Oaks",
		album: "Hits",
		artwork: [
			{
				src: "/media/thumb.png",
				type: "image/png",
				sizes: "800x800",
			},
		],
	});
	document.querySelector("audio").play();
});
document.getElementById("btnStop").addEventListener("click", (event) => {
	document.querySelector("audio").pause();
});

// PiP
document.getElementById("btnPiP").addEventListener("click", (event) => {
	if (document.pictureInPictureElement) {
		// if a tab already open
		document.exitPictureInPicture();
	} else {
		document.querySelector("video").requestPictureInPicture();
	}
});
