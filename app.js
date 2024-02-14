(function () {
  const slider = document.querySelector(".slider");
  const topAnimes = document.querySelector(".top-animes");
  const populares = document.querySelector(".populares");
  const urlBase = "https://kitsu.io/api/edge"

  if (slider) {
    peticionAnimes('/trending/anime?limit=20' , generarSliderAnime)
    peticionAnimes('/anime?limit=10' , generarCardAnime)
    peticionAnimes('/trending/anime?limit=5' , generarPopulares)
  }

  async function peticionAnimes(resto , generarHtml) {
    const peticion = await fetch(urlBase + resto);
    const respuesta = await peticion.json();
    generarHtml(respuesta.data);
  }

  function generarPopulares(animes) {
    animes.forEach((anime, i) => {
      const { attributes, id } = anime;

      const div = document.createElement("div");
      div.classList.add("populares__card")
      div.innerHTML = `
            <div class="populares__img">
              <img
                src="${attributes.posterImage.large}"
                alt=""
              />
            </div>
            <div class="populares__contenido">
              <h3>${attributes.canonicalTitle}</h3>
              <p>${attributes.episodeCount} eps</p>
              <button>${attributes.averageRating}<i class="fa-solid fa-star"></i></button>
            </div>
      `;
      populares.appendChild(div)

    });
  }

  function generarSliderAnime(animes) {
    animes.forEach((anime, i) => {
      const { attributes, id } = anime;
      const img = document.createElement("img");
      img.src = attributes.coverImage.large;
      slider.append(img);
    });
  }

  function generarCardAnime(animes) {
    console.log(animes);
    animes.forEach((anime, i) => {
      const { attributes, id } = anime;

      const div = document.createElement("div");
      div.classList.add('card-anime')
      div.innerHTML = `
            <div>
              <img
                width="100"
                height="100"
                src="${attributes.posterImage.large}"
                alt=""
                class="card-img"
              />
            </div>
            <div class="card-contenido">
              <h3>${attributes.canonicalTitle}</h3>
              <p>${attributes.episodeCount} eps</p>
              <button>${attributes.averageRating}<i class="fa-solid fa-star"></i></button>
            </div>
      `;
      topAnimes.appendChild(div)

    });
  }
})();
