// Starfield background
(function initStars() {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.015 + 0.005,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.a += s.speed;
      const brightness = (Math.sin(s.a) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220, 210, 255, ${0.3 + brightness * 0.7})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
})();

// Calculator logic
const display = document.getElementById("display");
const expressionEl = document.getElementById("expression");

let current = "0";
let previous = null;
let operator = null;
let fresh = true;

function updateDisplay() {
  display.textContent = current;
}

function flashDisplay() {
  display.classList.add("flash");
  setTimeout(() => display.classList.remove("flash"), 300);
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  expressionEl.textContent = "";
  updateDisplay();
}

function inputDigit(d) {
  if (fresh) {
    current = d;
    fresh = false;
  } else {
    current = current === "0" ? d : current + d;
  }
  updateDisplay();
}

function inputDecimal() {
  if (fresh) {
    current = "0.";
    fresh = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
  updateDisplay();
}

function backspace() {
  if (fresh) return;
  current = current.length <= 1 ? "0" : current.slice(0, -1);
  if (current === "-" || current === "") current = "0";
  updateDisplay();
}

function percent() {
  const val = parseFloat(current);
  if (isNaN(val)) return;
  current = String(val / 100);
  updateDisplay();
}

function setOperator(op) {
  const val = parseFloat(current);
  if (previous !== null && operator && !fresh) {
    compute();
  } else {
    previous = val;
  }
  operator = op;
  fresh = true;
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  expressionEl.textContent = `${previous} ${symbols[op]}`;
}

function compute() {
  if (operator === null || previous === null) return;
  const a = previous;
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) {
        current = "∞";
        expressionEl.textContent = "Division by zero";
        previous = null;
        operator = null;
        fresh = true;
        updateDisplay();
        return;
      }
      result = a / b;
      break;
    default: return;
  }

  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  expressionEl.textContent = `${a} ${symbols[operator]} ${b} =`;

  result = Math.round(result * 1e10) / 1e10;
  current = String(result);
  previous = null;
  operator = null;
  fresh = true;
  flashDisplay();
  updateDisplay();
}

document.querySelector(".keypad").addEventListener("click", (e) => {
  const btn = e.target.closest(".key");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  switch (action) {
    case "digit": inputDigit(value); break;
    case "decimal": inputDecimal(); break;
    case "clear": clearAll(); break;
    case "backspace": backspace(); break;
    case "percent": percent(); break;
    case "operator": setOperator(value); break;
    case "equals": compute(); break;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") inputDigit(e.key);
  else if (e.key === ".") inputDecimal();
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); compute(); }
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape") clearAll();
  else if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
});
