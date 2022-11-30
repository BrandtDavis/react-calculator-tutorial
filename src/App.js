import Calculator from './components/Calculator'
import './styles.css'

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function App() {
  return (
<Calculator />
  );
}

export default App;
