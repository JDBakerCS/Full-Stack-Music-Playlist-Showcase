import { useEffect, useState} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
const API_URL = "http://localhost:6969";


function PlaylistPage() {





    async function loadPlaylists() {

        const [playlists, setPlaylists] = useState([])

        try {
            const res = await fetch(`${API_URL}/playlists`)
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`)
            }
            const data = await res.json();

            setPlaylists(data)
        } catch (error) {
            console.error("Failed to load quotes:", error)
        }
    }
    useEffect(() => {
        loadPlaylists();
    }, [])

    return <h1>Playlist Page</h1>;
  
}

export default PlaylistPage;