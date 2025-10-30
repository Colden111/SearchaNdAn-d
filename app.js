// users data
const insanlar = [
  { id: 0, ad: "Əli", yaş: 25 },
  { id: 1, ad: "Zəhra", yaş: 30 },
  { id: 2, ad: "Rəhim", yaş: 22 },
  { id: 3, ad: "Leyla", yaş: 28 },
  { id: 4, ad: "İsmayıl", yaş: 35 },
  { id: 5, ad: "Məryəm", yaş: 26 },
  { id: 6, ad: "Fərid", yaş: 32 },
  { id: 7, ad: "Şəms", yaş: 27 },
  { id: 8, ad: "Cavid", yaş: 24 },
  { id: 9, ad: "Aysel", yaş: 29 },
  { id: 10, ad: "Tural", yaş: 31 },
  { id: 11, ad: "Gülşən", yaş: 33 },
  { id: 12, ad: "Rauf", yaş: 23 },
  { id: 13, ad: "Kamil", yaş: 27 },
  { id: 14, ad: "Səbinə", yaş: 34 },
];

// html elements
const searchInp = document.getElementById("searchInp");
const addUserForm = document.getElementById("addUserForm");

// functions
const showUsers = (arr) => {
  const tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((user) => {
      tableBody.innerHTML += `<tr>
                <td>${user.id}</td>
                <td>${user.ad}</td>
                <td>${user.yaş}</td>
                <td>
                    <button id="editBtn" onclick="editUser('${user.id}')">edit</button>
                    <button id="deleteBtn" onclick="deleteUser('${user.id}')">delete</button>
                </td>
            </tr>`;
    });
  } else {
    tableBody.innerHTML = "<p class='noData'>data yoxdur</p>";
  }
};
const toast = (mesaj, type) => {
  let background = "";
  let color = "white";

  if (type === "success") {
    background = "green";
  }
  if (type === "error") {
    background = "red";
  }
  if (type === "warning") {
    background = "yellow";
    color = "black";
  }

  Toastify({
    text: mesaj,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      color,
      background,
      fontSize: "12px",
    },
  }).showToast();
};
const deleteUser = (id) => {
  const isAgree = confirm("eminsen?");
  if (isAgree) {
    const deletedUserIndex = insanlar.findIndex((user) => user.id == id);
    insanlar.splice(deletedUserIndex, 1);
    showUsers(insanlar);
    toast("Istifadeci ugurla silindi", "success");
  }
};
const editUser = (id) => {
  const user = insanlar.find((u) => u.id == id);
  const userIndex = insanlar.findIndex((u) => u.id == id);
  const newName = prompt("yeni adi yazin", user.ad);
  const newAge = prompt("yeni adi yazin", user.yaş);

  const newUser = {
    id,
    ad: newName,
    yaş: newAge,
  };

  insanlar.splice(userIndex, 1, newUser);
  showUsers(insanlar);
  toast("istifadeci ugurla yenilendi", "success");
};
const handleSubmit = (e) => {
  e.preventDefault();
  const nameInp = document.getElementsByName("nameInp")[0];
  const ageInp = document.getElementsByName("ageInp")[0];

  if (nameInp.value.trim() && ageInp.value) {
    const newUser = {
      id: new Date().getTime(),
      ad: nameInp.value[0].toUpperCase() + nameInp.value.slice(1).toLowerCase(),
      yaş: ageInp.value,
    };
    insanlar.unshift(newUser);
    addUserForm.reset();
    nameInp.focus();

    showUsers(insanlar);
  } else {
    toast("butun xanalari doldurun", "error");
  }
};
const handleSearch = (e) => {
  const word = e.target.value;
  const filteredUsers = insanlar.filter((u) => {
    if (
      u.ad.toLowerCase().includes(word.toLowerCase()) ||
      u.yaş.toString().includes(word)
    ) {
      return u;
    }
  });
  showUsers(filteredUsers);
};

// results
showUsers(insanlar);
searchInp.addEventListener("input", handleSearch);
addUserForm.addEventListener("submit", handleSubmit);
