/**
 * Datos de negocio de Somos Verbo (CLAUDE.md, sección 12).
 *
 * Todo dato que falte va como `null`: la web lo muestra como [PENDIENTE]
 * y `npm run check:pendientes` lo lista y bloquea el paso a producción.
 * Nunca rellenes un campo con un valor inventado.
 */

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Color = {
  slug: string;
  nombre: string;
  hex: string;
};

export type ShippingZone = 'ES-peninsula' | 'ES-baleares';

export type Tienda = {
  nombre: string;
  dominio: string;
  emailContacto: string | null;
  titular: {
    nombre: string | null;
    nif: string | null;
    domicilio: string | null;
    /** Datos registrales si es sociedad. Si no aplica, cadena vacía `''`. */
    registro: string | null;
  };
  precios: {
    sudaderaCentimos: number | null;
    camisetaCentimos: number | null;
  };
  producto: {
    gramajeSudadera: string | null;
    gramajeCamiseta: string | null;
    composicion: string | null;
    tecnica: string | null;
    origen: string | null;
    /** Pendiente del proveedor: una lista vacía cuenta como pendiente. */
    colores: Color[];
    tallas: Size[];
    /** Tabla de medidas por talla (se definirá su forma al tener los datos). */
    medidas: Record<Size, Record<string, number>> | null;
    cuidados: string | null;
  };
  envio: {
    zonas: ShippingZone[];
    tarifaCentimos: number | null;
    gratisDesdeCentimos: number | null;
    plazoDiasLaborables: string | null;
  };
  /** Mínimo legal: 14 días naturales. */
  devoluciones: { dias: number | null };
  creditoBiblia: string;
};

export const tienda: Tienda = {
  nombre: 'Somos Verbo',
  dominio: 'somosverbo.es',
  emailContacto: null,
  titular: {
    nombre: null,
    nif: null,
    domicilio: null,
    registro: null,
  },
  precios: {
    sudaderaCentimos: 5000,
    camisetaCentimos: null,
  },
  producto: {
    gramajeSudadera: null,
    gramajeCamiseta: null,
    composicion: null,
    tecnica: null,
    origen: null,
    colores: [],
    tallas: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    medidas: null,
    cuidados: null,
  },
  envio: {
    zonas: ['ES-peninsula', 'ES-baleares'],
    tarifaCentimos: null,
    gratisDesdeCentimos: null,
    plazoDiasLaborables: null,
  },
  devoluciones: { dias: null },
  creditoBiblia:
    'Textos bíblicos: Reina-Valera 1960 © Sociedades Bíblicas en América Latina, 1960. Renovado © Sociedades Bíblicas Unidas, 1988.',
};
