container = document.querySelector('.container');
gridButton = document.getElementById('submit-grid');
clearGridButton = document.getElementById('clear-grid');
gridWidth = document.getElementById('width-range');
gridHeight = document.getElementById('height-range');
colorButton = document.getElementById('color-input');
eraseButton = document.getElementById('erase-btn');
paintButton = document.getElementById('paint-btn');
widthValue = document.getElementById('width-value');
heightValue = document.getElementById('height-value');

let events = {
    mouse: {
        down: "mousedown",
        up: "mouseup",
        move: "mousemove"
    },
    touch: {
        down: "touchstart",
        up: "touchend",
        move: "touchmove"
    }
}

let deviceType = "";
let isDrawing = false;
let isErasing = false;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (error) {
        deviceType = "mouse";
        return false;
    }
}

isTouchDevice();

gridButton.addEventListener('click', () => {

    container.innerHTML = '';
    let count = 0;

    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement('div');
        div.classList.add('gridRow');

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement('div');
            col.classList.add('gridCol');
            col.setAttribute('id', `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => {
                isDrawing = true;
                if (isErasing) {
                    col.style.backgroundColor = transparent;
                }
                else {
                    col.style.backgroundColor = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (event) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? event.clientX : event.touches[0].clientX, !isTouchDevice() ? event.clientY : event.touches[0].clientX,
                    !isTouchDevice() ? event.clientX : event.touches[0].clientX, !isTouchDevice() ? event.clientY : event.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                isDrawing = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
});

function checker(elementId) {
    let griColumns = document.querySelectorAll('.gridCol');
    griColumns.forEach((element) => {
        if (elementId == element.id) {
            if (isDrawing && !isErasing) {
                element.style.backgroundColor = colorButton.value;
            } else if (isDrawing && isErasing) {
                element.style.backgroundColor = transparent;
            }
        }
    });
}

clearGridButton.addEventListener('click', () => {
    container.innerHTML = '';
});

eraseButton.addEventListener('click', () => {
    isErasing = true;
});

paintButton.addEventListener('click', () => {
    isErasing = false;
});

gridWidth.addEventListener('input', () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener('input', () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};