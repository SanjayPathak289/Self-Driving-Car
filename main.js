const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 1;
const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain"));
        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1100, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(0), -1200, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -1400, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -1500, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(1), -1700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1900, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(0), -2000, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -2200, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -2400, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(0), -2600, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -2800, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(1), -3000, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -3300, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(2), -3600, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -3900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -4200, 30, 50, "DUMMY", 2, getRandomColor()),

    new Car(road.getLaneCenter(1), -4500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -4800, 30, 50, "DUMMY", 2, getRandomColor())
];
// const traffic = [
//     // Wave 1
//     new Car(road.getLaneCenter(0), -200, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -200, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 2
//     new Car(road.getLaneCenter(1), -450, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 3
//     new Car(road.getLaneCenter(0), -700, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -900, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 4
//     new Car(road.getLaneCenter(1), -1150, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -1150, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 5
//     new Car(road.getLaneCenter(1), -1450, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 6
//     new Car(road.getLaneCenter(0), -1700, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -1900, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 7
//     new Car(road.getLaneCenter(0), -2150, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -2150, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 8
//     new Car(road.getLaneCenter(1), -2400, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -2600, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 9
//     new Car(road.getLaneCenter(2), -2850, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 10
//     new Car(road.getLaneCenter(0), -3100, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(1), -3300, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 11
//     new Car(road.getLaneCenter(2), -3550, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -3750, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 12
//     new Car(road.getLaneCenter(1), -4000, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 13
//     new Car(road.getLaneCenter(0), -4250, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -4450, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 14
//     new Car(road.getLaneCenter(1), -4700, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -4900, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 15
//     new Car(road.getLaneCenter(2), -5100, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 16
//     new Car(road.getLaneCenter(0), -5350, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -5550, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 17
//     new Car(road.getLaneCenter(1), -5800, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 18
//     new Car(road.getLaneCenter(0), -6050, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -6250, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 19
//     new Car(road.getLaneCenter(1), -6500, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(0), -6700, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 20
//     new Car(road.getLaneCenter(2), -6950, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(1), -7150, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 21
//     new Car(road.getLaneCenter(0), -7400, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 22
//     new Car(road.getLaneCenter(2), -7650, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(1), -7850, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 23
//     new Car(road.getLaneCenter(0), -8100, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -8300, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 24
//     new Car(road.getLaneCenter(1), -8550, 30, 50, "DUMMY", 2, getRandomColor()),

//     // Wave 25
//     new Car(road.getLaneCenter(0), -8800, 30, 50, "DUMMY", 2, getRandomColor()),
//     new Car(road.getLaneCenter(2), -9000, 30, 50, "DUMMY", 2, getRandomColor()),
// ];


animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(c => c.y)
        ));

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, true);

    carCtx.restore();

    // networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    requestAnimationFrame(animate);
}