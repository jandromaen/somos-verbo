type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Inserta datos estructurados escapando `<` para que no se pueda cerrar el script. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
