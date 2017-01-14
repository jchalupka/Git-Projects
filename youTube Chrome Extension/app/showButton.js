

	// if (document.getElementById("share-services-container") == null) {
	// 	console.log(document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip")[0])
	// 	console.log("Clicking");
	// 	document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip")[0].click();
	// }




var shareButton = document.getElementsByClassName("yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip")[0];

shareButton.addEventListener("click", function() {
	button = document.getElementsByClassName("share-group ytg-box")[0].lastElementChild.firstElementChild
	console.log(button);
});

