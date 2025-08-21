import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Navigation />
      <Routes>
                <Route path="/" element={<ShowCreators />} />
        <Route path="/show-creators" element={<ShowCreators />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/edit-creator/:id" element={<EditCreator />} />
        <Route path="/view-creator/:id" element={<ViewCreator />} />
      </Routes>
    </div>
  );
}

export default App;
