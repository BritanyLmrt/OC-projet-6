//Récupération des données Projets
async function projectsData() {  //création de la fonction projectsData (donnéesProjets)
    const response = await fetch('http://localhost:5678/api/work'); //requête de récupération des données works sur l'API et stockage dans response
    if (!response.ok) { //si response = false .ok = vérifie si la requête à échouer en vérifiant le statut http
      console.log("Erreur lors de la requête à l'API"); //affichage dans la console si récup raté
    }
    const projects = await response.json(); //Récupération de la réponse à la requête (response.json)
    return projects; //Retourne les éléments de réponses à cette fonction
  }
  
  async function displayProjects() { //création de la fonction displayProjects (affichageProjets) 
      const projects = await projectsData(); //Récup de return (Réponse de la requête) et stockage dans projects et appel de la fonction projectsData
      const mesProjetsSection = document.querySelector(".gallery"); //Récup de l'éléments parent html (div class="gallery")
  
      projects.forEach(project => { //Boucle forEach demandant d'appliquer ce code à chaque éléments du tableau
        console.log(project); //voir chaque élément du tableaux dans la console

        // Récup de <div class="gallery"> comme élément parent, et ajout du code html ci-desous en récupérant ${API.éléments}
        mesProjetsSection.innerHTML += `      
          <figure>
            <img src="${project.imageUrl}" alt="${project.title}"> 
            <figcaption>${project.title}</figcaption>
          </figure>
        `;
      });
  }
  
  displayProjects(); //appel de la fonction
  