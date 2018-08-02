function post_email(){
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			console.log(xhttp.responseText);
			if(xhttp.responseText == "ok")
				alert('Subscribed');
			else
				alert(xhttp.responseText ? xhttp.responseText : 'something went wrong, check your mail and please try again later');
		}}
	xhttp.open("POST", "/signup", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("email="+document.getElementById("email").value)
};
