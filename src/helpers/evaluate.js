export function evaluate({ currentOperand, previousOperand, operation}, payOp) {
    const current = parseFloat(currentOperand)
    const prev = parseFloat(previousOperand)
  
    console.log("Payload: " + payOp)
    console.log("Operation: " + operation)

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

    switch(payOp){
        case '%':
            return computation / 100
        default:
            return computation
    }

    return computation
}