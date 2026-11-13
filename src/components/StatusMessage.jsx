function StatusMessage({ type = "info", message, onRetry }) {
  const getIcon = () => {
    switch (type) {
      case "loading":
        return "⏳";
      case "error":
        return "⚠️";
      case "empty":
        return "🍽️";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={`status-message status-message--${type}`}>
      <span className="status-message__icon" aria-hidden="true">
        {getIcon()}
      </span>
      <p className="status-message__text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--outline status-message__retry" onClick={onRetry}>
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export default StatusMessage;

