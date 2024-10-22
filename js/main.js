
async function getApi() {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTEyMDYyNTEwNWVlZjdiNTY4NDA1NzU3NTUwZGNmZiIsIm5iZiI6MTcyOTU1MTA0My42NDc3NDQsInN1YiI6IjY3MGU5OGQ3ZDVmOTNhM2RhMGJjNjIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cFdFBmZjM678PLcMc2jOynqVlH7OB9eEzkFFecA-rCU'
            }
        }
        
        const resFilmesPopulares = await fetch('https://api.themoviedb.org/3/movie/popular?language=pt-br&page=1', options)
        if (resFilmesPopulares.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente!");
        }

        const resFilmesTendencias = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=pt-br&page=1', options)
        if (resFilmesTendencias.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente!");
        }

        const resTv = await fetch('https://api.themoviedb.org/3/tv/popular?language=pt-br&page=1', options)
        if (resTv.status != 200) {
            throw new Error("Erro ao buscar informações, tente novamente!");
        }



        const dadosFilmesPopulares = await resFilmesPopulares.json()
        const dadosFilmesTendencias =  await resFilmesTendencias.json()
        const dadosTv = await resTv.json()


        const poster = "https://image.tmdb.org/t/p/w500"
        const bg = "https://image.tmdb.org/t/p/original"



        const sessaoFilmes = document.getElementById("filmes")
        const sessaoTendencias = document.querySelector(".cards-tendencias")
        const sessaoSeries = document.getElementById("series")
        


        const mainFilme = dadosFilmesPopulares.results[0]

        const mainTitulo = document.querySelector(".home-content h1")
        mainTitulo.textContent = mainFilme.title

        const mainDescricao = document.querySelector(".home-content p")
        mainDescricao.textContent = mainFilme.overview

        const mainPoster = document.querySelector(".thumb-home img")
        mainPoster.src = poster + mainFilme.poster_path

        const mainSessao = document.getElementById("home")
        mainSessao.style.backgroundImage = `url(${bg + mainFilme.backdrop_path})`
    


        for (let i = 1; i < 19; i++) {
            const filme = dadosFilmesPopulares.results[i]

            const div = document.createElement("div")
            div.innerHTML = `
                <img src="${poster + filme.poster_path}" alt="${filme.title}">
                <h1>${filme.title}</h1>
            `

            sessaoFilmes.appendChild(div)
        }




        for (let i = 0; i < 18; i++) {
            const serie = dadosTv.results[i];

            const div = document.createElement("div")
            div.innerHTML = `
                <img src="${poster + serie.poster_path}" alt="${serie.name}">
                <h1>${serie.name}</h1>
            `

            sessaoSeries.appendChild(div)
        }

        

        for (let i = 0; i < 5; i++) {
            const tendencia = dadosTv.results[i];

            const div = document.createElement("div")
            div.style.backgroundImage = `url(${poster + tendencia.poster_path})`
            div.innerHTML = `
                <h1>${tendencia.name}</h1>
            `


            sessaoTendencias.appendChild(div)
        }        
      


    } catch (error) {
        alert(error.message)
    }
}
getApi()