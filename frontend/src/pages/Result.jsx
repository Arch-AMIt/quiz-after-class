import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  return (
    <div className="container result-box">
    <h2>Quiz Completed</h2>
    <div className="score">
      {state.score} / {state.total}
    </div>
  </div>
  );
}
