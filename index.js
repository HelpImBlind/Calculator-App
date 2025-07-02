document.addEventListener('DOMContentLoaded', () => {
    const displayInput = document.getElementById('calc_display_input');
    const displayResult = document.getElementById('calc_display_result');
  
    let currentInput = '';
    let previousInput = null;
    let operator = null;
    let resultCalculated = false;
  
    const buttons = document.querySelectorAll('.calc_btns button');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => handleButton(button.textContent.trim()));
    });
  
    function handleButton(value) {
      if (!isNaN(value) || value === '.') {
        handleNumber(value);
      } else if (value === 'DEL') {
        handleDelete();
      } else if (value === 'RESET') {
        handleReset();
      } else if (value === '=') {
        handleEqual();
      } else {
        handleOperator(value);
      }
      updateDisplay();
    }
  
    function handleNumber(value) {
      if (resultCalculated) {
        currentInput = value === '.' ? '0.' : value;
        resultCalculated = false;
        return;
      }
  
      if (value === '.' && currentInput.includes('.')) return;
  
      if (currentInput === '0' && value !== '.') {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }
  
    function handleOperator(op) {
      if (operator && !resultCalculated) {
        handleEqual();
      }
  
      previousInput = currentInput;
      operator = op;
      resultCalculated = false;
      currentInput = '';
    }
  
    function handleEqual() {
      if (!operator || previousInput === null) return;
  
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let result = 0;
  
      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case 'x':
          result = prev * current;
          break;
        case '/':
          result = prev / current;
          break;
      }
  
      displayResult.textContent = result;
      currentInput = result.toString();
      previousInput = null;
      operator = null;
      resultCalculated = true;
      updateDisplay();
    }
  
    function handleDelete() {
      if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
      } else {
        currentInput = '';
      }
    }
  
    function handleReset() {
      currentInput = '';
      previousInput = null;
      operator = null;
      resultCalculated = false;
      displayResult.textContent = '';
    }
  
    function updateDisplay() {
      if (operator && previousInput !== null) {
        displayInput.textContent = `${previousInput} ${operator} ${currentInput}`;
      } else {
        displayInput.textContent = currentInput;
      }
    }
  
    updateDisplay();

    const themeRange = document.querySelector('.theme-range');
    const body = document.body;

    const currentTheme = body.getAttribute('data-theme').replace('theme', '');
    themeRange.value = currentTheme;

    themeRange.addEventListener('input', () => {
        const themeNum = themeRange.value;
        document.body.setAttribute('data-theme', `theme${themeNum}`);
    });

  });
  