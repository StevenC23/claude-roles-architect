// Hook PostToolUse (matcher: Write). Si se creó un archivo nuevo y el proyecto
// tiene bloque de roles, avisa a Claude para que lo registre (Modo B).
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

let input = '';
process.stdin.on('data', (d) => (input += d));
process.stdin.on('end', () => {
  try {
    const ev = JSON.parse(input);
    const file = ev.tool_input?.file_path;
    const created = ev.tool_response?.type === 'create';
    if (!file || !created) return;

    const root = ev.cwd || process.cwd();
    const claudeMd = join(root, 'CLAUDE.md');
    if (!existsSync(claudeMd)) return;
    if (!readFileSync(claudeMd, 'utf8').includes('<!-- roles:begin -->')) return;

    const rel = relative(root, file).replaceAll('\\', '/');
    if (rel.startsWith('..') || /(^|\/)(node_modules|dist|build|\.git|cdk\.out)\//.test(rel)) return;
    if (rel === 'CLAUDE.md') return;

    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PostToolUse',
          additionalContext: `Archivo nuevo: ${rel}. Ejecuta /roles-architect add ${rel} (Modo B): registra en el bloque de roles solo si no lo cubre un patrón existente.`,
        },
      })
    );
  } catch {
    /* el hook nunca debe bloquear */
  }
});
