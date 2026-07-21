// Factores y Fórmulas de Conversión

const CONVERSIONS = {
  "kg-lbs": { factor: 2.20462, inputLabel: "Valor en Kilogramos (kg)", outputUnit: "lbs (Libras)" },
  "lbs-kg": {
    factor: 1 / 2.20462,
    inputLabel: "Valor en Libras (lbs)",
    outputUnit: "kg (Kilogramos)",
  },
  "g-oz": { factor: 0.035274, inputLabel: "Valor en Gramos (g)", outputUnit: "oz (Onzas)" },
  "oz-g": { factor: 1 / 0.035274, inputLabel: "Valor en Onzas (oz)", outputUnit: "g (Gramos)" },
};

// Selección del DOM
const inputEl = document.getElementById("input");
const unitSelectEl = document.getElementById("unit-select");
const inputLabelEl = document.getElementById("input-label");
const resultEl = document.getElementById("result");
const unitLabelEl = document.getElementById("unit-label");
const errorEl = document.getElementById("error");
const copyBtn = document.getElementById("copy-btn");

//funciones
function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
  resultEl.textContent = "0.00";
}

function clearError() {
  errorEl.textContent = "";
  errorEl.classList.add("hidden");
}

function handleCalculate() {
  const value = inputEl.value.trim();
  const currentMode = unitSelectEl.value;

  if (value === "") {
    clearError();
    resultEl.textContent = "0.00";
    return;
  }

  const numericValue = parseFloat(value);

  if (isNaN(numericValue) || numericValue <= 0) {
    showError("Ingrese un número válido mayor a 0.");
    return;
  }

  clearError();
  const conversion = CONVERSIONS[currentMode];
  const calculated = (numericValue * conversion.factor).toFixed(2);
  resultEl.textContent = calculated;
}

// Cambiar labels al cambiar de modo en el select
function handleUnitChange() {
  const currentMode = unitSelectEl.value;
  const config = CONVERSIONS[currentMode];

  inputLabelEl.textContent = config.inputLabel;
  unitLabelEl.textContent = config.outputUnit;

  // Recalcular con el nuevo modo
  handleCalculate();
}

// Copiar al portapapeles
async function handleCopy() {
  const valueToCopy = resultEl.textContent;
  if (valueToCopy === "0.00") return;

  try {
    await navigator.clipboard.writeText(valueToCopy);
    const originalIcon = copyBtn.textContent;
    copyBtn.textContent = "✅";
    setTimeout(() => {
      copyBtn.textContent = originalIcon;
    }, 1500);
  } catch (err) {
    showError("No se pudo copiar el texto.");
  }
}

//Eventos y Atajos de Teclado

inputEl.addEventListener("input", handleCalculate);
unitSelectEl.addEventListener("change", handleUnitChange);
copyBtn.addEventListener("click", handleCopy);

// Limpiar campo al pulsar la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    inputEl.value = "";
    handleCalculate();
    inputEl.focus();
  }
});
