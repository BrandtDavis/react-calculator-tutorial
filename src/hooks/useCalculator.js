import { useReducer } from "react";
import { evaluate } from '../helpers/evaluate'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

const useCalculator = () => {
    const [ { currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

    function reducer(state, { type, payload }) {
        switch(type) {
          case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
              return {
                ...state,
                currentOperand: payload.digit,
                overwrite: false
              }
            }
            if (payload.digit === "0" && state.currentOperand === "0"){
              return state;
            } 
            if (payload.digit === "." && state.currentOperand.includes(".")) {
              return state;
            }
            return {
              ...state,
              currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
          case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null){
              return state
            }
            if (state.currentOperand == null) {
              return {
                ...state,
                operation: payload.operation
              }
            }
            if (state.previousOperand == null && payload.operation == "%") {
              return {
                ...state, 
                previousOperand: state.currentOperand / 100,
                operation: null, 
                currentOperand: null,
              }
            }
            if (state.previousOperand == null && payload.operation == "\u221A") {
              return {
                ...state, 
                previousOperand: Math.sqrt(state.current),
                operation: null, 
                currentOperand: null,
              }
            }
            if (state.previousOperand == null) {
              return {
                ...state, 
                operation: payload.operation, 
                previousOperand: state.currentOperand,
                currentOperand: null,
              }
            }
            return {
              ...state,
              previousOperand: evaluate(state),
              operation: payload.operation,
              currentOperand: null
            }
          case ACTIONS.CLEAR:
            return {}
          case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
              return {
                ...state,
                overwrite: false,
                currentOperand: null
              }
            }
            if (state.currentOperand == null) {
              return state
            }
            if (state.currentOperand.length === 1) {
              return {
                ...state,
                currentOperand: null
              }
            }
      
            return {
              ...state,
              currentOperand: state.currentOperand.slice(0, -1)
            }
          case ACTIONS.EVALUATE:
            if (
              state.operation == null ||
              state.currentOperand == null ||
              state.previousOperand == null
            ) {
              return state
            }
            return {
              ...state,
              overwrite: true,
              previousOperand: null,
              currentOperand:  evaluate(state),
              operation: null
            }
        }
    }

    return {
        currentOperand,
        previousOperand,
        operation, 
        dispatch
    }
};

export default useCalculator;