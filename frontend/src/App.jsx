import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AcademyDashboard from "./pages/AcademyDashboard";
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/academy"
  element={
    <ProtectedRoute>
      <AcademyDashboard />
    </ProtectedRoute>
  }
/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
