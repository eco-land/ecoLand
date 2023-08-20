document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnLogin").addEventListener("click", () => {
    const id = document.getElementById("userID").value;
    const pas = document.getElementById("userPassword").value;
    getUserID(id, pas);
  });

  document.getElementById("btnSignOut").addEventListener("click", () => {
    userId = null;
    arr = [];
    localStorage.clear()
    location.href = "./index.html";
    console.log(userId);
  });
});

// ---------------- start user api fetch-------------------
var userId;
var arr = [];
function getUserID(id, password) {
  fetch("https://64d485a8b592423e4694350c.mockapi.io/api/v1/nafathUsers/")
    .then((response) => response.json())
    .then((data) => {
      const user = data.find(
        (user) => user.id === id && user.password === password
      );
      if (user) {
        userId = user.id;
        getContracts(user.id); // Fetch the contracts data
        // Store the fetched data in the localStorage

        // Redirect after the fetch completes & our data is stored
        location.href = "./userAccount.html";
      } else {
        console.log(`Error in Passing the data`);
      }
    });
}

function getContracts(id) {
  fetch(
    `https://64d485a8b592423e4694350c.mockapi.io/api/v1/nafathUsers/${id}/contracts`
  )
    .then((response) => response.json())
    .then((data) => {
      arr = data; // Replace existing array with fetched data
      localStorage.setItem("contractsData", JSON.stringify(arr));
      console.log(arr);
    });
}
//   ---------------- end user api fetch-------------------
// Retrieve the stored data from the localStorage
document.getElementById("userData").addEventListener("click", () => {
  const storedData = localStorage.getItem("contractsData");
  if (storedData) {
    const retrievedData = JSON.parse(storedData);
    console.log(retrievedData); // Verify the retrieved data.
  } else {
    console.log("No stored data found!");
  }
});