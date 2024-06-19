document.addEventListener('DOMContentLoaded', function () {
    getImages()
});

async function getImages() {

    const div = document.querySelector('.style_content')
    let divPai, divSub, img, p, a

    const res = await fetch('http://localhost:3000/characterAll')
    let data = await res.json();

    data.forEach(element => {
        a = document.createElement('a')
        a.id = "link"
        divPai = document.createElement('div')
        divPai.id = "divPai"
        divSub = document.createElement('div')
        divSub.id = "divSub"
        img = document.createElement('img')
        img.src = element.imageURL
        p = document.createElement('p')
        p.textContent = element.name

        a.href = `./pages/characters/character.html?characterid=${element.characterID}`

        a.appendChild(img)
        a.appendChild(p)
        divSub.appendChild(a)
        divPai.appendChild(divSub)
        div.appendChild(divPai)
    });
}