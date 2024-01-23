import React from "react";

export default function Options({ options, dispatch, answer, question }) {
  const answered = answer !== null;
  return (
    <div className="options">
      {options.map((options, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answered}
            key={options}
            onClick={() => dispatch({ type: "answered", payload: index })}
          >
            {options}
          </button>
        );
      })}
    </div>
  );
}
