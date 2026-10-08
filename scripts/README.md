# Instalación

## 1. Skill
Copiar la carpeta `roles-architect/` a:
- Global: `~/.claude/skills/roles-architect/` (todos los proyectos)
- Proyecto: `.claude/skills/roles-architect/`

## 2. Hook (archivos nuevos → roles)
Copiar `new-file-hook.mjs` junto a la skill y añadir en `settings.json` (global o `.claude/settings.json`):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "node C:/Users/scarv/.claude/skills/roles-architect/scripts/new-file-hook.mjs" }
        ]
      }
    ]
  }
}
```

El hook es silencioso salvo que: se creó (no sobrescribió) un archivo, y `CLAUDE.md` tiene el bloque `<!-- roles:begin -->`.

## 3. Uso
- `/roles-architect` — analiza y genera roles (pide confirmación antes de escribir).
- `/roles-architect add <ruta>` — registra un archivo nuevo.
- `/roles-architect audit` — detecta desfases entre bloque y árbol real.

## Prueba rápida del hook
```
echo {"cwd":"C:/Users/scarv/Desktop/IHouse","tool_input":{"file_path":"C:/Users/scarv/Desktop/IHouse/web/src/x.ts"},"tool_response":{"type":"create"}} | node new-file-hook.mjs
```
(Solo imprime algo si `CLAUDE.md` ya contiene los marcadores.)
