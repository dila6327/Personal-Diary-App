import { useEffect, useState } from "react";
import API from "../api";
import EntryCard from "./EntryCrt";

const Diary = () => {
  const [note, setNote] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [voice, setVoice] = useState<File | null>(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await API.get("/entries");
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const submit = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("note", note);
    form.append("date", new Date().toISOString().slice(0, 10));
    if (image) form.append("image", image);
    if (voice) form.append("voice", voice);

    try {
      await API.post("/entries", form);
      setNote("");
      setImage(null);
      setVoice(null);
      await fetchEntries();
    } catch (error) {
      console.error("❌ Error submitting entry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>My Diary</h2>

      <textarea
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your day..."
        value={note}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setVoice(e.target.files?.[0] || null)}
      />

      <button onClick={submit} className="btn" disabled={loading}>
        {loading ? "Saving..." : "Save Entry"}
      </button>

      {loading && (
        <>
          <div className="spinner" />
          <p style={{ textAlign: "center", color: "#d63384" }}>
            Please wait... analyzing your entry 🧠
          </p>
        </>
      )}

      <hr />

      {entries.length > 0 ? (
        entries.map((entry: any) => <EntryCard key={entry._id} entry={entry} />)
      ) : (
        <p style={{ textAlign: "center", color: "#888", marginTop: "30px" }}>
          No entries yet. Write your first memory!
        </p>
      )}
    </div>
  );
};

export default Diary;
