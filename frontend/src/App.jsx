import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MakePlaylistPage from "./pages/MakePlaylistPage"
import PlaylistPage from "./pages/PlaylistPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/playlists/new" element={<MakePlaylistPage />} />
      <Route path="/playlists/:id" element={<PlaylistPage />} />
    </Routes>
  )
}


export default App;