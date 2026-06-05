export default function ToastMessage({ message, type = "info" }) {
  if (!message) return null;

  const alertClass =
    type === "error"
      ? "alert-error"
      : type === "success"
        ? "alert-success"
        : "alert-info";

  return (
    <div className="toast toast-top toast-center z-50">
      <div className={`alert ${alertClass} max-w-sm shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  );
}
