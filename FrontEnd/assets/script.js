
/////////////////////////////////////////////////////////////////////////Affichage dynamique des projets


////////// (1)-Requête de récupération des données projets à l'API
async function getDataWorks() {
  const response = await fetch("http://localhost:5678/api/works"); //requête de récupération des données works sur l'API et stockage dans response
  if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http
    console.log("Erreur lors de la requête à l'API"); //affichage dans la console si récup raté
  }


//////////(2)-Réponse de la requête à l'API
  const responseRequest = await response.json(); //Récupération de la réponse à la requête (response.json)
  console.log(responseRequest); // Afficher dans les données récupérées
  projectsArray = responseRequest; // Renommer les données en une variable projectArray; (tableau projets)
  return projectsArray; //Retourne les éléments de réponses à cette fonction
}
let projectsArray; //"Transforme" projectArray en variables de portée globale (Pour utiliser les données dans tous le code)


//////////(3)-Fonction d'affichage dynamique des projets

function displayProjects() { 

  const mesProjetsBox = document.querySelector(".gallery");

  projectsArray.forEach(project => { //Boucle forEach s'appliquant sur chaque projet du tableaux projets

    //création d'élément html, pour chaque projet, en récupérant dans le tableau, chaque donnée nécessaires à l'affichage dynamique ${leprojet.l'élément}
    mesProjetsBox.innerHTML += `      
          <figure>
            <img src="${project.imageUrl}" alt="${project.title}"> 
            <figcaption>${project.title}</figcaption>
          </figure>
        `;
  });
}


//////////(4)-Appel de la fonction getDataWork, suivi de l'appel de la fonction displayProject
getDataWorks()
  .then(() => displayProjects()) // Attendre la réponse de getDataWorks pour lancer displayProject  

//Récupération des données, avant affichage
//Affichage dynamique des projets : OK.


/////////////////////////////////////////////////////////////////////////Affichage dynamique des catégories


///////////(1)-Requête de récupération des données de catégorie

async function getDataCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http (si erreur de réponse)
    console.log("Erreur lors de la requête à l'API"); 
  }


//////////(2)-Réponse de la requête de récup des données de catégories

  const responseRequest = await response.json(); //await fait le pont entre la requête et la réponse .json(format)
  console.log(responseRequest);
  categoriesArray = responseRequest;
  return categoriesArray; //Retourne les éléments de réponses
}
let categoriesArray; //"Transforme" projectArray en variables de portée globale (Pour utiliser les données dans tout le code)
console.log(categoriesArray);


//////////(3)-Appel de la fonction getDataCategories, suivi de l'appel de displayCategories
getDataCategories()
  .then(() => displayCategories()); 

//Quand les données sont récupérées,(getDataCategories), on affiche les données de catégories dans la console(displayCategories)


//////////(4)-Boucle forEach (parcours du tableau, pour chaque catégorie du tableau catégories)
function displayCategories() { 
  const mesFiltresBox = document.querySelector(".filterbar ul"); 

  categoriesArray.forEach(categorie => {
    const filter = document.createElement("li"); //créer <li> (HTML)
    filter.innerHTML = categorie.name; //remplir <li> du nom de la catégorie
    mesFiltresBox.appendChild(filter); // filter (li) enfant de mesFiltresBox(ul)


//////////(5)-EventListener au clic de <li>  
    filter.addEventListener("click", function () {
      const filteredProjects = projectsArray.filter(project => project.categoryId === categorie.id);
      console.log(filteredProjects);
//Création d'un nouveau tableau si : projet >>>> id du tableau projects = id du tableau catégories >>>> nouveau tableau filteredProjects


//////////(6)- Affichage des projets par catégorie

      const mesProjetsBox = document.querySelector(".gallery");
      mesProjetsBox.innerHTML = ''; //vide .gallery
      filteredProjects.forEach(project => { //Dans tableau projets filtrés, pour chaque projets 
        mesProjetsBox.innerHTML += `      
        <figure>
          <img src="${project.imageUrl}" alt="${project.title}"> 
          <figcaption>${project.title}</figcaption>
        </figure>
        `
      })

    });
  })
}


//////////(7)- Création d'un Event pour le clic du bouton TOUS, comme l'appel de tous les projets ne demande pas de tri
const filterAll = document.querySelector(".filter-all");

filterAll.addEventListener("click", function () {
  const mesProjetsBox = document.querySelector(".gallery"); 
  mesProjetsBox.innerHTML = '';//vide la gallery
  displayProjects(); //Rappel de displayProjects (pour affichage de tous les projets)
});

//Résultat: Barre de filtre créée, et filtrage fonctionnel



/////////////////////////////////////////////////////////////////////////Activation du mode édit, aprés redirection depuis login.js


//////////(1)-Ajout d'un event, quand dom chargé (aprés redirection)


  const params = new URLSearchParams(window.location.search); //récup des parametre dans l'url aprés le ? 
  const editMode = params.get("editMode"); //stock des paramétres de l'editmode(url)

  // Vérifie si le mode édition est activé (et application des paramétres)
  if (editMode === "true") { //si editMode est en true, 
    const editModeWrapper = document.querySelector(".edit-mode"); 
    const buttonModif = document.querySelector(".editing-btn");
    const btnEditPicture = document.querySelector(".btn-modifier");
    
    editModeWrapper.style.display = "flex"; //passe .editing-btn de none à flex
    buttonModif.style.display = "flex"; //passe .editing-btn de none à flex 
    btnEditPicture.style.display = "flex";
    console.log("Mode édition activé"); //Mode édition activé affiché dans la console

  } else { //sinon
    // Mode édition désactivé
    console.log("Mode édition désactivé"); //affiche mode édition désactivé dans la console
  }
