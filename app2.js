const items = document.querySelectorAll(".item");
const placeHolders = document.querySelectorAll(".placeholder");

for (const placeHolder of placeHolders) {
  placeHolder.addEventListener("dragover", dragOver);
  placeHolder.addEventListener("dragenter", dragEnter);
  placeHolder.addEventListener("dragleave", dragLeave);
  placeHolder.addEventListener("drop", dragDrop);
}

for (const item of items) {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
}

function dragStart(event) {
  event.target.classList.add("hold");
  event.target.id = "id" + Date.now();
  event.dataTransfer.setData("text", event.target.id);
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
}

function dragEnd(event) {
  event.target.classList.remove("hold", "hide");
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  if (event.target.classList.contains("placeholder")) {
    event.target.classList.add("hovered");
  } else if (event.target.classList.contains("item")) {
    event.target.parentElement.classList.add("hovered");
  }
}

function dragLeave(event) {
  if (event.target.classList.contains("placeholder")) {
    event.target.classList.remove("hovered");
  } else if (event.target.classList.contains("item")) {
    event.target.parentElement.classList.remove("hovered");
  }
}

function dragDrop(event) {
  let el = event.target;
  let item = document.querySelector("#" + event.dataTransfer.getData("text"));
  if (el.classList.contains("placeholder")) {
    el.appendChild(item);
    item.classList.remove("hide");
    el.classList.remove("hovered");
  } else if (el.classList.contains("item")) {
    el.parentElement.appendChild(item);
    item.classList.remove("hide");
    el.parentElement.classList.remove("hovered");
  }
}
