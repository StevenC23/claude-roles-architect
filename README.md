# 🧭 claude-roles-architect

> Skill de **Claude Code** que lee la arquitectura de tu proyecto y genera, dentro de `CLAUDE.md`, los **roles de trabajo** que Claude adopta como modos temporales: qué archivos ve, cuáles modifica y cuáles nunca toca.

Un solo Claude, un solo contexto: los roles **no son subagentes**, solo cambian qué reglas aplica en cada tarea.

---

## ✨ Qué hace

| | Función | Detalle |
|---|---|---|
| 🔍 | **Analiza el proyecto** | Detecta capas (web, api, infra, firmware, docs…) leyendo el árbol, manifiestos y README, sin abrir código innecesario |
| 🎭 | **Genera los roles** | Un rol por capa + transversales (ORQUESTADOR, ARQUITECTO, SEGURIDAD, DOCUMENTADOR), cada uno con perfil, checklist y comando de validación |
| 📂 | **Define qué ve cada rol** | `Lee`, `Ocasional`, `Modifica`, `Nunca modifica` |
| 🚫 | **Marca exclusiones** | Archivos *generados*, *sensibles* (secretos, certificados, `.env`) e *históricos*; los sensibles se clasifican por nombre, nunca se leen |
| 🔗 | **Mapea contratos** | Formatos/APIs/esquemas compartidos entre capas: si cambia uno, se revisan ambos lados |
| ⚡ | **Modo, modelo y `/effort`** | Tabla FAST / STANDARD / DEEP con modelo y esfuerzo sugeridos para ahorrar tokens |
| 🆕 | **Registra archivos nuevos** | Un hook avisa al crear un archivo y la skill lo asigna al rol que lo necesita |
| 🩺 | **Audita** | Detecta rutas que ya no existen, carpetas sin rol y roles vacíos |

---

## 📦 Instalación

### 1️⃣ Skill

**Windows (PowerShell)**
```powershell
git clone https://github.com/StevenC23/claude-roles-architect $HOME\.claude\skills\roles-architect
```

**macOS / Linux**
```bash
git clone https://github.com/StevenC23/claude-roles-architect ~/.claude/skills/roles-architect
```

> Para una skill solo de un proyecto, clónala en `<proyecto>/.claude/skills/roles-architect`.

Reinicia Claude Code y escribe `/roles-architect` para comprobar que aparece.

### 2️⃣ Hook de archivos nuevos (opcional 🪝)

Añade en `~/.claude/settings.json` (o `.claude/settings.json` del proyecto):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "node <RUTA>/.claude/skills/roles-architect/scripts/new-file-hook.mjs" }
        ]
      }
    ]
  }
}
```

Reemplaza `<RUTA>` por tu carpeta de usuario (ej. `C:/Users/tu-usuario`). Requiere **Node.js**. Más detalle y prueba del hook en [`scripts/README.md`](scripts/README.md).

---

## 🚀 Uso

| Comando | Qué hace |
|---|---|
| `/roles-architect` | 🧱 Analiza, **propone** los roles y pide confirmación antes de escribir |
| `/roles-architect add <ruta>` | ➕ Registra un archivo nuevo en el rol correspondiente (una línea) |
| `/roles-architect audit` | 🔎 Compara el bloque de roles con el árbol real y propone correcciones |

### 🔄 Flujo típico

1. 🧱 Corres `/roles-architect` una vez por proyecto → se escribe el bloque de roles.
2. 🛠️ Trabajas normal; Claude se anuncia con `[rol: X] · MODO · modelo`.
3. 🪝 Cuando crea un archivo, el hook avisa y la skill lo registra *solo si no lo cubre ya un patrón*.
4. 🩺 De vez en cuando, `/roles-architect audit`.

---

## 📝 Qué se escribe en tu `CLAUDE.md`

Solo entre estos marcadores (**lo de fuera nunca se toca** 🔒):

```markdown
<!-- roles:begin -->
## Roles ...
  ⚡ Modos, modelo y esfuerzo
  🗺️ Mapa de roles (lee / modifica / nunca modifica / valida con)
  🔗 Contratos entre capas
  🚫 Excluidos por defecto
  🎭 Perfiles por rol
<!-- roles:end -->
```

### ⚡ Modos y esfuerzo sugeridos

| Modo | Cuándo | Modelo | `/effort` |
|---|---|---|---|
| 🟢 FAST | textos, valores, bug obvio, búsquedas | haiku | `low` |
| 🟡 STANDARD | features, componentes, endpoints | sonnet | `medium` |
| 🔴 DEEP | arquitectura, seguridad, contratos multicapa | opus | `high` |

Claude **no puede ver ni cambiar** su modelo ni su `/effort`: los recomienda y, si el modelo activo no coincide, se detiene y te lo avisa antes de gastar tokens. Se evita `xhigh`/`max` en planes con límite de uso.

---

## 🧩 Estructura del repo

```
claude-roles-architect/
├── 📄 SKILL.md                  # flujo de la skill: init / add / audit
├── 📁 templates/
│   ├── role.md                  # formato de un rol
│   └── roles-block.md           # bloque completo para CLAUDE.md
└── 📁 scripts/
    ├── new-file-hook.mjs        # hook PostToolUse (archivos nuevos)
    └── README.md                # instalación y prueba del hook
```

---

## ⚠️ Limitaciones

- 🪝 El hook solo detecta archivos creados con **Write**; los creados por `Bash` (ej. `npm create`) se cubren con `/roles-architect audit`.
- ✍️ El hook **no edita** nada: solo avisa a Claude, que aplica el cambio con la skill.
- 🔐 Nunca se leen archivos sensibles para clasificarlos; se decide por nombre y ruta.

## 📜 Licencia

Sin licencia definida todavía: añade un `LICENSE` (p. ej. MIT) si quieres permitir su reutilización.
