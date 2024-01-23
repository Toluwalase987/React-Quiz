import React, { useEffect, useReducer } from "react";
import Header from "./components/Header";
import MainBody from "./components/MainBody";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", secondsRemaining: state.questions.length * 30 };
    case "answered":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        status: "ready",
        secondsRemaining: 10
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };
    default:
      throw new Error("Error, Action Unknown");
  }
};
export default function App() {
  const [
    { status, questions, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const numPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    const questionsData = async () => {
      try {
        const data = await fetch("http://localhost:8000/questions");
        const response = await data.json();
        dispatch({
          type: "dataReceived",
          payload: response,
        });
      } catch (error) {
        dispatch({
          type: "dataFailed",
        });
      }
    };
    questionsData();
  }, []);
  return (
    <div className="app">
      <Header />
      <MainBody>
        <div>{status === "loading" && <Loader />}</div>
        <div>{status === "error" && <Error />}</div>
        <div>
          {status === "ready" && (
            <StartScreen number={numQuestions} dispatch={dispatch} />
          )}
        </div>
        <div>
          {status === "active" && (
            <>
              <Progress
                numQuestions={numQuestions}
                answer={answer}
                index={index}
                points={points}
                numPoints={numPoints}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
                points={points}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestions}
              />
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              dispatch={dispatch}
              numPoints={numPoints}
              highscore={highscore}
            />
          )}
        </div>
      </MainBody>
    </div>
  );
}
