///////////////////////////////////////////////////////////////////Mode Edit

// Fonction de récupération des projets pour la modale
async function getDataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    console.log("Erreur lors de la requête à l'API");
  }

  const projectsArray = await response.json();
  console.log(projectsArray);
  return projectsArray;
}

// Initialisation de la modale via le bouton "modifier" de l'index.html en mode=True, passage de la modale de "none" à "flex"
function modalEdition() {
  const modale = document.querySelector(".modal");
  const buttonModifier = document.querySelector(".editing-btn");
  const closeButton = document.querySelector(".close");
  const modalInit = document.querySelector(".modif-project");
  const formAddPictures = document.querySelector(".formulaire");
  const returnBtn = document.querySelector(".fa-arrow-left");
  const overlay = document.querySelector(".overlay");

  // Au clic sur "modifier", la modale passe de "none" à "flex" et les fonctions de la modale sont appelées dans l'ordre souhaité
  buttonModifier.addEventListener("click", function () {
    modale.style.display = "flex";
    modalInit.style.display = "flex";
    formAddPictures.style.display = "none";
    returnBtn.style.display = "none";
    overlay.style.display = "flex";

    getDataWorks().then((projectsArray) => {
      // Quand les projets sont chargés,
      displayImageProjects(projectsArray); // J'appelle l'affichage des images des projets récupérés dans le tableau projects
      deleteEvent(); // Et enfin, seulement lorsque les icônes poubelle sont générées, j'appelle la fonction de suppression
    });
  });

  // Quand on appuie sur "close", la modale passe de "flex" à "none" (elle se ferme)
  closeButton.addEventListener("click", function () {
    modale.style.display = "none";
    overlay.style.display = "none";
  });

  // Fonction de suppression des projets, appelée plus tôt
  function deleteEvent() {
    const deleteButtons = document.querySelectorAll(".icn-box");

    deleteButtons.forEach((deleteButton) => {
      // Sur chaque bouton "supprimer",
      deleteButton.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(deleteButton.dataset);
        const projectId = deleteButton.dataset.projectid; // Récupérer l'ID du projet à partir de l'attribut data

        deleteProject(projectId, deleteButton); // Appeler la fonction deleteProject en passant l'ID du projet et la référence du bouton
      });
    });
  }

  // Requête de suppression à l'API
  function deleteProject(id, deleteButton) {
    const token = localStorage.getItem("token"); // Récupérer le token d'authentification du local storage

    // Requête DELETE
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      // Réponse à la requête DELETE
      .then((response) => {
        if (!response.ok) {
          // Si la requête n'a pas abouti (statut HTTP différent de 2**)
          console.log("Erreur lors de la suppression du projet");
        } else {
          // Sinon, si la requête a abouti avec succès
          console.log("Projet supprimé avec succès");
          const figureElement = deleteButton.closest("figure"); // Trouver l'élément parent de deleteButton
          if (figureElement) {
            // Si l'élément parent existe
            figureElement.remove(); // Supprimer complètement l'élément du DOM
          }
        }
      });
  }
}

