import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:6969";



function HomePage() {
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    async function loadSongs() {
        try {
            setLoading(true);
            setError("")

            const res = await fetch(`${API_URL}/songs`);

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`)
            }
            const data = await res.json();

            setSongs(data);
        } catch (error) {
            console.error("Failed to load songs.")
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadSongs();
    }, [])

    return (
        <main>
            <h1>My Music Showcase</h1>
            <p>Listen to the full catalog and build your own playlist.</p>

            <nav>
                <Link to="/playlists/new">Make a Playlist</Link>
            </nav>

            <section>
                <iframe
                    width="60%"
                    height="265"
                    scrolling="no"
                    frameBorder="no"
                    src="https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[included_songs]=1&context_type=page_object&pwc[size]=small"
                    style={{ width: "0px", minWidth: "100%", maxWidth: "100%" }}
                    title="ReverbNation player"
                ></iframe>
            </section>
        </main>
    );
}
    export default HomePage;
