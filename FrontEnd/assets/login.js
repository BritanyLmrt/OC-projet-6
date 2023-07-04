/////////////////////////////////////////////////   Login   /////////////////////////////////////////////////////////////
//voir API (POST)
//Demander plus de détails sur la requête POST  à grégoire 
//fetch post dmd de requête
//recup id #login-form event au click de submit (envoie du form event submit)
//if else (si email=email et password=password response = ok, sinon error ) reponse (action)

const form = document.getElementById("login-form");
form.addEventListener("submit", function (event) {
    event.preventDefault() // PAS D' ACTION PAR DEF (FAIT CE QUE JE TE DIS) reset d'event 
    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;
    const body = {
        "email": userEmail,
        "password":userPassword
    };
    const reponse = sendApi(body); //function(body variable)
})
//Requête type POST 
async function sendApi(obj) {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
  
    const userNotFound = {
      errorCode: "404",
      message: "User not found",
      isRequestError: true
    };
  
    if (!response.ok && userNotFound.isRequestError) {
      alert("Utilisateur inexistant");
    }
  
    return response;
  }
  