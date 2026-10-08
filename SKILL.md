---
name: roles-architect
description: Analiza la arquitectura del proyecto y genera/actualiza los roles de trabajo (modos temporales) en CLAUDE.md, con qué archivos ve, modifica y nunca toca cada rol. También registra archivos nuevos en el rol que los necesita. Usar con /roles-architect, o cuando el hook avise de un archivo nuevo sin rol asignado.
---

# roles-architect

Un solo Claude, roles = modos temporales (no subagentes). Esta skill mantiene el **mapa de roles** del proyecto dentro de `CLAUDE.md`, entre los marcadores:

```
<!-- roles:begin -->
...
<!-- roles:end -->
```

Todo lo que esté fuera de los marcadores NO se toca.

## Modo A — Generar (`/roles-architect` o `/roles-architect init`)

1. **Inspeccionar con el mínimo de lecturas**: listar el árbol (2 niveles; Glob), leer `package.json`/manifiestos, `README`, `CLAUDE.md` existente. No leer archivos de código completos salvo para detectar un contrato.
2. **Detectar capas** (ej. web, api, infra, firmware, docs, tests, scripts). Cada capa con código propio → candidata a rol. Agrupar capas triviales; no crear roles por relación superficial.
3. **Detectar contratos**: formatos/protocolos/esquemas compartidos entre capas (API ↔ cliente, esquema de BD, mensajes, tipos). Anotar los archivos de ambos lados.
4. **Clasificar archivos** en: generados, sensibles (secretos, certificados, `.env`), históricos/legado, binarios/lockfiles. Son los **excluidos por defecto**; los sensibles además "nunca leer ni mostrar".
5. **Roles transversales** a proponer siempre: ORQUESTADOR (valida integración), ARQUITECTO (diseño/contratos, solo docs), SEGURIDAD (solo lectura), DOCUMENTADOR. Roles de capa: según paso 2.
6. **Proponer antes de escribir**: mostrar tabla corta de roles + excluidos y pedir confirmación (AskUserQuestion o una pregunta). Luego escribir el bloque con `templates/roles-block.md` y cada rol con `templates/role.md`.
7. **Modos/modelo/esfuerzo**: incluir la sección "Modos, modelo y esfuerzo" de `templates/roles-block.md`. Preguntar al usuario su plan (límite de uso vs. pago por token) y los modelos que usa; ajustar la tabla (p. ej. sin haiku/opus si no los usa) y sugerir `/effort` low/medium/high por modo. Si el proyecto ya tiene una tabla de modos, conservarla y solo añadir la columna `/effort`.
8. Verificar: todo directorio de código pertenece a ≥1 rol; ningún archivo sensible aparece en "Lee".

## Modo B — Registrar archivo nuevo (`/roles-architect add <ruta>` o aviso del hook)

1. Leer solo el bloque `roles:begin…end` de `CLAUDE.md` (Grep por marcadores; no el archivo entero).
2. ¿La ruta ya cae bajo algún patrón de "Lee/Modifica/Excluidos"? → no hacer nada y decirlo en una línea.
3. Si no: decidir rol(es) por directorio/tipo; ¿es generado, sensible o contrato nuevo? Añadir **una línea** al rol (o a Excluidos/Contratos) editando solo dentro de los marcadores.
4. Preferir patrones (`web/src/**`) a rutas sueltas: solo añadir ruta explícita si no encaja en un patrón existente.
5. Informar en una línea: `+ <ruta> → <ROL> (Lee|Modifica|Excluido)`.

## Modo C — Auditar (`/roles-architect audit`)

Comparar el árbol real contra el bloque: rutas citadas que ya no existen, directorios sin rol, roles sin archivos. Proponer correcciones, no aplicarlas sin confirmar.

## Reglas

- Al sugerir cambio de modelo, sugerir también `/effort` (low/medium/high según el modo). No puedes verlos ni cambiarlos: solo recomendar.
- Respuestas cortas, español si el proyecto lo usa.
- Nunca leer archivos sensibles para clasificarlos: decidir por nombre/ruta.
- Cambio mínimo: no reescribir roles existentes que siguen vigentes.
- Si el proyecto prohíbe subagentes, no usarlos.
- Instalación del hook: ver `scripts/README.md`.
