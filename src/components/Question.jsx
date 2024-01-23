import React from "react";
import Options from "./Options";

export default function Question({ question, answer, dispatch, points }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question.options} question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
