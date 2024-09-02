const div = document.querySelector('.custom');
const image = document.querySelector('img');
const title = document.querySelector('h1');

const pathList = ['lake', 'leaves', 'road'];
const duration = 1500;
let isRunning = false;

div.addEventListener('click', startImageChange);

function changeImage(index) {
    image.style.display = 'none';
    image.src = `./asset/${pathList[index]}.jpg`;
    image.style.display = 'block';
    if (index === pathList.length - 1) {
        setTimeout(() => {
            image.style.display = 'none';
            title.style.display = 'block';
            isRunning = false;
        }, duration);
    }
}

function startImageChange() {
    if (isRunning) return;
    isRunning = true;
    pathList.forEach((path, i) => {
        title.style.display = 'none';
        setTimeout(() => {
            changeImage(i);
        }, i * duration);
    });
}