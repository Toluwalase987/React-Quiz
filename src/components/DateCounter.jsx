import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch(action.type){
    case "increase":
    return {...state, count: state.count + action.payload};
    case "decrease":
      return {...state, count: state.count - action.payload};
    case "setCount":
      return {...state, count: action.payload};
    case "reset":
      return {count: 0, step: 1} 
    case "setStep":
      return {...state, step: state.count + action.payload}

    default:
      throw new Error("Unknown Action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {count, step} = state

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({
      type: "decrease",
      payload: step,
    });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({
      type: "increase",
      payload: step,
    });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({
      type: "setCount",
      payload: Number(e.target.value),
    });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({
      type: "setStep",
      payload: (Number(e.target.value))
    })
  };

  const reset = function () {
    dispatch({
      type: "reset",
    });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;