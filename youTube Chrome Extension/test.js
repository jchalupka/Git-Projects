//var url = window.location.href;
qrString = document.URL;

var qrImage = "https://api.qrserver.com/v1/create-qr-code/?data="+ qrString +"&size=250x250";


var modal = document.getElementById("cover");

var modalImg = document.getElementById("qrCodeId");
modalImg.src = qrImage;

function presentQR () {
	modal.style.display="block";
}

var coverScreen = document.getElementById("cover");
coverScreen.onclick = function() {
	modal.style.display="none";
};

function endDisplay() {
}


