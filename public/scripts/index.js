// Form elements
const colorForm = document.querySelector("#color-form");
const picker = document.querySelector("#color-picker");
const input = document.querySelector("#color-input");
const inputMethods = [picker, input];
const submit = document.querySelector("submit-button");

// WebSocket related stuff
webSocket = new WebSocket("ws://localhost:3000/");
webSocket.onmessage = (e) => {
  console.log(e.data);
};

const changeButtonColors = (color) => {
  window.document.body.style.setProperty("--buttonColor", color);
};

inputMethods.map((method) => {
  method.addEventListener("input", (e) => {
    input.value = e.target.value;
    changeButtonColors(e.target.value);
  });
});

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

const handleSubmit = (e) => {
  e.preventDefault();
  let { newColor } = Object.fromEntries(new FormData(e.target).entries());
  let prevColor = getCookie("prevColor");

  if (prevColor !== newColor) {
    document.cookie = `prevColor=${newColor}`;
    alert(`You've chosen ${newColor} as your new background color.`);
    webSocket.send(newColor);
  } else {
    alert(`The color ${newColor} is already your background color.`);
  }
};

colorForm.addEventListener("submit", handleSubmit);
