import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = "http://localhost:6969/"

function App() {
const [playlists, setPlaylists]



async function loadPlaylists()  {
  try {
    const res = await fetch(`${API_URL}/playlists`)
    if (!res.ok) {
      throw new Error(`Server error: ${res.statsu}`)
    }
    const data = await res.json();

    setPlaylists(data) 
  } catch (error) {
    console.error("Failed to load quotes:" , error)
  }
}

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/playlists/:id" element={<PlaylistPage />} />
    </Routes>
  )
}


export default App;