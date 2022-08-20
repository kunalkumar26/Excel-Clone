

for(let i=0; i<AllGridCells.length; i++){
    AllGridCells[i].addEventListener("blur", function(){
        // AllGridCells[i].textContent = eval(AllGridCells[i].textContent);
        let address = addressInput.value;
        let {row, col} = getRowCol(address);
        // db[row][col].value = AllGridCells[i].textContent;
        let content = AllGridCells[i].textContent

        if(db[row][col].value == content){
            return;
        }

        if(db[row][col].formula){
            removeFormula(address);
            // clearing the formula from the UI
            formulaInput.value = "";
            // clearing the formula from the DB
            db[row][col].formula = "";
        }

        setUI(content, row, col);
    })
}

// removeFormula
function removeFormula(address) {
    let {row, col} = getRowCol(address);
    let cellObj = db[row][col];
    let formula = cellObj.formula;
    let formulaEntities = formula.split(" ");
    for(let i=0; i< formulaEntities.length; i++){
        let ascii = formulaEntities[i].charCodeAt(0);
        if(65 <= ascii && ascii <= 90){
            let parent = formulaEntities[i];
            let parentRowColObj = getRowCol(parent);
            let prow = parentRowColObj.row;
            let pcol = parentRowColObj.col;
            let parentsChildrenArr = db[prow][pcol].children;
            let ind = parentsChildrenArr.indexOf(address);
            parentsChildrenArr.splice(ind, 1);
        }
    }
}

// Recursive function
function setUI(value, row, col){
    let cell = document.querySelector(`.grid .cell[rId="${row}"][cId="${col}"]`);
    // setting on ui.
    cell.textContent = value;
    // setting in db.
    db[row][col].value = value;
    // change your children -> reevaluate -> set ui.
    let childrenArr = db[row][col].children;
    for(let i=0; i<childrenArr.length; i++){
        let address = childrenArr[i];

        // if we use the below line it will throw error
        // as we have to use {row, col} to get the result of the function getRowCol.
        // and any other name will throw error.
        // if we want to use any other name then we have to
        // store the result of the function in an object and can access the values of that object.
        // let {chrow, chcol} = getRowCol(address);

        // code type-1 -> will work fine as we are not getting results from the function.
        let chrow = Number(address.substring(1))-1;
        let chcol = address.charCodeAt(0) - 65;
        let childrenCellObj = db[chrow][chcol];
        let value = evaluateFormula(childrenCellObj.formula);
        setUI(value, chrow, chcol);

        // code type-2 -> will work fine as we are getting results from the function with the same name row and col.
        // let {row, col} = getRowCol(address);
        // let childrenCellObj = db[row][col];
        // let value = evaluateFormula(childrenCellObj.formula);
        // setUI(value, row, col);
    }
}

function evaluateFormula(formula){
    let formulaEntities = formula.split(" ");
    console.log(formulaEntities);
    for(let i = 0; i < formulaEntities.length; i++){
        let ascii = formulaEntities[i].charCodeAt(0);
        if(65 <= ascii && ascii <= 90){
            // this is a char from A to Z.
            let {row, col} = getRowCol(formulaEntities[i]);
            let value = db[row][col].value;
            formula = formula.replace(formulaEntities[i], value);
            // formulaEntities[i] = value;
            
        }
    }
    return eval(formula);
}

formulaInput.addEventListener("keydown", function (e){
    if(e.key == "Enter" && formulaInput.value != ""){
        let cFormula = formulaInput.value;
        let address = addressInput.value;
        let {row, col} = getRowCol(address);
        if(db[row][col].formula && cFormula != db[row][col].formula ){
            console.log("Formula changed");
            removeFormula(address);
        }
        let value = evaluateFormula(cFormula);
        setUI(value, row, col);
        db[row][col].formula = cFormula;
        setParent(address, cFormula);
    }
})

// ( A1 + B1 )

// this functions sets the parent of the current cell
// so if any parent changes then changes will be reflected in all the children also.
function setParent(address, formula){
    console.log(address);
    let formulaEntities = formula.split(" ");
    for(let i = 0; i < formulaEntities.length; i++){
        let ascii = formulaEntities[i].charCodeAt(0);
        if(65 <= ascii && ascii <= 90){
            let {row, col} = getRowCol(formulaEntities[i]);
            let children = db[row][col].children;
            children.push(address);
        }
    }
}