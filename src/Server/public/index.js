const socket = new WebSocket('ws://localhost:7000');

const max = 10;
const celSize = 50;
const fonstSize = 25;
const paddingTop = 10;
const writeLine = text => {
    const data = JSON.parse(text);
    generateClearMap();
    markingInhabitants(data.cats, 'yellow');
    markingInhabitants(data.dogs, 'rgba(183, 148, 227, 0.7)');
    markingInhabitants(data.buldozers, 'red');
    changeInfo(data);
    printCatsCards(data.cats);
    printDogsCards(data.dogs);
    printBuldozersCards(data.buldozers);
};

const generateClearMap = () => {
    let mapContainer = document.getElementsByClassName('map')[0];
    mapContainer.innerHTML = '';
    mapContainer.style.width = `${max * celSize}px`;
    mapContainer.style.height = `${max * celSize}px`;
    let cels = '';
    let style = `width: ${celSize}px; height: ${celSize - 12}px; background: white; font-size: ${fonstSize}px; text-align: center; padding-top: ${paddingTop}px`;
    for (let i = 0; i < max; i++) {
        for (let j = 0; j < max; j++) {
            cels += `<div class="${i}-${j} cell" style="${style}">0</div>`;
        }
    }

    mapContainer.innerHTML = cels;
};

const markingInhabitants = (inhabitants = [], color = '') => {
    for (let inhabitantJ of inhabitants) {
        let inhabitant = JSON.parse(inhabitantJ);
        console.log(inhabitant);
        let classDom = `${inhabitant._coordinates.x}-${inhabitant._coordinates.y}`;
        console.log(classDom);
        let cel = document.getElementsByClassName(classDom)[0];
        cel.innerHTML = parseInt(cel.innerHTML) + 1;
        cel.style.background = color;
    }
};

const changeInfo = (data) => {

    document.getElementsByClassName('cats-count')[0].innerHTML = data.cats.length;
    document.getElementsByClassName('dogs-count')[0].innerHTML = data.dogs.length;
    document.getElementsByClassName('buldozers-count')[0].innerHTML = data.buldozers.length;
};

const printBuldozersCards = (buldozers) => {
    let buldozersContainer = document.getElementsByClassName('buldozers-container')[0];
    let content = '';
    for (let buldozerJ of buldozers) {
        let buldozer = JSON.parse(buldozerJ);
        content += `<div class="card dog-card">
                        <img src="${buldozer._image}">
                        <span class="name">name: ${buldozer._name}</span>
                        <span>id: ${buldozer._id}</span>
                        <span>time mark: ${buldozer._timeMark}</span>
                        <span>destroyed dogs: ${buldozer.destroyedDogsNumber}</span>
                        <span>cats by dogs: ${buldozer.destroyedDogsNumber}</span>
                        <span class="coordinates">x: ${buldozer._coordinates.x}, y: ${buldozer._coordinates.y}</span>
                    </div>`;
    }
    buldozersContainer.innerHTML = content;
};

const printCatsCards = (cats) => {
    let catsContainer = document.getElementsByClassName('cats-container')[0];
    let content = '';
    for (let catJ of cats) {
        let cat = JSON.parse(catJ);
        content += `<div class="card dog-card">
                        <img src="${cat._image}">
                        <span class="name">name: ${cat._name}</span>
                        <span>id: ${cat._id}</span>
                        <span>time mark: ${cat._timeMark}</span>
                        <span class="coordinates">x: ${cat._coordinates.x}, y: ${cat._coordinates.y}</span>
                    </div>`;
    }
    catsContainer.innerHTML = content;
};

const printDogsCards = (dogs) => {
    let dogsContainer = document.getElementsByClassName('dogs-container')[0];
    let content = '';
    for (let dogJ of dogs) {
        let dog = JSON.parse(dogJ);
        content += `<div class="card dog-card">
                        <img src="${dog._image}">
                        <span class="name">name: ${dog._name}</span>
                        <span>id: ${dog._id}</span>
                        <span>time mark: ${dog._timeMark}</span>
                        <span>eaten cats: ${dog.eatenCatsNumber}</span>
                        <span class="coordinates">x: ${dog._coordinates.x}, y: ${dog._coordinates.y}</span>
                    </div>`;
    }
    dogsContainer.innerHTML = content;
};

socket.onmessage = event => {
    writeLine(event.data);
};