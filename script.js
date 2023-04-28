//click right mouse hide context menu
const contextMenu = document.querySelector(".tools-board");
window.addEventListener("contextmenu", e => {
    e.preventDefault();
    contextMenu.style.visibility = "visible";
});

// drawing
const canvas = document.querySelector("canvas");
toolBtns = document.querySelectorAll(".tool"),
ctx = canvas.getContext("2d");

let prevMouseX , prevMouseY, snapshot
isDrawing = false,
selectTool = "brush";

window.addEventListener("load", () => {
    //setting canvas width and height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    ctx.stroke();
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    
}
const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    ctx.stroke();
}
const drawElip = (e) => {
    ctx.save();
    ctx.scale(1, 0.75);
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX,prevMouseY + 50, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.lineWidth = 7;
    ctx.beginPath();// creating new path to draw
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0);
    if(selectTool === "brush") {
        //adds a new point x->y coordinates of the mouse pointer  
        ctx.lineTo(e.offsetX, e.offsetY);
        // shows the drawing , default color is black
        ctx.stroke();
    }else{
        if(selectTool === "vuong"){
            drawRect(e);
        }
        if(selectTool === "tron"){
            drawCircle(e);
        }
        if(selectTool === "elip"){
            drawElip(e);
        }
        
    }
    
    
}

toolBtns.forEach(btn => {
    //add handler click is btn shape
    btn.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectTool = btn.id
        console.log(selectTool);
        contextMenu.style.visibility = "hidden";
    } )
})

canvas.addEventListener("mousedown", startDraw )
canvas.addEventListener("mouseup", () => isDrawing = false  )
canvas.addEventListener("mousemove", drawing )
