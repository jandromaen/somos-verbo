/**
 * Lista los datos de negocio sin rellenar en src/config/tienda.ts.
 * Sale con error si hay alguno: bloquea el despliegue a producción.
 */
import { tienda } from '../src/config/tienda';
import { findPendingFields } from '../src/lib/pending';

const pending = findPendingFields(tienda);

if (pending.length === 0) {
  console.log('✔ tienda.ts: no queda ningún dato pendiente.');
} else {
  console.error(`✖ tienda.ts: ${pending.length} datos pendientes:\n`);
  for (const field of pending) console.error(`  - ${field}`);
  console.error('\nRellénalos antes de pasar a producción.');
  process.exit(1);
}
