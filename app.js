const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modefill = document.getElementById("jsFill");
const modebrush = document.getElementById("jsBrush");
const modeeraser = document.getElementById("jsEraser");

const randomcolor = document.getElementById("jsRandom");
const randomcolorval = document.getElementById("jsRandomColor");
const randomcolorbc = document.getElementsByClassName("backgroundstyle");

const delBtn = document.getElementById("jsDelete");
const saveBtn = document.getElementById("jsSave");

const importBtn = document.getElementById("jsImport");
const selectingColor = document.getElementById("jsSelectingColor");

const selectedColor = document.getElementById("jsSelectedColor");
const saveselectedColor = document.getElementById("jsSelectSaveBtn");
const savecontainer = document.getElementsByClassName("select_colors")[0];
//const selectcolorbc = document.getElementsByClassName("backgroundstyle2");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const cursor = document.getElementsByClassName("cursorstyle");
cursor_image = "paint.png";
cursor_color = "2c2c2c";
cursor_else = ') 0 32, auto';

selected_color_cursor = "rgb(44,44,44)";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let painting_brush = true;
let painting_fill = false;
let painting_eraser = false;
let painting_random = false;
let savedcolorarray = [];

cursor[0].style.cssText = 'cursor: url(https://img.icons8.com/ios/32/paint.png) 0 32, auto';

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting_eraser){
    ctx.strokeStyle = "#ffffff";
  }
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  Array.from(colors).forEach(color => color.classList.remove("selected_color"));
  event.target.classList.add("selected_color");
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  selected_color_cursor = color;
  painting_random = false;
  updateCursor(selected_color_cursor);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeFillClick() {
  painting_fill = true;
  painting_brush = false;
  painting_eraser = false;
  updateCursor(selected_color_cursor);
  ctx.strokeStyle = ctx.fillStyle;
  modefill.classList.remove("button_opacity");
  modebrush.classList.add("button_opacity");
  modeeraser.classList.add("button_opacity");
}

function handleModeBrushClick() {
  painting_brush = true;
  painting_fill = false;
  painting_eraser = false;
  updateCursor(selected_color_cursor);
  ctx.strokeStyle = ctx.fillStyle;
  modefill.classList.add("button_opacity");
  modebrush.classList.remove("button_opacity");
  modeeraser.classList.add("button_opacity");
}

function handleModeEraserClick() {
  painting_brush = false;
  painting_fill = false;
  painting_eraser = true;
  updateCursor(selected_color_cursor);
  modefill.classList.add("button_opacity");
  modebrush.classList.add("button_opacity");
  modeeraser.classList.remove("button_opacity");
}

function handleCanvasClick() {
  if (painting_fill) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleRandomColorClick() {
  const randomHex = Math.random().toString(16).substring(2, 8);
  randomcolorbc[0].style.cssText = 'background-color: #' + randomHex;
  randomcolorval.classList.remove("at_first");
  painting_random = true;
  Array.from(colors).forEach(color => color.classList.remove("selected_color"));
  randomcolorval.classList.add("selected_color");
  ctx.strokeStyle = '#' + randomHex;
  ctx.fillStyle = '#' + randomHex;
  selected_color_cursor = randomHex;
  updateCursor(selected_color_cursor);
}

function handleDelClick() {
  const last_fill = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = last_fill;
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

function updateCursor(color) {
  if (painting_fill === true) {
    cursor_image = '/roller-brush--v1.png';
    if (painting_random === true) {
      cursor_color = color;
    }
    else {
      cursor_color = convertrgbtohex(color);
    }
    
  }
  else if (painting_brush === true){
    cursor_image = '/paint.png';
    if (painting_random === true) {
      cursor_color = color;
    }
    else {
      cursor_color = convertrgbtohex(color);
    }
    cursor_else = ') 0 32, auto';
  }
  else{
    cursor_image = '/eraser.png';
    cursor_color = '2c2c2c';
    cursor_else = ') 8 32, auto';
  }

  cursor[0].style.cssText = 'cursor: url(https://img.icons8.com/ios/32/' + cursor_color + cursor_image + cursor_else;
}

function colortohex(color_rgb) {
  var hexadecimal = color_rgb.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function convertrgbtohex(color) {
  var string1 = color.split('(');
  var string2 = string1[1].split(')');
  var color_rgb = string2[0].split(',');
  return colortohex(color_rgb[0]*1) + colortohex(color_rgb[1]*1) + colortohex(color_rgb[2]*1);
}

function handleImportClick() {
  const url = document.getElementById("url");
  var img_url = url.value;
  const img_empty = document.getElementById("empty");
  img_empty.src = img_url;
  img_empty.onload = () => ctx.drawImage(img_empty, 0, 0);
}

function removeCheck() {if (confirm("Are You Sure You Want To Delete??")==true){handleDelClick();}}

function choosingColor() {
  selectingColor.click();
}

function handleSelectColorClick(event) {
  selectedColor.style.backgroundColor = event.target.value;
  selectedColor.classList.remove("at_first");
  selectedColor.classList.remove("backgroundstyle2");
  Array.from(colors).forEach(color => color.classList.remove("selected_color"));
  selectedColor.classList.add("selected_color");
  painting_random = true;
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = ctx.strokeStyle;
  updateCursor(ctx.strokeStyle.slice(1,7));
  selected_color_cursor = ctx.strokeStyle.slice(1,7);
}

function handleSaveSelectColorClick() {
  var newColor = document.createElement("div");
  newColor.classList.add("select_color");
  newColor.classList.add("jsColor");
  newColor.style.backgroundColor = selectedColor.style.backgroundColor;
  savecontainer.appendChild(newColor);
  savedcolorarray.push(newColor);
  savedcolorarray.forEach(color => color.addEventListener("click", handleColorClick));
  Array.from(colors).forEach(color => color.classList.remove("selected_color"));
  savedcolorarray.forEach(color => color.classList.remove("selected_color"));
  newColor.classList.add("selected_color");
  painting_random = true;
  ctx.strokeStyle = newColor.style.backgroundColor;
  ctx.fillStyle = ctx.strokeStyle;
  updateCursor(ctx.strokeStyle.slice(1,7));
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {range.addEventListener("input", handleRangeChange);}

if (modefill) {modefill.addEventListener("click", handleModeFillClick);}

if (modebrush) {modebrush.addEventListener("click", handleModeBrushClick);}

if (modeeraser) {modeeraser.addEventListener("click", handleModeEraserClick);}

if (saveBtn) {saveBtn.addEventListener("click", handleSaveClick);}

if (randomcolor) {randomcolor.addEventListener("click", handleRandomColorClick);}

if (importBtn) {importBtn.addEventListener("click", handleImportClick);}

if (selectingColor) {selectingColor.addEventListener("change", handleSelectColorClick);}

if (saveselectedColor) {saveselectedColor.addEventListener("click", handleSaveSelectColorClick);}