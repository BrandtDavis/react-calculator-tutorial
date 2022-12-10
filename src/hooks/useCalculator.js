import { useReducer } from "react";
import { evaluate } from '../helpers/evaluate'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

export const useCalculator = () => {
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
            // Squared
            if (state.previousOperand == null && payload.operation == "x\u00B2") {
                return {
                  ...state, 
                  previousOperand: state.currentOperand ** 2,
                  operation: null, 
                  currentOperand: null,
                }
            }
            // Square root
            if (state.previousOperand == null && payload.operation == "\u221A") {
              return {
                ...state, 
                previousOperand: Math.sqrt(state.currentOperand),
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

            let formattedPayload = 
                (['+', '-', '*', '\u00F7'].includes(payload.operation)) 
                ? payload.operation 
                : null
            return {
              ...state,
              previousOperand: evaluate(state, payload.operation),
              operation: formattedPayload,
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
              currentOperand:  evaluate(state, null),
              operation: null
            }
          default:
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                currentOperand:  "Err",
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

