let siteName = document.getElementById("siteNameInput");
let siteURL = document.getElementById("siteURLInput");
let addBtn = document.getElementById("addBtn");
let bookmarkTable = document.getElementById("bookmarkTable");
let search = document.getElementById("search");
let sitesList;

if (localStorage.getItem("_db") == null) {
  sitesList = [];
} else {
  sitesList = JSON.parse(localStorage.getItem("_db"));
  Bookmarker(sitesList);
}

addBtn.onclick = function () {
  if (addBtn.innerHTML == "update") {
    let site = {
      name: siteName.value,
      url: siteURL.value,
    };
    sitesList.splice(editIndex, 1, site);
    addBtn.innerHTML = "Add";
  } else {
    let site = {
      name: siteName.value,
      url: siteURL.value,
    };
    sitesList.push(site);
  }
  localStorage.setItem("_db", JSON.stringify(sitesList));
  Bookmarker(sitesList);
  clr();
};

const nameRegex = /^\S+[A-Za-z_]{1,}$/;
const urlRegex = /^\S+[A-Za-z0-9_\.]{1,}\.[a-z]{1,}?$/;

function isValidName() {
  if (nameRegex.test(siteName.value)) {
    return true;
  } else {
    return false;
  }
}
function isValidURL() {
  if (urlRegex.test(siteURL.value)) {
    return true;
  } else {
    return false;
  }
}

siteName.onkeyup = function () {
  if (isValidName() && isValidURL()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
};
siteURL.onkeyup = function () {
  if (isValidName() && isValidURL()) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
};

function Bookmarker(arr) {
  let bookmark = "";
  for (let i = 0; i < arr.length; i++) {
    bookmark += `
        <tr id="row">
            <th scope="row">${i + 1}</th>
            <td>${arr[i].name}</td>
            <td>
            <a href="https://www.${arr[i].url}" class="btn btn-outline-success rounded-circle" title="visit"><i class="fa-solid fa-globe"></i></a>
            </td>
            <td>
              <button
                class="btn btn-outline-warning rounded-circle"
                title="edit"
                onclick="edit(${i})"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
            <td>
              <button
                class="btn btn-outline-danger rounded-circle"
                title="delete"
                onclick="del(${i})"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>`;
  }
  bookmarkTable.innerHTML = bookmark;
}

function del(index) {
  sitesList.splice(index, 1);
  localStorage.setItem("_db", JSON.stringify(sitesList));
  Bookmarker(sitesList);
}

function edit(index) {
  siteName.value = sitesList[index].name;
  siteURL.value = sitesList[index].url;
  addBtn.innerHTML = "update";
  editIndex = index;
}

function searching(item) {
  let savedList = [];
  for (let i = 0; i < sitesList.length; i++) {
    if (sitesList[i].name.toLowerCase().includes(item)) {
      savedList.push(sitesList[i]);
      console.log(savedList);
    }
  }
  Bookmarker(savedList);
}

function clr() {
  siteName.value = "";
  siteURL.value = "";
}
