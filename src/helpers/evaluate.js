export function evaluate({ currentOperand, previousOperand, operation }) {
    const current = parseFloat(currentOperand)
    const prev = parseFloat(previousOperand)
  
    if (isNaN(prev) || isNaN(current)){
      return ""
    }
    let computation = ""
    switch(operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break    
      case "\u00F7":
        computation = prev / current
        break
      case "MOD":
        computation = prev % current
        break
    }  
    return computation
}