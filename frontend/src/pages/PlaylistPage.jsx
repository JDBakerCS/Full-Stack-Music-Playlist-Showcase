import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:6969";


function PlaylistPage() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openPlaylistId, setOpenPlaylistId] = useState(null);
    const [playlistDetails, setPlaylistDetails] = useState({});


    useEffect(() => {
        async function loadPlaylists() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API_URL}/playlists`);
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }

                const data = await res.json();
                setPlaylists(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadPlaylists();
    }, []);

    async function togglePlaylist(playlistId) {
        if (openPlaylistId === playlistId) {
            setOpenPlaylistId(null);
            return;
        }
        setOpenPlaylistId(playlistId);

        if (playlistDetails[playlistId]) {
            return;
        }
        try {
            const res = await fetch(`${API_URL}/playlists/${playlistId}`);

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();

            setPlaylistDetails((prev) => ({
                ...prev,
                [playlistId]: data,
            }));
        } catch (error) {
            console.error("Failed to load playlist details:", error);
            setError(error.message);
        }
    }

    async function deletePlaylist(playlistId) {
        const confirmed = window.confirm("Delete this playlist?");
        const confirmed2 = window.confirm("Are you sure? Alrighty then");

        if (!confirmed) {
            return;
        }

        if (!confirmed2) {
            return;
        }

        try {
            const res = await fetch(`${API_URL}/playlists/${playlistId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }

            setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
            setPlaylistDetails((prev) => {
                const next = { ...prev };
                delete next[playlistId];
                return next;
            });

            if (openPlaylistId === playlistId) {
                setOpenPlaylistId(null);
            }
        } catch (error) {
            console.error("Failed to delete playlist:", error);
            setError(error.message);
        }
    }

    if (loading) return <p>Patience is a virtue...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className="playlistPage">
            <nav className="playlistNav">
                <Link className="homeActionLink" to="/">Home</Link>
                <Link className="homeActionLink" to="/playlists/new">Make a Playlist</Link>
            </nav>

            <section className="playlistPageHeader">
                <h1>Playlists</h1>
            </section>

            <section className="playlistGrid">
                {playlists.length === 0 ? (
                    <p className="playlistEmptyState">No playlists yet.</p>
                ) : (
                    playlists.map((playlist) => {
                        const isOpen = openPlaylistId === playlist.id;
                        const fullPlaylist = playlistDetails[playlist.id];

                        return (
                            <article key={playlist.id} className="playlistCard">
                                <div className="playlistCardMeta">
                                    <h2>{playlist.name}</h2>
                                    <p>{playlist.description || "No description yet."}</p>
                                </div>

                                <div className="playlistActionRow">
                                    <button
                                        className="playlistToggleButton"
                                        type="button"
                                        onClick={() => togglePlaylist(playlist.id)}
                                    >
                                        {isOpen ? "Hide Playlist" : "Load Playlist"}
                                    </button>

                                    <button
                                        className="playlistDeleteButton"
                                        type="button"
                                        onClick={() => deletePlaylist(playlist.id)}
                                    >
                                        Delete Playlist
                                    </button>
                                </div>

                                {isOpen && (
                                    <section className="playlistDropdown">
                                        {!fullPlaylist ? (
                                            <p className="playlistLoadingState">Loading playlist...</p>
                                        ) : fullPlaylist.Songs?.length ? (
                                            fullPlaylist.Songs.map((song) => (
                                                <article key={song.id} className="playlistSongCard">
                                                    <div className="playlistSongMeta">
                                                        <h3>{song.title}</h3>
                                                        <p>{song.artist}</p>
                                                    </div>

                                                    <div className="playlistSongFrameWrap">
                                                        <iframe
                                                            className="playlistSongFrame"
                                                            width="100%"
                                                            height="140"
                                                            scrolling="no"
                                                            frameBorder="no"
                                                            src={song.songUrl}
                                                            style={{ width: "0px", minWidth: "100%", maxWidth: "100%" }}
                                                            title={song.title}
                                                        ></iframe>
                                                    </div>
                                                </article>
                                            ))
                                        ) : (
                                            <p className="playlistEmptyState">This playlist is empty right now.</p>
                                        )}
                                    </section>
                                )}
                            </article>
                        );
                    })
                )}
            </section>
        </main>
    );
}
export default PlaylistPage;
