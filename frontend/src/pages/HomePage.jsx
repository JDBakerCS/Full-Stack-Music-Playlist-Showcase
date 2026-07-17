import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import venmoQr from "../assets/VenmoQR.png";

const API_URL = "http://localhost:6969";



function HomePage() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadSongs() {
        try {
            setLoading(true);
            setError("");

            const res = await fetch(`${API_URL}/songs`);

            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();

            setSongs(data);
        } catch (error) {
            console.error("Failed to load songs.");
            setError("Could not load the catalog count.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSongs();
    }, []);

    return (
        <main className="homePage">
            <nav className="homeNav">
                <Link className="homeActionLink" to="/playlists/new">Make a
                    Playlist</Link>
                <Link className="homeActionLink" to="/playlists">Active Playlists
                </Link>
            </nav>

            <section className="homeLayout">
                <section className="homeMainColumn">
                    <article className="homeHeroCard">
                        <p className="homeEyebrow">Music Showcase</p>
                        <h1 className="homeTitle">
                            This is the Music of James Dalton Baker
                        </h1>
                        <p className="homeIntro">
                            Listen to the full catalog, then build your own playlist from the songs
                            that hit hardest. If one track deserves repeat status, give it a home of
                            its own.  <br/><br/><em>*Adding one song multiple times coming soon*</em>
                        </p>

                        <div className="homePlayerCard">
                            <div className="homePlayerFrameWrap">
                                <iframe
                                    width="60%"
                                    height="265"
                                    scrolling="no"
                                    frameBorder="no"
                                    src="https://www.reverbnation.com/widget_code/html_widget/artist_943083?widget_id=55&pwc[included_songs]=1&context_type=page_object&pwc[size]=small"
                                    style={{ width: "0px", minWidth: "100%", maxWidth: "100%" }}
                                    title="ReverbNation player"
                                ></iframe>
                            </div>
                        </div>

                        <p className="homeMeta">
                            {loading
                                ? "Loading catalog..."
                                : error
                                    ? error
                                    : `${songs.length} songs are live in the catalog. Scroll on the widget for full list`}
                        </p>
                    </article>
                </section>

                <aside className="homeSidebar">
                    <section className="supportCard">
                        <h2>Support the Artist</h2>
                        <p>If you enjoyed the music, you can tip me on Venmo.</p>
                        <a
                            className="homeActionLink"
                            href="https://www.venmo.com/u/Jamesdaltonbaker"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open Venmo
                        </a>

                        <figure className="qrCodeWrap">
                            <img className="venmoQrImage" src={venmoQr} alt="Venmo QR code" />
                        </figure>
                    </section>
                </aside>
            </section>
        </main>
    );
}
export default HomePage;
