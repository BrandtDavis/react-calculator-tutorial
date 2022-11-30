import useCalculator from "../hooks/useCalculator";
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import './styles.css'

export default function Calculator({ currentOperand, previousOperand, operation, dispatch }) {
 return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
          <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR }) }>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <OperationButton operation={'\u00F7'} dispatch={dispatch} />
      <OperationButton operation="%" dispatch={dispatch} />

      
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <OperationButton operation={'x\u00B2'} dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <OperationButton operation={'\u221A'} dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <OperationButton operation="MOD" dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button 
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE})}
      >
        =
      </button>
      <DigitButton digit="Hide" dispatch={dispatch} />
    </div>
  );
}