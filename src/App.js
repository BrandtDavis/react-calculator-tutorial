import Calculator from './components/Calculator'
import './styles.css'

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) {
    return 
  }
  const [integer, decimal] = operand.split(".")
  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  // const { currentOperand, previousOperand, operation, dispatch } = useCalculator()

  return (
<Calculator />
  );
}

export default App;
