document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const data = {
      email: email,
      password: password
    };
    console.log(data);
    //發送到server
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Invalid Login");
      }
    })
    .then(result => {
      if (result === "Login successful") {
        window.location.href = "index.html"; 
      } else {
        alert("Invalid credentials");
      }
    })
    .catch(error => {
      console.error(error);
      alert("Invalid Login");
    });
  });

  $(function(){
  
    $('#eye').click(function(){
         
          if($(this).hasClass('fa-eye-slash')){
             
            $(this).removeClass('fa-eye-slash');
            
            $(this).addClass('fa-eye');
            
            $('#password').attr('type','text');
              
          }else{
           
            $(this).removeClass('fa-eye');
            
            $(this).addClass('fa-eye-slash');  
            
            $('#password').attr('type','password');
          }
      });
  });