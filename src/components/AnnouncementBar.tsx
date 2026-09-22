import { tienda } from '@/config/tienda';
import { formatEuros } from '@/lib/format';
import { orPending } from '@/lib/pending';

export function AnnouncementBar() {
  const freeFrom = orPending(tienda.envio.gratisDesdeCentimos, formatEuros);
  const returnDays = orPending(tienda.devoluciones.dias);

  return (
    <div className="bg-ink text-bg">
      <p className="wrap truncate py-2 text-center text-small font-medium">
        Envío gratis desde {freeFrom} · Devolución en {returnDays} días
      </p>
    </div>
  );
}
