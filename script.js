function updateTime() {
     var currentTime = new Date().toLocaleString();
    
     var timetext =document.querySelector("#Time");

     timetext.innerHTML = currentTime;
    }
    setInterval(updateTime, 1000);
   
dragElement(document.getElementById("window"));

function dragElement(element) {
     var initialX =0;
    
     var initialY =0;

     var initialX =0;

     var initialY =0;

     if (document.getElementById(element.id + "header")) {
            document.getElementById(element.id + "header").onmousedown = dragMouseDown = startDragging;
        } else {
            element.onmousedown = startDragging;
        }

        function startDragging(e) {
            e = e|| window.event;
            e.preventDefault();

            initialX = e.clientX;
            initialY = e.clientY;

            document.onmouseup = stopDragging;
            document.onmousemove = dragElement;

        }

        function dragElement(e) {
            e = e|| window.event;
            e.preventDefault();

            currentX = initialX - e.clientX;
            currentY = initialY - e.clientY;

            initialX = e.clientX;
            initialY = e.clientY;

            element.style.top = (element.offsetTop - currentY) + "px";
            element.style.left = (element.offsetLeft - currentX) + "px";
        }

        function stopDragging(){
            document.onmouseup = null;
            document.onmousemove  = null;
        }
}

var welcomeheader = document.getElementById("welcomeheader");
var closeBtn = document.getElementById("closeBtn");
var windowElement = document.getElementById("window");

closeBtn.addEventListener("click", function() {
    windowElement.style.display = "none";
});

function openWindow(element){
    element.style.display = "block";
}

var welcomeopen = document.getElementById("welcomeopen");

welcomeopen.addEventListener("click", function() {
    openWindow(windowElement);
});

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconClick(element) {
    if (selectedIcon === element) {
        selectIcon(element);

    } else {
       deselectIcon(element) 
    }
}

var notesWindow = document.getElementById("notesUi");
var notesIcon = document.getElementById("notesIcon");
var closeNotesBtn = document.getElementById("notescloseBtn");
var notesheader = document.getElementById("notesheader");
var biggerIndex = 1;
var topbar = document.querySelector("#top");
let quill = null;

notesIcon.addEventListener("click", function() {
    notesWindow.style.display = "block";

    if(!quill) {
        quill = new Quill('#quill-editor', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            }
        });
    }
});

closeNotesBtn.addEventListener("click", function() {
    notesWindow.style.display = "none";
});

dragElement(document.getElementById("notesUi"));

function closewindow(element) {
    element.style.display = "none";
}

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
      handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggerIndex++;
    element.style.zIndex = biggerIndex;
    topbar.style.zIndex = biggerIndex + 1;
    if (selectedIcon) {
        deselectIcon(selectedIcon);
    }
}

function openWindow(element) {
    element.style.display = "block";
    biggerIndex++;
    element.style.zIndex = biggerIndex;
    topbar.style.zIndex = biggerIndex + 1;
}
function initializeWindow(elementName) {
    var element = document.querySelector("#" + elementName);
    addWindowTapHandling(element);
    dragElement(element);
    
}
initializeWindow("notesUi");

