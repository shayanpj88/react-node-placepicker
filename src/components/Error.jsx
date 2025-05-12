export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confermation-actions">
          <button onClick={onConfirm} className="button">
            OK
          </button>
        </div>
      )}
    </div>
  );
}
