const board = document.querySelector("#board");
const boardAttack = document.querySelector("#boardAttack");
const position = document.querySelectorAll(".position");
let matrix = [];
let matrixAttack = [];
const sizeShip = [5, 4, 3, 2];
const positionArray = ["horizontal", "vertical"]
let quantityShip = [1, 1, 1, 2];
let quantityShipPC =  [1, 1, 1, 2];
let ship = {};
let shipRandom = {};

//Función para creación de tableros
function createMatrix(boardType, matrixType, func){
    for(let i=0; i<10; i++){
        let list = []
        let row = document.createElement("div");
        boardType.appendChild(row);
        row.className = "row"
        for(let j=0; j<10; j++){
            let grid = document.createElement("div");
            row.appendChild(grid);
            grid.className = "grid";
            grid.id = i + "," + j;
            grid.addEventListener("click", func);
            list.push("");
        }
        matrixType.push(list)
    }
}
//Función para seleccionar barco
function selectShip(event){
    shipData = event.target.className.split(" ");
    ship.position = shipData[0];
    ship.size = sizeShip[shipData[1]];
    ship.quantity = quantityShip[shipData[1]];
    ship.id = shipData[1];
    console.log(ship)
}
//Creación de tablero jugador
createMatrix(board, matrix, selectPosition);
//Creación de barcos
for(let i=0; i<position.length; i++){
    let horizontal = document.createElement("div");
    position[i].appendChild(horizontal);
    horizontal.className = "horizontal " + i;
    horizontal.addEventListener("click", selectShip)
    let vertical = document.createElement("div");
    position[i].appendChild(vertical);
    vertical.className = "vertical " + i;
    vertical.addEventListener("click", selectShip)
}
//Función de botón iniciar juego
function startGame(){
    console.log("se está llamando")
    createMatrix(boardAttack, matrixAttack, selectPosition);
    selectPositionRandom()
}
//Función para seleccionar posición de los barcos
function selectPosition(event){
    if(ship.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(ship.position === "horizontal"){
            if((y + (ship.size - 1)) < 10){
                for(let i=y; i<(y + ship.size); i++){
                    matrix[x][i] = "ship";
                    document.getElementById(x + "," + i).className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("seleccione otra posición");
            }
        }
        else if(ship.position === "vertical"){
            if((x + (ship.size - 1)) < 10){
                for(let i=x; i<(x + ship.size); i++){
                    matrix[i][y] = "ship";
                    document.getElementById(i + "," + y).className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("seleccione otra posición");
            }
        }
        console.log(matrix)
    }
    else{
        alert("seleccione un barco disponible");
    }
}
//Generar posición random de barcos
function selectPositionRandom(){
    for(let i=0; i<quantityShipPC.length; i++){
        while(quantityShipPC[i] > 0){
            random(i);
            quantityShipPC[i] -= 1;
        }
    }
    console.log(matrixAttack)
}
//Verificación de posición válida
function checkPosition(pos, axis, size){
    console.log("se ejecuta la funcion")
    console.log(size)
    console.log(shipRandom.position, shipRandom.x + "," + shipRandom.y)
    if(shipRandom.position  === pos){
        if((axis + (size - 1)) < 10){
            return true;
        }
        else{
            return false;
        }
    }
}
//Función para crear barco random
function random(i){
    shipRandom.position = positionArray[Math.floor(Math.random() * Math.floor(positionArray.length))];
    shipRandom.x = Math.floor(Math.random() * Math.floor(10));
    shipRandom.y = Math.floor(Math.random() * Math.floor(10));
    if(checkPosition("horizontal", shipRandom.y, sizeShip[i])){
        console.log("agregando");
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            matrixAttack[shipRandom.x][j] = "ship";
        }
    }
    else if(checkPosition("vertical", shipRandom.x, sizeShip[i])){
        console.log("agregando");
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            matrixAttack[j][shipRandom.y] = "ship";
        }
    }
    else{
        console.log("volver a random");
        return random(i)
    }
}