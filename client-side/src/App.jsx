import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Navbar from "./components/Nav";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateRecipe from "./pages/CreateRecipe";
import BrowseRecipes from "./pages/browseRecipes";

export default function App() {
  return (
    <AuthProvider>          {/* ← outermost */}
      <BrowserRouter>
        <Navbar />          {/* ← inside AuthProvider ✓ */}
        <Routes>
          <Route path="/" element={<BrowseRecipes />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}