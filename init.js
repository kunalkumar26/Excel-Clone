// declaring all variables needed.
// menu bar variables
let fontFamilyInput = document.querySelector(".font_family_input");
let fontSizeInput = document.querySelector(".font_size_input");
let addressInput = document.querySelector(".address_input");
let formulaInput = document.querySelector(".formula_input");
let createSheetIcon = document.querySelector(".fa-plus");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");

// fontFamilyInput.value = "Monaco" -> will show Monaco in the fontFamilyInput UI when starting up
// fontFamilyInput.value = "sans-serif" -> will show Default in the fontFamilyInput UI when starting up
// This is happening because fontFamilyInput will store the value of the input and based on the input value it will show the name.

// creating our MAIN database for 2-way binding.
let sheetsDb = [];
let db = [];
function initDB(){
    db = [];
    for(let i=0; i<100; i++){
        let rowArr = [];
        for(let j=0; j<26; j++){
            let cellObj = {
                fontFamily: "sans-serif",
                fontSize: 16,
                bold: false,
                italic: false,
                underline: false,
                textAlign: "left",
                backgroundColor: "white",
                color: "black",
                value: "",
                formula: "",
                children: [],
            }
            rowArr.push(cellObj);
        }
        db.push(rowArr);
    }
    sheetsDb.push(db);
}
initDB();

// generating top row from A -> Z
let top_row = document.querySelector(".top_row");
for(let i=0; i<26; i++){
    let ch = "A";
    ch = String.fromCharCode(ch.charCodeAt(0)+i);
    let div = document.createElement("div");

    div.setAttribute("class", "cell");
    // <div class="cell"></div>

    div.textContent = ch;
    top_row.appendChild(div);
}

// generating left column from 1->100
let left_col = document.querySelector(".left_col");
for(let i = 1; i <= 100; i++){
    let div = document.createElement("div");
    div.setAttribute("class", "cell");
    div.textContent = i;
    left_col.appendChild(div);
}

// 2d loop for creating 26*100 cells on the UI.
// generating the actual 2d grid.
let grid = document.querySelector(".grid");
for(let i=0; i<100; i++){
    let row = document.createElement("div");
    // row.style.display = "flex";
    row.setAttribute("class", "row");
    for(let j=0; j<26; j++){
        let div = document.createElement("div");
        div.setAttribute("class", "cell");
        div.setAttribute("contentEditable", "true");
        div.style.outline = "none";
        // div.textContent = i + "," + j;
        div.setAttribute("rId", i);
        div.setAttribute("cId", j);
        // <div rId="i" cId="j" ></div>
        row.appendChild(div);
    }
    grid.appendChild(row);
}

// adding event listener on each grid cell to know if it was clicked
let AllGridCells = document.querySelectorAll(".grid .cell");
console.log(AllGridCells.length);
for (let i = 0; i < AllGridCells.length; i++){
    // here i have changed the eventlistener from click to focus.
    AllGridCells[i].addEventListener("focus", function (){
        let prevAddress = addressInput.value;
        console.log(prevAddress);
        if(prevAddress != ""){
            let {row, col} = getRowCol(prevAddress);
            let ind = row*26 + col;
            AllGridCells[ind].classList.remove("active");
        }
        
        // console.log("cell was clicked");
        // getting row and col number
        let row = Number(AllGridCells[i].getAttribute("rId"));
        let col = Number(AllGridCells[i].getAttribute("cId"));
        
        AllGridCells[i].classList.add("active");

        addressInput.value = String.fromCharCode(col+65) + (row+1);
        
        fontFamilyInput.value = db[row][col].fontFamily;
        fontSizeInput.value = db[row][col].fontSize;
        formulaInput.value = db[row][col].formula;
        let ind = row*26 + col;
// ***********************************************************
        // adding bold property to the ui.
        if(db[row][col].bold){
            document.querySelector(".bold").classList.add("selected");
            AllGridCells[ind].style.fontWeight = "bold";
        } else {
            document.querySelector(".bold").classList.remove("selected");
            AllGridCells[ind].style.fontWeight = "normal";
        }
        // adding italic property
        if(db[row][col].italic){
            document.querySelector(".italic").classList.add("selected");
            AllGridCells[ind].style.fontStyle = "italic";
        } else {
            document.querySelector(".italic").classList.remove("selected");
            AllGridCells[ind].style.fontStyle = "normal";
        }
        // adding underline property
        if(db[row][col].underline){
            document.querySelector(".underline").classList.add("selected");
            AllGridCells[ind].style.textDecoration = "underline";
        } else {
            document.querySelector(".underline").classList.remove("selected");
            AllGridCells[ind].style.textDecoration = "none";
        }
        // adding halign property
        let halign = db[row][col].textAlign;
        let allAlignments = document.querySelectorAll(".halign_container>div");
        for(let i = 0; i < allAlignments.length; i++){
            allAlignments[i].classList.remove("selected");
        }
        let className = "."+halign + "_aligned";
        document.querySelector(className).classList.add("selected");
        // handling cell color change
        AllGridCells[ind].style.backgroundColor = db[row][col].backgroundColor;
        // handling text color change
        AllGridCells[ind].style.color = db[row][col].color;
    })
}

