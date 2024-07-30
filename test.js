(function () {
  const myHeaders = new Headers();
  myHeaders.append("ngrok-skip-browser-warning", "true");

  const requestOptions = {
    method: "POST",
    headers: myHeaders
  };

  fetch("https://5024-190-232-219-214.ngrok-free.app/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

})();