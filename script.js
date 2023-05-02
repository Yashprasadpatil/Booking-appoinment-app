function submitDetails(event) {
  event.preventDefault();
  const fname = event.target.name.value;
  const email = event.target.emailid.value;
  const mobile = event.target.phno.value;

  const obj = {
    fname,
    email,
    mobile
  };

  axios
    .post("https://crudcrud.com/api/5f6f32d475324156adc6bfd27d1108cd/appoinmentData")
    .then((response) => {
      showUserOnScreen(response.data);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}


setTimeout(() => {
    submitDetails();
  }, 5000);


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/5f6f32d475324156adc6bfd27d1108cd/appoinmentData")
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        showUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});





setInterval(() => {
    const parentElem = document.getElementById("users");
    parentElem.innerHTML = "";
  
    axios
      .get("https://crudcrud.com/api/5f6f32d475324156adc6bfd27d1108cd/appoinmentData")
      .then((response) => {
        console.log(response);
  
        for (var i = 0; i < response.data.length; i++) {
          showUserOnScreen(response.data[i]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 10000);







function showUserOnScreen(obj) {
  const parentElem = document.getElementById("users");
  const childElem = document.createElement("li");
  childElem.textContent = obj.fname + ' - ' + obj.email+' - ' + obj.mobile;


  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";



  deleteButton.onclick = () => {
    axios
      .delete(`https://crudcrud.com/api/5f6f32d475324156adc6bfd27d1108cd/appoinmentData/${obj._id}`)
      .then(() => {
        parentElem.removeChild(childElem);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editButton = document.createElement("input");
  editButton.type = "button";

  editButton.value = "Edit";

  editButton.onclick = () => {
    localStorage.removeItem(obj.email);

    parentElem.removeChild(childElem);


    document.getElementById("name").value = obj.name;
    document.getElementById("emailid").value = obj.email;
    document.getElementById("phno").value = obj.mobile;
    document.getElementById("submitbutton").style.display = "none";
    const updateButton = document.getElementById("updatebutton");
    updateButton.style.display = "block";
    updateButton.onclick = () => {
      axios
        .put(`https://crudcrud.com/api/5f6f32d475324156adc6bfd27d1108cd/appoinmentData/${obj._id}`, {
          name: document.getElementById("name").value,
          email: document.getElementById("emailid").value,
          mobile: document.getElementById("mobile").value
        })
        .then((response) => {
          childElem.textContent = response.data.name + " - " + response.data.email + " - " + response.data.mobile;
          document.getElementById("submitbutton").style.display = "block";
          updateButton.style.display = "none";
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };




  childElem.appendChild(deleteButton);
  childElem.appendChild(editButton);

  parentElem.appendChild(childElem);
}
