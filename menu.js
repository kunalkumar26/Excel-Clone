
// changing fontFamily
fontFamilyInput.addEventListener("change", function (){
    let fontFamily = fontFamilyInput.value;
    let address = addressInput.value;
    let {row, col} = getRowCol(address);
    let ind = row*26 + col;
    // changing on ui.
    AllGridCells[ind].style.fontFamily = fontFamily;
    // changing in database.f
    db[row][col].fontFamily = fontFamily;
})

// adding event listener to handle font size
fontSizeInput.addEventListener("change", function (){
    let fontSize = fontSizeInput.value;
    let address = addressInput.value;
    let {row, col} = getRowCol(address);
    let ind = row*26 + col;
    // updating the db.
    db[row][col].fontSize = fontSize;
    // changing on ui.
    AllGridCells[ind].style.fontSize = fontSize+"px";
})

let isBold = false;
let isItalic = false;
let isUnderline = false;

// handling bold
let boldIcon = document.querySelector(".bold");
boldIcon.addEventListener("click", function(e) {
    if(e.target != boldIcon) {
        if(isBold) {
            e.target.parentNode.classList.remove("selected");
            isBold = false;
            // chaning on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.fontWeight = "normal";
            // changing in db.
            db[row][col].bold = false;
        } else {
            e.target.parentNode.classList.add("selected");
            isBold = true;
            // chaning on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.fontWeight = "bold";
            // changing in db.
            db[row][col].bold = true;
        }
    }
})

// handling italic
let italicIcon = document.querySelector(".italic");
italicIcon.addEventListener("click", function(e) {
    if(e.target != italicIcon) {
        if(isItalic) {
            e.target.parentNode.classList.remove("selected");
            isItalic = false;
            // changing on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.fontStyle = "normal";
            // changing in db.
            db[row][col].italic = false;
        } else {
            e.target.parentNode.classList.add("selected");
            isItalic = true;
            // changing on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.fontStyle = "italic";
            // changing in db.
            db[row][col].italic = true;
        }
    }
})

// handling underline
let underlineIcon = document.querySelector(".underline");
underlineIcon.addEventListener("click", function(e) {
    if(e.target != underlineIcon) {
        if(isUnderline) {
            e.target.parentNode.classList.remove("selected");
            isUnderline = false;
            // changing on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.textDecoration = "none";
            // changing in db.
            db[row][col].underline = false;
        } else {
            e.target.parentNode.classList.add("selected");
            isUnderline = true;
            // changing on ui.
            let address = addressInput.value;
            let {row, col} = getRowCol(address);
            let ind = row*26 + col;
            AllGridCells[ind].style.textDecoration = "underline";
            // changing in db.
            db[row][col].underline = true;
        }
    }
})

let isLeftAligned = false;
let isCenterAligned = false;
let isRightAligned = false;

// handling align left
let leftAlignIcon = document.querySelector(".left_aligned");
leftAlignIcon.addEventListener("click", function (e){
    if(e.target != leftAlignIcon){
        align(e.target);
    }
})

// handling align center
let centerAlignIcon = document.querySelector(".center_aligned");
centerAlignIcon.addEventListener("click", function (e){
    if(e.target != centerAlignIcon){
        align(e.target);

    }
})

// handling align right
let rightAlignIcon = document.querySelector(".right_aligned");
rightAlignIcon.addEventListener("click", function (e){
    if(e.target != rightAlignIcon){
        align(e.target);
    }
})

function align(target){
    // remove all alignment
    let allAlignments = document.querySelectorAll(".halign_container>div");
    for(let i = 0; i < allAlignments.length; i++){
        allAlignments[i].classList.remove("selected");
    }
    // adding current alignment
    target.parentNode.classList.add("selected");
    let value = target.classList[1].split("-")[2];
    // changing on ui.
    let address = addressInput.value;
    let {row, col} = getRowCol(address);
    let ind = row*26 + col;
    AllGridCells[ind].style.textAlign = value;
    // changing in db.
    db[row][col].textAlign = value;
}

// handling cell color.
let cellColor = document.querySelector(".fa-palette");
cellColor.addEventListener("click", function (e){
    let cellColorIcon = document.querySelector(".cell_color>input");
    cellColorIcon.click();
    cellColorIcon.addEventListener("change", function (){
        let color = cellColorIcon.value;
        // changing on ui.
        let address = addressInput.value;
        let {row, col} = getRowCol(address);
        let ind = row*26 + col;
        AllGridCells[ind].style.backgroundColor = color;
        // changing in db.
        db[row][col].backgroundColor = color;
    })
})

// handle text color change
let textColor = document.querySelector(".fa-text");
textColor.addEventListener("click", function (){
    let textColorIcon = document.querySelector(".text_color>input");
    textColorIcon.click();
    textColorIcon.addEventListener("change", function (){
        let color = textColorIcon.value;
        // changing on ui.
        let address = addressInput.value;
        let {row, col} = getRowCol(address);
        let ind = row*26 + col;
        AllGridCells[ind].style.color = color;
        // changing in db.
        db[row][col].color = color;
    })
})