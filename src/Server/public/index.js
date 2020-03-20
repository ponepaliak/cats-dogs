const socket = new WebSocket('ws://localhost:7000');
let canvas;
let context;
const celSize = 80;
let mapDictionary = {};

const initCanvasAndContext = (id) => {
    canvas = document.getElementById(id);
    context = canvas.getContext('2d');
};

const printData = data => {
    resizeCanvas(data.dimension);
    clearMap();
    addToMap(data.cats, 'cats');
    addToMap(data.dogs, 'dogs');
    addToMap(data.buldozers, 'buldozers');
    printMap();
    changeInfo(data);
    printInhabitantsCards(data.cats, 'cats-container', 'cat');
    printInhabitantsCards(data.dogs, 'dogs-container', 'dog');
    printInhabitantsCards(data.buldozers, 'buldozers-container', 'buldozer');

};

const resizeCanvas = (dimension) => {
    canvas.width = dimension * celSize;
    canvas.height = dimension * celSize;
};

const clearMap = () => {
    mapDictionary = {};
};

const addToMap = (inhabitants = [], type = '') => {
    for (let inhabitantJ of inhabitants) {
        let inhabitant = JSON.parse(inhabitantJ);
        let coordinates = coordinatesToString(inhabitant._coordinates);
        if (mapDictionary[coordinates] === undefined) mapDictionary[coordinates] = {};
        if (mapDictionary[coordinates][type] === undefined) mapDictionary[coordinates][type] = [];
        mapDictionary[coordinates][type].push(inhabitant);
    }
};

const coordinatesToString = (coordinates) => {
    return `${coordinates.x}-${coordinates.y}`
};

const coordinatesToObject = (coordinates = '') => {
    const coordinatesArr = coordinates.split('-');
    return {x: coordinatesArr[0], y: coordinatesArr[1]};
};

const printMap = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let coordinatesS in mapDictionary) {
        let coordinates = coordinatesToObject(coordinatesS);
        let img = new Image();
        let count = 0;

        if (mapDictionary[coordinatesS].buldozers !== undefined) {
            img.src = mapDictionary[coordinatesS].buldozers[0]._image;
            count = mapDictionary[coordinatesS].buldozers.length;
        } else if (mapDictionary[coordinatesS].dogs !== undefined) {
            img.src = mapDictionary[coordinatesS].dogs[0]._image;
            count = mapDictionary[coordinatesS].dogs.length;
        } else {
            img.src = mapDictionary[coordinatesS].cats[0]._image;
            count = mapDictionary[coordinatesS].cats.length;
        }

        img.onload = () => {
            context.drawImage(img, coordinates.x * celSize, coordinates.y * celSize, celSize, celSize);
            context.font = `${celSize / 2}px Verdana`;
            context.textAlign = 'center';
            context.fillStyle = 'red';
            context.fillText(count.toString(), coordinates.x * celSize + celSize / 2, coordinates.y * celSize + celSize / 2)
        };
    }
};

const changeInfo = (data) => {
    document.getElementsByClassName('cats-count')[0].innerHTML = data.cats.length;
    document.getElementsByClassName('dogs-count')[0].innerHTML = data.dogs.length;
    document.getElementsByClassName('buldozers-count')[0].innerHTML = data.buldozers.length;
};

const printInhabitantsCards = (inhabitants = [], containerSelector, type) => {
    let inhabitantsContainer = document.getElementsByClassName(containerSelector)[0];
    let content = '';
    for (let inhabitJ of inhabitants) {
        let inhabit = JSON.parse(inhabitJ);
        content += `<div class="card dog-card">
                        <img src="${inhabit._image}">
                        <span class="name">name: ${inhabit._name}</span>
                        <span>id: ${inhabit._id}</span>
                        <span class="coordinates">x: ${inhabit._coordinates.x}, y: ${inhabit._coordinates.y}</span>
                        ${getUniqueProperties(inhabit, type)}
                    </div>`;
    }
    inhabitantsContainer.innerHTML = content;
};

const getUniqueProperties = (inhabit, type) => {
    let content = '';
    switch (type) {
        case 'cat':
            content = getUniquePropertiesFromCat(inhabit);
            break;
        case 'dog':
            content = getUniquePropertiesFromDog(inhabit);
            break;
        case 'buldozer':
            content = getUniquePropertiesFromBuldozer(inhabit);
            break;
    }
    return content;
};

const getUniquePropertiesFromCat = (cat) => {
    return '';
};

const getUniquePropertiesFromDog = (dog) => {
    return `<span>eaten cats: ${dog.eatenCatsNumber}</span>`;
};

const getUniquePropertiesFromBuldozer = (buldozer) => {
    return `<span>destroyed dogs: ${buldozer.destroyedDogsNumber}</span><span>cats by dogs: ${buldozer.destroyedDogsNumber}</span>`;
};

initCanvasAndContext('map-canvas');

socket.onmessage = event => {
    printData(JSON.parse(event.data));
};