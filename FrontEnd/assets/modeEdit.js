async function getDataWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    console.log("Erreur lors de la requête à l'API");
  }

  const responseRequest = await response.json();
  console.log(responseRequest);
  return responseRequest;
}

function displayImageProjects(projectsArray) {
  const myModalImages = document.querySelector(".images");
  myModalImages.innerHTML = '';

  projectsArray.forEach((project) => {
    myModalImages.innerHTML += `
        <figure>
        <div class="icn-box"><i class="fa-solid fa-trash-can"></i></div>
        <div class="icn-move"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
          <img src="${project.imageUrl}" alt="${project.title}">
          <p>Éditer<p>
        </figure>
        
      `;
  });
}






function addPicture() {
  const modal = document.querySelector(".modal");
  const addButton = document.querySelector(".btn-add-picture");

  addButton.addEventListener("click", function () {
    modal.innerHTML = '';
    modal.innerHTML = `
					<div class="close arrow-pos">
						<i class="fa-solid fa-arrow-left"></i>
						<i class="fa-solid fa-xmark"></i>
					</div>
					<h3>Ajout photo</h3>
					<form id="FormAddPicture">
						<div class="add-photo">
							<input type="file" id="photoInput" name="photo" accept="image/jpeg, image/png">
							<label for="photoInput" class="photo-input-label"><br>
								<span class="label-icon"><i class="fa-regular fa-image"></i></span>
								<input type="button" value="+ Ajoutez photo" class="photo-button">
							</label>
							<p>jpg, png : 4mo max</p>
						</div>
						<div class="title-photo">
							<label for="titleInput">Titre</label>
							<input type="text" id="titleInput" name="title">
						</div>
						<div class="category-photo">
							<label for="categorySelect">Catégorie</label>
							<select id="categorySelect" name="category">
								<option>Objets</option>
								<option>Appartements</option>
								<option>Hôtels & restaurants</option>
							</select>
						</div>
						<div class="buttons">
							<button type="submit" class="btn-add-picture">Valider</button>
						</div>
					</form>`

  })
}
addPicture();


function modalEdition() {
  const modale = document.querySelector(".modal");
  const buttonModifier = document.querySelector(".editing-btn");
  const closeButton = document.querySelector(".close");

  buttonModifier.addEventListener("click", function () {
    modale.style.display = "flex";
    getDataWorks()
      .then((projectsArray) => displayImageProjects(projectsArray))
      .catch((error) => {
        console.log(error);
      });
  });

  closeButton.addEventListener("click", function () {
    modale.style.display = "none";
  });
}

getDataWorks()
  .then((projectsArray) => {
    modalEdition();
  })