// clickng the first cell when starting up
let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
firstCell.click();
firstCell.focus();
firstCell.classList.add("active");
fontFamilyInput.value = db[0][0].fontFamily;
fontSizeInput.value = db[0][0].fontSize;
formulaInput.value = db[0][0].formula;

function getRowCol(address){
    let row = Number(address.substring(1))-1;
    let col = address.charCodeAt(0) - 65;
    return {
        row,
        col
    }
}

function setinitUI() {
    for(let i=0; i<100; i++){
        for(let j=0; j<26; j++){
            // get all prop from the db and set it on the ui.
            // AllGridCells
            let cell = document.querySelector(`.grid .cell[rId='${i}'][cId='${j}']`);
            cell.style.fontFamily = db[i][j].fontFamily;
            cell.style.fontSize = db[i][j].fontSize + 'px';
            cell.textContent = db[i][j].value;
// ***********************************************************
            let ind = i*26 + j;
            if(db[i][j].bold){
                AllGridCells[ind].style.fontWeight = "bold";
            } else {
                AllGridCells[ind].style.fontWeight = "normal";
            }
            // adding italic property
            if(db[i][j].italic){
                AllGridCells[ind].style.fontStyle = "italic";
            } else {
                AllGridCells[ind].style.fontStyle = "normal";
            }
            // adding underline property
            if(db[i][j].underline){
                AllGridCells[ind].style.textDecoration = "underline";
            } else {
                AllGridCells[ind].style.textDecoration = "none";
            }
            // handling halign property
            let halign = db[i][j].textAlign;
            let allAlignments = document.querySelectorAll(".halign_container>div");
            for(let ind = 0; ind < allAlignments.length; ind++){
                allAlignments[ind].classList.remove("selected");
            }
            let className = "."+halign + "_aligned";
            document.querySelector(className).classList.add("selected");
            // handling cell color change
            AllGridCells[ind].style.backgroundColor = db[i][j].backgroundColor;
            // handling text color change
            AllGridCells[ind].style.color = db[i][j].color;
        }
    }
    let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
    firstCell.click();
    firstCell.focus();
    firstCell.classList.add("active");
    fontFamilyInput.value = db[0][0].fontFamily;
    fontSizeInput.value = db[0][0].fontSize;
    formulaInput.value = db[0][0].formula;
// ***********************************************************
    if(db[0][0].bold){
        document.querySelector(".bold").classList.add("selected");
    } else {
        document.querySelector(".bold").classList.remove("selected");
    }
    // adding italic property
    if(db[0][0].italic){
        document.querySelector(".italic").classList.add("selected");
    } else {
        document.querySelector(".italic").classList.remove("selected");
    }
    // adding underline property
    if(db[0][0].underline){
        document.querySelector(".underline").classList.add("selected");
    } else {
        document.querySelector(".underline").classList.remove("selected");
    }
    // handling halign property
    let halign = db[0][0].textAlign;
    let allAlignments = document.querySelectorAll(".halign_container>div");
    for(let ind = 0; ind < allAlignments.length; ind++){
        allAlignments[ind].classList.remove("selected");
    }
    let className = "."+halign + "_aligned";
    document.querySelector(className).classList.add("selected");
    // handling cell color change
    AllGridCells[0].style.backgroundColor = db[0][0].backgroundColor;
    // handling text color change
    AllGridCells[0].style.color = db[0][0].color;
}

// adding eventlistener for the first sheet.
firstSheet.addEventListener("click", function (){
    for(let i=0; i<sheetList.children.length; i++){
        sheetList.children[i].classList.remove("active-sheet");
    }
    firstSheet.classList.add("active-sheet");
    db = sheetsDb[0];
    setinitUI();
    let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
    firstCell.click();
    firstCell.focus();
    firstCell.classList.add("active");
    fontFamilyInput.value = db[0][0].fontFamily;
    fontSizeInput.value = db[0][0].fontSize;
    formulaInput.value = db[0][0].formula;
})

createSheetIcon.addEventListener("click", function(){
    let noofChildren = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", noofChildren);
    // let tc = "Sheet " + (noofChildren+1);
    // newSheet.textContent = tc;
    newSheet.textContent = `Sheet ${noofChildren+1}`;
    sheetList.appendChild(newSheet);
    initDB();
    // active-sheet work -> TODO
    newSheet.addEventListener("click", function (e){
        // remove active
        for(let i=0; i<sheetList.children.length; i++){
            sheetList.children[i].classList.remove("active-sheet");
        }
        newSheet.classList.add("active-sheet");
        let idx = newSheet.getAttribute("sheetIdx");
        db = sheetsDb[idx];
        setinitUI();
        let firstCell = document.querySelector(".grid .cell[rId='0'][cId='0']");
        firstCell.click();
        firstCell.focus();
        firstCell.classList.add("active");
        fontFamilyInput.value = db[0][0].fontFamily;
        fontSizeInput.value = db[0][0].fontSize;
        formulaInput.value = db[0][0].formula;
    })
})