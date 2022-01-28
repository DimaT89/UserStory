const lists = document.querySelectorAll(".list");
const addNewBoard = document.querySelector(".add__new-board");

function addTask() {
  const addBtn = document.querySelector(".add__btn");
  const addItemBtn = document.querySelector(".add__item-btn");
  const cancelItemBtn = document.querySelector(".cancel__item-btn");
  const textarea = document.querySelector(".textarea");
  const form = document.querySelector(".form");

  let value;

  addBtn.addEventListener("click", () => {
    form.style.display = "block";
    addBtn.style.display = "none";
    addItemBtn.style.display = "none";

    textarea.addEventListener("input", (e) => {
      value = e.target.value;

      if (value) {
        addItemBtn.style.display = "block";
      } else {
        addItemBtn.style.display = "none";
      }
    });
  });

  cancelItemBtn.addEventListener("click", () => {
    textarea.value = "";
    value = "";
    form.style.display = "none";
    addBtn.style.display = "block";
  });

  addItemBtn.addEventListener("click", () => {
    const newItem = document.createElement("div");
    newItem.classList.add("list__item");
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);

    textarea.value = "";
    value = "";
    form.style.display = "none";
    addBtn.style.display = "block";

    dragNdrop();
  });
}
addTask();

function addBoard() {
  const boards = document.querySelector(".boards");
  const board = document.createElement("div");
  board.classList.add("boards__item");
  board.innerHTML = `
    <span class="title" contenteditable="true">Введите название</span>
    <div class="list"></div>
    `;

  boards.append(board);

  changeTitle();
  dragNdrop();
  delBoard();
}
addNewBoard.addEventListener("click", addBoard);

function changeTitle() {
  const titles = document.querySelectorAll(".title");

  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
  });
}
changeTitle();

let draggedItem = null;

function dragNdrop() {
  const listItems = document.querySelectorAll(".list__item");
  const lists = document.querySelectorAll(".list");

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", () => {
      draggedItem = item;

      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", () => {
      item.style.display = "block";
      draggedItem = null;
    });

    item.addEventListener("dblclick", () => {
      item.remove();
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0,0,0,0.3)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0)";
      });

      list.addEventListener("drop", function (e) {
        this.style.backgroundColor = "rgba(0,0,0,0)";
        this.append(draggedItem);
      });
    }
  }
}
dragNdrop();

function delBoard() {
  const boards = document.querySelectorAll(".boards__item");

  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];

    board.addEventListener("dblclick", () => {
      board.remove();
    });
  }
}
