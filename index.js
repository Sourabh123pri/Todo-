updetnotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function (e) {
  let notetext = document.getElementById("notetext");
  let titel_vel = document.getElementById("titel_vel");
  let notes = localStorage.getItem("notes");
  if (notetext.value == "") {
    alert("Add some thing");
  } else {
    if (notes == null) {
      nodesObj = [];
    } else {
      nodesObj = JSON.parse(notes);
    }
    let myobj = {
      titel: titel_vel.value,
      text: notetext.value,
    };

    nodesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(nodesObj));
    notetext.value = "";
    titel_vel.value = "";
    updetnotes();
  }
});

function updetnotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    nodesObj = [];
  } else {
    nodesObj = JSON.parse(notes);
  }
  let html = "";
  nodesObj.forEach(function (element, index) {
    html += `
              <div class="card">
              <h3>${element.titel}</h3>
              <p>${element.text}</p>
              <div class="btn"><button onclick=del(this.id) id=${index} >Delete Task</button></div>
              </div>`;
  });

  let noteEle = document.getElementsByClassName("note_contner")[0];
  if (nodesObj.length != 0) {
    noteEle.innerHTML = html;
  } else {
    noteEle.innerHTML = `<b>There is Not Any Notes Hear !So Use This App And Add Your Notes/Task ....</b>  `;
  }
}

let clsbtn = document.getElementById("clsbtn");
clsbtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

function del(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    nodesObj = [];
  } else {
    nodesObj = JSON.parse(notes);
  }
  if (confirm("You want to delete this  ?")) {
    nodesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(nodesObj));
    updetnotes();
  }
}

let search = document.getElementById("search");

search.addEventListener("input", () => {
  inputval = search.value.toLowerCase();
  let card = document.getElementsByClassName("card");
  Array.from(card).forEach((element, index) => {
    let cardtext = document.getElementsByTagName("h3")[index + 2].innerText;
    if (cardtext.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
