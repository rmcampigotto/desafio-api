document.addEventListener('DOMContentLoaded', function () {
    getInfo()
});

async function getInfo() {
    if (!location.search) {
        return;
    }

    const urlSearchParams = new URLSearchParams(location.search);
    const characterId = urlSearchParams.get('characterid');

    const res = await fetch(`http://localhost:3000/characterById/${characterId}`)
    let data = await res.json();

    document.title = data.name

    let name = document.querySelector(".nome_personagem")
    let descri = document.querySelector(".desc_personagem")
    let imgDiv = document.querySelector(".container_imagem")

    let h2 = document.createElement('h2')
    h2.textContent = data.name
    name.appendChild(h2)

    if (data.description != "") {
        descri.textContent = data.description
    }

    let img = document.createElement('img')
    img.className = "imgCharacter"
    img.src = data.imageURL
    imgDiv.appendChild(img)

    let comics = data.comics

    comics.forEach(async element => {
        let divComics = document.querySelector(".style_container")

        let link = document.createElement('a')
        link.className = "linkComic"
        let divComicsSub = document.createElement('div')
        divComicsSub.className = "style_content"
        let hqimg = document.createElement('img')
        hqimg.className = "hqimg"
        let hqtitle = document.createElement('p')
        hqtitle.className = "hqtitle"

        let comicID = element.id
        let title = element.title

        const res = await fetch(`http://localhost:3000/comicById/${comicID}`)
        const data = await res.json()

        if (data === null) {
            console.log('Sem quadrinhos pertencentes a alguma saga do Aranhaverso')
        } else {
            hqtitle.textContent = title
            hqimg.src = data.imageURL
            link.href = `../comics/comic.html?comicid=${comicID}`

            divComicsSub.appendChild(hqimg)
            divComicsSub.appendChild(hqtitle)
            link.appendChild(divComicsSub)
            divComics.appendChild(link)
        }
    });
}