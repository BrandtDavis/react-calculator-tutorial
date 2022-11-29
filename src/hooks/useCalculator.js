import { useReducer } from "react";

const useCalculator = () => {
    const [
        { currentOperand, previousOperand, operation }, 
        dispatch
    ] = useReducer(reducer, {});

    return {

    }
};

export default useCalculator;