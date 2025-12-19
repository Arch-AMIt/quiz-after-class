import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuiz, submitQuiz } from "../api";

export default function Student() {
  const { id } = useParams();
  const nav = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuiz(id).then(data => setQuiz(data.questions));
  }, []);

  const submit = async () => {
    const res = await submitQuiz(id, answers);
    nav("/result", { state: res });
  };

  return (
    <div className="container">
      {quiz.map((q, i) => (
        <div className="question-card" key={i}>
          <p>{q.question}</p>
          {q.options.map(o => (
            <label className="option" key={o}>
              <input type="radio" name={`question-${i}`} onChange={() => {
                const copy = [...answers];
                copy[i] = o;
                setAnswers(copy);
              }} />
              <span className="option-text">{o} </span>
            </label>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}
