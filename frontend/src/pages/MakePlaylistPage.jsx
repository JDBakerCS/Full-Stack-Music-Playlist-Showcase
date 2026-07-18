import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;



function MakePlaylistPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [songs, setSongs] = useState([])
    const [selectedSongIds, setSelectedSongIds] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate();


    useEffect(() => {
        async function loadSongs() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`${API_URL}/songs`)
                if (!res.ok) throw new Error("Fail to load songs");

                const data = await res.json();
                setSongs(data)

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        loadSongs()
    }, [])

    function toggleSongToPlaylist(songId) {

        setSelectedSongIds((prev) => {

            if (prev.includes(songId)) {

                return prev.filter((id) => id !== songId)
            }
            return [...prev, songId]
        })
    }

    async function makePlaylist(event) {
        event.preventDefault();

        if (!name.trim()) {
            setError("Name your creation")
            return;
        }
        setError("")
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                }),
            });

            if (!res.ok) {
                throw new Error(`Server error ${res.status}`)
            }

            const newPlaylist = await res.json();

            await Promise.all(
                selectedSongIds.map((songId) =>
                    fetch(`${API_URL}/playlists/${newPlaylist.id}/songs`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ songId }),
                    })
                )
            );

            navigate("/playlists");

            console.log(newPlaylist)
        } catch (error) {
            console.error(error)
            setError("failed to create playlist")
        } finally {
            setLoading(false);
        }
    }



    return (
        <main className="makePlaylistPage">
            <nav className="makePlaylistNav">
                <Link to="/">Home</Link>
            </nav>
            <nav><Link to="/playlists">Active Playlists</Link>
            </nav>
            <h1>Pick Your Favorites For a Custom Playlist</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="pageMessage">{error}</p>}

            <section className="makePlaylistLayout">
                <section className="songCatalog">
                    {songs.map((song) => {
                        const isSelected = selectedSongIds.includes(song.id);

                        return (
                            <article key={song.id} className="songWidgetCard">
                                <div className="songWidgetMeta">
                                    <h2>{song.title}</h2>
                                    <p>{song.artist}</p>
                                </div>
                                <section>
                                    <div className="homePlayerFrameWrap">
                                        <iframe
                                            className="songWidgetFrame"
                                            width="100%"
                                            height="140"
                                            scrolling="no"
                                            frameBorder="no"
                                            src={song.songUrl}
                                            style={{ width: "0px", minWidth: "100%", maxWidth: "100%" }}
                                            title={song.title}
                                        ></iframe>
                                    </div>
                                </section>
                                <button
                                    className="songToggleButton"
                                    type="button"
                                    onClick={() => toggleSongToPlaylist(song.id)}
                                >
                                    {isSelected ? "Remove" : "Add"}
                                </button>
                            </article>
                        );
                    })}
                </section>

                <aside className="playlistFormPanel">
                    <form onSubmit={makePlaylist} className="playlistForm">
                        <input
                            type="text"
                            placeholder="Playlist name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <p>{selectedSongIds.length} song(s) selected</p>

                        <button type="submit">Create Playlist</button>
                    </form>
                </aside>
            </section>
        </main>
    );
}


export default MakePlaylistPage;
