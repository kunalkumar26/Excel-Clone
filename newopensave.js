let newInput = document.querySelector(".fa-file");
let openBtn = document.querySelector(".fa-envelope-open");
let downloadBtn = document.querySelector(".fa-save");
let openInput = document.querySelector(".open_input");

newInput.addEventListener("click", function (){
    // console.log("cleared all")
    // empty db
    sheetsDb = [];
    // db initalizes
    initDB();
    // clear from ui
    setinitUI();
    // removing other sheets
    removeSheets();
})

function removeSheets() {
    let sheets = document.querySelectorAll(".sheet");
    for (let i = 1; i < sheets.length; i++) {
        sheets[i].remove();
    }
}

openBtn.addEventListener("click", function (){
    openInput.click();
})

openInput.addEventListener("change", function (e){
    let filesArr = openInput.files;
    let file = filesArr.item(0);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', (event) => {
        // empty db
        sheetsDb = [];
        // db initalizes
        initDB();
        // clear from ui
        setinitUI();
        removeSheets();
        sheetsDb = JSON.parse(event.target.result);
        // console.log(db);
        db = sheetsDb[0];
        setinitUI();
        setSheets();
    })
})

function setSheets() {
    // console.log(sheetsDb.length)
    for(let i=0; i<sheetsDb.length-1; i++){
        sheetOpenHandler();
    }
}

function sheetOpenHandler(){
    let noofChildren = sheetList.children.length;
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", noofChildren);
    newSheet.textContent = `Sheet ${noofChildren+1}`;
    sheetList.appendChild(newSheet);
    // initDB();
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
    })
}

downloadBtn.addEventListener("click", function (e){
    // anchor create
    let a = document.createElement("a");
    // file put -> db array
    let StringCode = encodeURIComponent(JSON.stringify(sheetsDb));
    let dataStr = "data:text/json;charset=utf-8," + StringCode;
    a.href = dataStr;
    a.download = "file.json";
    // anchor click
    a.click();
    // var ws = XLSX.utils.json_to_sheet(db);
    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    // XLSX.writeFile(wb, "file.xlsx");
})



