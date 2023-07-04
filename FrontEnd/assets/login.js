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
async function sendApi(obj){ //
    const response = await fetch("http://localhost:5678/api/users/login", {
        method : "post", // !post html action JS
        headers: {
            "Content-Type" : "application/json" //format 
        }, 
        body : JSON.stringify(obj) //objet à envoyer
    } );//
    if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http
      console.log("Erreur lors de la requête à l'API"); //affichage dans la console si récup raté
    }
    return response;
}