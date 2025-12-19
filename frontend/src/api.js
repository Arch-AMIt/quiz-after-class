const BASE = "http://localhost:5000/api";

export const createQuiz = (data) =>
  fetch(`${BASE}/quiz`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const getQuiz = (id) =>
  fetch(`${BASE}/quiz/${id}`).then(res => res.json());

export const submitQuiz = (id, answers) =>
  fetch(`${BASE}/quiz/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  }).then(res => res.json());
