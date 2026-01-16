const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      calculate();
    } else if (value === "⌫") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else {
      appendValue(value);
    }
  });
});

function appendValue(value) {
  if (currentInput === "0") currentInput = "";
  currentInput += value;
  updateDisplay();
}

function calculate() {
  try {
    let expression = currentInput
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/\^/g, "**");

    currentInput = eval(expression).toString();
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}

/* 🎹 Keyboard Support (Bonus) */
document.addEventListener("keydown", (e) => {
  if ("0123456789.+-*/".includes(e.key)) {
    appendValue(e.key.replace("*", "×").replace("/", "÷"));
  }
  if (e.key === "Enter") calculate();
  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
});
