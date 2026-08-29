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
var confettiIcon = document.getElementById("confitti-icon");
var terminalIcon = document.getElementById("terminal-icon");
var terminalWindow = document.getElementById("terminalUi");
var terminalCloseBtn = document.getElementById("terminalcloseBtn");

if (terminalIcon && terminalWindow) {
    terminalIcon.addEventListener("click", function() {
        openWindow(terminalWindow);
    });
}

if (confettiIcon && typeof confetti !== 'undefined') {
    confettiIcon.addEventListener("click", (event) => {
        confetti({
            position: { x: event.clientX, y: event.clientY },
            color: ["#6941af", "#b31bf4", "#06B6D4"]
        });
    });
}

if (notesIcon && notesWindow) {
    notesIcon.addEventListener("click", function() {
        notesWindow.style.display = "block";

        if (!quill && window.Quill && document.getElementById('quill-editor')) {
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
}

closeNotesBtn.addEventListener("click", function() {
    notesWindow.style.display = "none";
});

terminalCloseBtn.addEventListener("click", function() {
    terminalWindow.style.display = "none";
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
initializeWindow("terminalUi");
initializeWindow("calculatorUI");

if (window.Terminal && document.getElementById('terminal')) {
    const term = new Terminal({
        cursorBlink: true,
        cursorStyle: 'bar',
        fontFamily: 'monospace',
    });

    term.open(document.getElementById('terminal'));
    term.write('Hello from OKATA-OS $ ')
    term.write('Type \x1b[1;33mhelp\x1b[0m to see available commands.\r\n\r\n$ ');
    let currentLine = '';

    function processCommand(command) {
        if(command === 'help'){
            term.write('\r\nAvailable commands:\r\n');
            term.write('help - Show this help message\r\n');
            term.write('clear - Clear the terminal\r\n');
            term.write('echo [text] - Echo the provided text\r\n');
            term.write('date - Show the current date and time\r\n');
            term.write('exit - Close the terminal\r\n');
            term.write('calculator - Open the calculator\r\n');
            term.write('confetti - Trigger a confetti effect\r\n');
            term.write('notes - Open the notes window\r\n');
        }else if (command === 'clear'){
            term.clear();
        }else if (command.startsWith('echo ')){
            const textToEcho = command.slice(5);
            term.write('\r\n' + textToEcho + '\r\n');
        }else if (command === 'date'){
            const currentDate = new Date().toLocaleString();
            term.write('\r\n' + currentDate + '\r\n');
        }else if (command === 'exit'){
            terminalWindow.style.display = "none";
        }else if (command === 'calculator'){
            calculatorWindow.style.display = "block";
        }else if (command === 'confetti'){
            confetti({
                position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
                color: ["#6941af", "#b31bf4", "#06B6D4"]
            });
        }else if (command === 'notes'){
            notesWindow.style.display ="block";
        }else{
            term.write('\r\nUnknown command: ' + command + '\r\n');
        }
    }

    term.onKey(e => {
        const char = e.key;
        if (char === '\r') { // Enter key
            processCommand(currentLine);
            currentLine = '';
            term.write('\r\n$ ');
        } else if (char === '\u007F') { // Backspace key
            if (currentLine.length > 0) {
                currentLine = currentLine.slice(0, -1);
                term.write('\b \b'); // Move back, write space, move back again
            }
        } else {
            currentLine += char;
            term.write(char);
        }
    });
}

var calculatorIcon = document.getElementById("calculator-icon");
var calculatorWindow = document.getElementById("calculatorUI");
var calculatorCloseBtn = document.getElementById("calculatorcloseBtn");

var calculatorReady = false;

if (calculatorIcon && calculatorWindow) {
    calculatorIcon.addEventListener("click", function() {
        calculatorWindow.style.display = "block";
    });
}

if (calculatorCloseBtn && calculatorWindow) {
    calculatorCloseBtn.addEventListener("click", function() {
        calculatorWindow.style.display = "none";
    });
}

let currentInput = '';
let currentOperation = '';
let previousInput = '';

function updateDisplay(value) {
    const display = document.getElementById('display');
    if (!display) return;
    display.textContent = value;
    if ('value' in display) {
        display.value = value;
    }
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay(`${previousInput} ${currentOperation} ${currentInput}`.trim());
}

function appendOperator(operator) {
    if (currentInput === '') return;
    if (previousInput !== '' && currentOperation !== '') {
        calculate();
    }
    currentOperation = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay(`${previousInput} ${currentOperation}`);
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;

    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    let result = 0;

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? NaN : prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    currentOperation = '';
    previousInput = '';
    updateDisplay('0');
}