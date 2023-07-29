////////////////////////////////////////////////////Formulaire de connexion


//////////(1)-Ajout d'un event à la soumission du formulaire

const form = document.getElementById("login-form");
form.addEventListener("submit", function (event) {  //à la soumission de form
    event.preventDefault();                 //Supprime les fonctions par défaut
    const userEmail = document.getElementById("email").value; //userEmail = .email
    const userPassword = document.getElementById("password").value; //userPassword = .password
    const body = { 
        "email": userEmail,
        "password": userPassword
    };
    sendApi(body); //On appelle sendApi(requête post) sur body (email et password)
});


//////////(2)- Requête de POST à l'API
async function sendApi(obj) { 
    const response = await fetch("http://localhost:5678/api/users/login", { 
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });


///////////(3)- Réponse à la requête POST

//Si c'est ok, recupération du token, stockage du token, et redirection vers html en changeant l'adresse pour le mode edit
    if (response.ok) { //si response = .ok = vérifie si la requête à échouer en vérifiant le statut http
        const data = await response.json(); 
        const token = data.token;   // token = la ligne token du tableau data
        const userId = data.userId; // Récupérer l'ID de l'utilisateur depuis la réponse JSON

        localStorage.setItem("token", token); //stock du token, au nom de token dans le local storage, pour rester connecté
        localStorage.setItem("userId", userId);
        localStorage.setItem("isLoggedIn", true); // stocker true pour isLoggedIn dans le local storage pour le token (l'utilisateur est connecté)
        window.location.href = "index.html?editMode=true"; //rediriger vers index.html ?(avec editMode en true) (voir suite du code dans script.js)

//Si j'ai une erreur 404, la doc dit que c'est une erreur d'authentification, donc utilisateur non existant
    } else {
        const userNotFound = { //utilisateur non trouvé c'est
            errorCode: "404", //code erreur 404 relatif à la doc de l'API
            isRequestError: true //et que la requête est en erreur = true
        };

        if (!response.ok && userNotFound) { //si la requête et bonne mais que j'ai l'erreur 404
            alert("Erreur dans l’identifiant ou le mot de passe"); //J'ai un message d'alerte utilisateur introuvable
        }
    }

    return response; //je retourne la réponse de ma requête
}

  