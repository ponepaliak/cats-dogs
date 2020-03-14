const socket = new WebSocket('ws://localhost:7000');
const inhabitantsText = document.getElementsByClassName('inhabitants-text')[0];
const dogButton = document.getElementsByClassName('dog-button')[0];
const catButton = document.getElementsByClassName('cat-button')[0];
const buldozerButton = document.getElementsByClassName('buldozer-button')[0];

const writeLine = text => {
    // const content = `<span class="inhabitant-data">> ${text}</span>`;
    const data = JSON.parse(text);
    console.log(data);
    const content = `<img src="${data._image}" class="inh-img">`;
    console.log(content);
    inhabitantsText.innerHTML += content;
};

dogButton.addEventListener('click', event => {
    socket.send('dog');
});

catButton.addEventListener('click', event => {
    socket.send('cat');
});

buldozerButton.addEventListener('click', event => {
    socket.send('buldozer');
});

socket.onmessage = event => {
    console.log(event.data);
    writeLine(event.data);
};