// Affichage des images des projets dans la modale & icônes poubelle et déplacer
function displayImageProjects(projectsArray) {
  const myModalImages = document.querySelector(".images");
  myModalImages.innerHTML = "";

  projectsArray.forEach((project) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <div class="icn-box" data-projectid="${project.id}"><i class="fa-solid fa-trash-can"></i></div>
      <div class="icn-move" style="visibility: hidden;"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
      <img class="project-img" src="${project.imageUrl}" alt="${project.title}">
      <p>Éditer</p>
    `;

    const icnMove = figure.querySelector(".icn-move");

    figure.addEventListener("mouseenter", function () {
      // Au survol de l'image du projet, affiche l'icône de déplacement correspondante
      icnMove.style.visibility = "visible";
    });

    figure.addEventListener("mouseleave", function () {
      // Lorsque la souris quitte l'image du projet, masque l'icône de déplacement correspondante
      icnMove.style.visibility = "hidden";
    });

    myModalImages.appendChild(figure);
  });
}

// Intégration dynamique de la section "ajouter une image" sur la modale, via le bouton "ajouter une image"
function addPictureMode() {
  const addButtonPictureMode = document.querySelector(".btn-add-picture");
  const modalInit = document.querySelector(".modif-project");
  const formAddPictures = document.querySelector(".formulaire");
  const returnBtn = document.querySelector(".fa-arrow-left");

  addButtonPictureMode.addEventListener("click", function () {
    formAddPictures.style.display = "none";
    modalInit.style.display = "none";
    returnBtn.style.display = "flex";
    formAddPictures.style.display = "flex";

    returnBtn.addEventListener("click", function () {
      modalInit.style.display = "flex";
      returnBtn.style.display = "none";
      formAddPictures.style.display = "none";
    });
  });

  // Événement pour le bouton "Ajouter photo"
  document.getElementById("addPhotoButton").addEventListener("click", function () {
    document.getElementById("photoInput").click();
  });

  // Désactiver le comportement par défaut de l'icône (qui auparavant générait une boîte de dialogue)
  document.getElementById("imageIcon").addEventListener("click", function (event) {
    event.preventDefault();
  });

  // Mettre à jour l'état du bouton "submit"
  function changeSubmitButton() {
    const submitButton = document.querySelector(".btn-submit");
    const titleInput = document.getElementById("titleInput");
    const photoInput = document.getElementById("photoInput");
    const categorySelect = document.getElementById("categorySelect");
    //si j'ai pas les values
    if (titleInput.value && photoInput.files.length && categorySelect.value) {
      submitButton.classList.remove("btn-disabled"); // Supprime la classe pour le bouton actif

    } else {
      submitButton.classList.add("btn-disabled"); // Ajoute la classe pour le bouton désactivé
    }
  }

  // Mettre à jour l'état du bouton à chaque modification dans le formulaire
  const formulaireAddProject = document.getElementById("FormAddPicture");
  formulaireAddProject.addEventListener("input", changeSubmitButton);
}

// Appeler la fonction addPictureMode pour intégrer dynamiquement la section d'ajout d'image
addPictureMode();

// Fonction pour afficher l'aperçu de l'image sélectionnée
function ImgPreview(event) {
  const picture = event.files[0];
  const image = document.getElementById("preview");
  const icon = document.querySelector(".label-icon");
  const btnAddPhoto = document.querySelector(".photo-button");
  const consign = document.querySelector(".consign");
  const addPhotoSection = document.querySelector(".add-photo");

  if (picture) {
    // On change l'URL de l'image
    image.style.display = "flex";
    image.src = URL.createObjectURL(picture);
    icon.style.display = "none";
    btnAddPhoto.style.display = "none";
    consign.style.display = "none";
    addPhotoSection.style.height = "193px";
    addPhotoSection.style.justifyContent = "center";
  }
}

// Fonction pour envoyer les données du formulaire à l'API
async function sendApi(formData) {
  const token = localStorage.getItem("token"); // Récupérer le token d'authentification du local storage
  console.log(token); // Vérifie la présence du token

  //Requête
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
    },
    body: formData,
  });
  //Réponse à la requête
  if (!response.ok) {
    console.log("Erreur lors de l'ajout du projet");
  } else {
    console.log("Projet ajouté avec succès");
  }
}

// Fonction pour gérer l'ajout d'un projet
function addProject() {
  const formulaireAddProject = document.getElementById("FormAddPicture");
  formulaireAddProject.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(); // Créer un nouvel objet FormData pour contenir les données du formulaire (ajouter au corps de la requête)

    formData.append("title", document.getElementById("titleInput").value); //append() ajoute paires clés-valeurs à 
    formData.append("image", document.getElementById("photoInput").files[0]); //formData(données form) envoyé aprés à l'API
    formData.append("category", document.getElementById("categorySelect").value);

    sendApi(formData); // Envoie la requête POST à l'API
  });
}

// Appeler la fonction addProject pour gérer l'ajout d'un projet
addProject();

// Appeler la fonction getDataWorks pour récupérer les projets et initialiser la modale
getDataWorks().then((projectsArray) => {
  modalEdition(); // Appeler la fonction modalEdition pour initialiser la modale
  displayImageProjects(projectsArray); // Afficher les images des projets dans la modale
});