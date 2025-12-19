import { BrowserRouter, Routes, Route } from "react-router-dom";
import Faculty from "./pages/Faculty";
import Student from "./pages/Student";
import Result from "./pages/Result";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Faculty />} />
        <Route path="/quiz/:id" element={<Student />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
