/////////////////////////////////////////////////   Recette d'affichage dynamique des projets   //////////////////////////////////////////////////////////
// Deux recettes: Données de l'API, Affichage projets.


//////////////////////////////////////////////////// Recette 1 : Récupération des projets sur l'API (Données de l'API)


///////////////////Etape 1 : Requête de récupération des données : 

async function getDataWorks() {
  const response = await fetch("http://localhost:5678/api/works"); //requête de récupération des données works sur l'API et stockage dans response
  if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http
    console.log("Erreur lors de la requête à l'API"); //affichage dans la console si récup raté
  }

  ///////////////// Etape 2 : Récupération de la réponse de la requête (Requête étape 1) : (Récupération ingrédients)

  const responseRequest = await response.json(); //Récupération de la réponse à la requête (response.json)
  console.log(responseRequest); // Afficher dans les données récupérées
  projectsArray = responseRequest; // Renommer les données en une variable projectArray;
  return projectsArray; //Retourne les éléments de réponses à cette fonction
}
let projectsArray; //"Transforme" projectArray en variables de portée globale (Pour utiliser les données dans toutes les recettes)



//////////////////////////////////////////////////// Recette 2 : Affichage dynamique des projets sur la pages


///////////////////Etape 1 :  Récupération des ingrédients () 

async function displayProjects() { //création de la fonction displayProjects (affichageProjets) 

  const mesProjetsBox = document.querySelector(".gallery"); //Récup de l'éléments parent html (div class="gallery")

  projectsArray.forEach(project => { //Boucle forEach demandant d'appliquer ce code à chaque éléments du tableau

    // Récup de <div class="gallery"> comme élément parent, et ajout du code html ci-desous en récupérant ${API.éléments}
    mesProjetsBox.innerHTML += `      
          <figure>
            <img src="${project.imageUrl}" alt="${project.title}"> 
            <figcaption>${project.title}</figcaption>
          </figure>
        `;
  });
}
//////////////// Etape 3 : Appel de la fonction de récupération des données. (Sortir les ingrédients)
getDataWorks()
  .then(() => displayProjects()) // Attendre la réponse de getDataWorks pour lancer displayProjects 

//////////////////////////////////////////////    Barre de filtre    ///////////////////////////////////////////////////////////////////////////



async function getDataCategories() {
  const response = await fetch("http://localhost:5678/api/categories"); //requête de récupération des données catégories sur l'API et stockage dans response
  if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http
    console.log("Erreur lors de la requête à l'API"); //affichage dans la console si récup raté
  }

  ///////////////// Etape 2 : Récupération de la réponse de la requête (Requête étape 1) : (Récupération ingrédients)

  const responseRequest = await response.json(); //Récupération de la réponse à la requête (response.json)
  console.log(responseRequest); // Afficher dans les données récupérées
  categoriesArray = responseRequest; // Renommer les données en une variable projectArray;
  return categoriesArray; //Retourne les éléments de réponses à cette fonction
}
let categoriesArray; //"Transforme" projectArray en variables de portée globale (Pour utiliser les données dans toutes les recettes)
console.log(categoriesArray);

getDataCategories()
  .then(() => displayCategories());

/////////////// Etape 3 : Affichage dynamique de mes catégories : ( Sortir la recette fini )
async function displayCategories() { //Création d'une fonction Affichage des catégories
  const mesFiltresBox = document.querySelector(".filterbar ul"); // Sélection de l'élément (html/css) et stockage dans mesFiltresBox 

  categoriesArray.forEach(categorie => { // Création d'une boucle, concernant chaque catégorie du tableau catégorie
    const filter = document.createElement("li"); // Création d'un élément li en html à chaque itération de boucle et stockage dans (filter)
    filter.innerHTML = categorie.name; //à chaque itération de la boucle, récupérer le nom de la catégorie est remplir li avec
    mesFiltresBox.appendChild(filter); // filter (li) enfant de mesFiltresBox(ul)
    filter.addEventListener("click", function () { //Ajout d'un écouteurs d'events au clic de filter(li) 
//rappel d'events:

      const filteredProjects = projectsArray.filter(project => project.categoryId === categorie.id); 
      console.log(filteredProjects);                                                                
//Création d'un nouveau tableau, ou sur chaque projets si l'id du tableau projects = l'id du tableau catégories, il rentre dans la nouveau tableau filteredProjects
//Affichage du nouveau tableau cliqué

      const mesProjetsBox = document.querySelector(".gallery"); //Récup de .gallery(css/html)
      mesProjetsBox.innerHTML = ''; //Vide la <div class="gallery">

      filteredProjects.forEach(project => { //Création d'une boucle sur mes tableaux filteredProjects
        mesProjetsBox.innerHTML += `      
        <figure>
          <img src="${project.imageUrl}" alt="${project.title}"> 
          <figcaption>${project.title}</figcaption>
        </figure>
        `
//Ajout ces lignes Html pour chaque éléments de mon tableau, en incluant les données projects récup dans l'API

      })
    });
  })
}

filterAll = document.querySelector(".filter-all"); //Récup de l'objet (filter-all)
filterAll.addEventListener("click", function () { //ajout d'un ecouteur d'event
  const mesProjetsBox = document.querySelector(".gallery"); //
  mesProjetsBox.innerHTML = ''; // Vide la boîte des projets
  displayProjects(); //Appel displayProjects (pour affichage de tous les projets)
});