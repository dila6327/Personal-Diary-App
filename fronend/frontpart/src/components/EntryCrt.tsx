const EntryCard = ({ entry }: { entry: any }) => {
  return (
    <div className="entry-card">
      <p className="entry-date fade-in">{entry.date}</p>

      {entry.note && <p className="entry-note fade-in">📝 {entry.note}</p>}

      {entry.mood && (
        <p className="entry-mood fade-in">
          <strong>Mood:</strong> <span>{entry.mood}</span>
        </p>
      )}

      {entry.recommendations && (
        <div className="entry-recommendations fade-in">
          <strong>Suggestions:</strong>
          <ul>
            {entry.recommendations
              .split("- ")
              .filter((line: string) => line.trim())
              .map((line: string, index: number) => (
                <li key={index}>{line.trim()}</li>
              ))}
          </ul>
        </div>
      )}

      {entry.image && (
        <img
          src={`http://localhost:5000/uploads/${entry.image}`}
          alt="entry"
          className="entry-image fade-in"
        />
      )}

      {entry.voice && (
        <audio controls className="entry-audio fade-in">
          <source src={`http://localhost:5000/uploads/${entry.voice}`} />
        </audio>
      )}
    </div>
  );
};

export default EntryCard;
