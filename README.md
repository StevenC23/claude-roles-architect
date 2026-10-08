# claude-roles-architect

Skill de Claude Code que analiza la arquitectura de un proyecto y genera en `CLAUDE.md` los **roles de trabajo** (modos temporales de un solo Claude): qué archivos ve, modifica y nunca toca cada rol, contratos entre capas, excluidos por defecto y modo/modelo/`/effort` sugerido. Un hook opcional registra los archivos nuevos en el rol que los necesita.

## Instalar

```powershell
git clone https://github.com/StevenC23/claude-roles-architect $HOME\.claude\skills\roles-architect
```

Reinicia Claude Code. Hook opcional (archivos nuevos): ver [scripts/README.md](scripts/README.md).

## Uso

- `/roles-architect` — analiza el proyecto, propone roles y pide confirmación antes de escribir.
- `/roles-architect add <ruta>` — registra un archivo nuevo en su rol.
- `/roles-architect audit` — detecta desfases entre el bloque de roles y el árbol real.

Solo edita entre `<!-- roles:begin -->` y `<!-- roles:end -->` en `CLAUDE.md`.
