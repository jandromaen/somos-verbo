type PhotoPlaceholderProps = {
  className?: string;
};

/** Hueco 4:5 mientras no haya fotos reales. Nunca imágenes de stock ni generadas. */
export function PhotoPlaceholder({ className = '' }: PhotoPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label="Foto pendiente"
      className={`flex aspect-[4/5] items-center justify-center bg-placeholder text-small text-muted ${className}`}
    >
      Foto pendiente
    </div>
  );
}
