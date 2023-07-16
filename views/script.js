document.getElementById("employeeForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const country = document.getElementById("country").value;
    const position = document.getElementById("position").value;
    const wage = document.getElementById("wage").value;
  
    const data = {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    };
  
    //發送到server
    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      console.log(result);
      alert("Data submitted successfully!");
      document.getElementById("employeeForm").reset(); 
    })
    .catch(error => {
      console.error(error);
      alert("An error occurred while submitting the data.");
    });
  });


  