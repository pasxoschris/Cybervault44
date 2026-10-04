const CANCEL_ICON_SRC = "https://media.base44.com/images/public/6a06d65e120e7e74497bab7a/e3880ed3d_image.png";

export function CancelActionIcon({ size = 24, className = "" }) {
  return (
    <img
      src={CANCEL_ICON_SRC}
      alt="Εικονίδιο ακύρωσης προϊόντος"
      style={{ width: size, height: size }}
      className={`inline-block align-middle ${className}`}
    />
  );
}

export default function CancelActionButton({ size = 40, label = "Κουμπί ακύρωσης στο κάτω μενού" }) {
  return (
    <div className="flex items-center gap-3">
      <CancelActionIcon size={size} />
      {label && (
        <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          {label}
        </span>
      )}
    </div>
  );
}