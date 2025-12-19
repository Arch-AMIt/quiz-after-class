import { useState } from "react";
import { createQuiz } from "../api";

export default function Faculty() {
  const [form, setForm] = useState({ subject: "", topic: "", difficulty: "Easy" });
  const [link, setLink] = useState("");

  const generate = async () => {
    const res = await createQuiz(form);
    setLink(`http://localhost:5173/quiz/${res.quizId}`);
  };

  return (
    <div className = "container">
      <h2>Create Quiz</h2>
      <input placeholder="Subject" onChange={e => setForm({ ...form, subject: e.target.value })} />
      <input placeholder="Topic" onChange={e => setForm({ ...form, topic: e.target.value })} />
      <select onChange={e => setForm({ ...form, difficulty: e.target.value })}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button onClick={generate}>Generate</button>
      {link && <p>Share: {link}</p>}
    </div>
  );
}
