export default function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: size * 2 }}>
      <div
        className="border-2 border-edge border-t-neon rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
