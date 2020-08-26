const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".contain");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add(position);
  messageElement.classList.add("message");
  messageContainer.append(messageElement);
};

const name = prompt("enter name to join");
socket.emit("new-user-joined", name);
socket.on("user-joined", (data) => {
  append(` joined ${name}`, "right");
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(`you : ${message}  ` ,"right");
    socket.emit("send", message);
    messageInp.value ="";
})


socket.on("receive", (data) => {
    append(` received ${data.message}`, "   "+`${data.user}`,"left");
  });

// socket.emit("send", "scac");
