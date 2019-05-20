const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')

keys.addEventListener('click', e => {

    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent 
        const displayedNum = display.textContent 
        const previousKeyType = calculator.dataset.previousKeyType 
        var click = new Audio('click.m4a')

        click.play();

        if (!action) {
            if (displayedNum === '' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ) {
              const firstValue = calculator.dataset.firstValue 
              const operator = calculator.dataset.operator 
              const secondValue = displayedNum

              if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                  const calculatedValue = calculate(firstValue, operator, secondValue)
                  display.textContent = calculatedValue
                  calculator.dataset.firstValue = calculatedValue 
              } else {
                  calculator.dataset.firstValue = displayedNum
              }
            calculator.dataset.operator = action 
            calculator.dataset.previousKeyType = 'operator'
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
            } else if (previousKeyType === 'operator' || previousKeyType ==='calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }

        if (action === 'clear') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
            display.textContent = ''
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                        firstValue = displayedNum
                        secondValue = calculator.dataset.modValue
                    }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }

        if (action === 'pressifsad') {
            alert('Javascript is tough, but so are you. You can do this!')
        }
    }
})

const calculate = (firstValue, operator, secondValue) => {
    const firstNum = parseFloat(firstValue)
    const secondNum = parseFloat(secondValue)
    if (operator === 'add') return firstNum + secondNum
    if (operator === 'subtract') return firstNum - secondNum
    if (operator === 'multiply') return firstNum * secondNum
    if (operator === 'divide') return firstNum / secondNum
}