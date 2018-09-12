document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var options = {};
    var instances = M.Dropdown.init(elems, options);
    var instance = M.Dropdown.getInstance(elems);
    instance.open();
});

let getAllUrlParams = () => {

  let queryString = window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    let arr = queryString.split('&');

    for (let i=0; i<arr.length; i++) {
      let a = arr[i].split('=');
      let paramNum = undefined;
      let paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      let paramValue = typeof(a[1])==='undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

let modal = document.getElementById('myModal');

function response(){
	let parse_url = getAllUrlParams();

	if (parse_url.e)
		modal.style.display = 'block';
	return decodeURIComponent(parse_url.e).charAt(0).toUpperCase() + decodeURIComponent(parse_url.e).slice(1);
};
/*
document.getElementById('dialog').innerHTML = response();

let span = document.getElementsByClassName('close')[0];

span.onclick = ()=>{
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
