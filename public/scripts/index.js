// Form elements

const colorForm = document.querySelector("#color-form");
const picker = document.querySelector("#color-picker");
const input = document.querySelector("#color-input");
const submit = document.querySelector("submit-button");

// WebSocket related stuff

webSocket = new WebSocket("ws://localhost:3000/");
webSocket.onmessage = (e) => {
  console.log(e.data);
};

// Utils

const changeButtonColors = (color) => {
  window.document.body.style.setProperty("--buttonColor", color);
};

const getCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
};

const handleSubmit = (e) => {
  e.preventDefault();
  let { newColor } = Object.fromEntries(new FormData(e.target).entries());
  let prevColor = getCookie("prevColor");
  if (prevColor) webSocket.send(prevColor);

  if (prevColor !== newColor) {
    document.cookie = `prevColor=${newColor}`;
    alert(`You've chosen ${newColor} as your new background color.`);
    try {
      webSocket.send(newColor);
    } catch (e) {
      console.error(e);
    }
  } else {
    alert(`The color ${newColor} is already your background color.`);
  }
};

// EventListeners

window.onload = () => {
  let prevColor = getCookie("prevColor");
  if (prevColor) {
    picker.value = prevColor;
    input.value = prevColor;
    if (prevColor) webSocket.send(prevColor);
  }
  colorForm.classList.remove("d-none");
  colorForm.classList.add("appearing");
};

picker.addEventListener("input", (e) => {
  let newVal = e.target.value;

  input.value = newVal;
  changeButtonColors(newVal);
});

colorForm.addEventListener("submit", handleSubmit);
