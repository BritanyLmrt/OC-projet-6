const form = document.getElementById("login-form"); //form =.login-form
form.addEventListener("submit", function (event) { //Lorsque je soumet le formulaire, 
    event.preventDefault();                 //Supprime les fonctions par défaut
    const userEmail = document.getElementById("email").value; //userEmail = .email
    const userPassword = document.getElementById("password").value; //userPassword = .password
    const body = { 
        "email": userEmail,
        "password": userPassword
    };
    sendApi(body); //On appelle sendApi(requête post) sur body (email et password)
});

async function sendApi(obj) { // DMD Requête post 
    const response = await fetch("http://localhost:5678/api/users/login", { 
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    });

    if (response.ok) { // Si la requête est post est ok,
        const data = await response.json(); //stocker la rép de la requête dans data
        const token = data.token;   // token = la ligne token du tableau data
        console.log(token); //voir token dans la console (seulement dans étape de travail, invisible lors de la redirection )

        localStorage.setItem("token", token); //stock du token, au nom de token dans le local storage, pour rester connecté
        localStorage.setItem("isLoggedIn", true); // stocker true pour isLoggedIn dans le local storage pour le token (l'utilisateur est connecté)
        window.location.href = "index.html?editMode=true"; //rediriger vers index.html ?(avec editMode en true) (voir suite du code dans script.js)



    } else { //sinon 
        const userNotFound = { //utilisateur non trouvé c'est
            errorCode: "404", //code erreur 404 relatif à la doc de l'API
            isRequestError: true //et que la requête est en erreur = true
        };

        if (!response.ok && userNotFound) { //si la requête et bonne mais que j'ai l'erreur 404
            alert("Utilisateur introuvable"); //J'ai un message d'alerte utilisateur introuvable
        }
    }

    return response; //je retourne la réponse de ma requête
}

  