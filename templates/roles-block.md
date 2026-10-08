<!-- roles:begin -->
## Roles (generado por /roles-architect — editar con la skill)

Un solo Claude; los roles son modos temporales. Avisar cada cambio: `[rol: X] · MODO`.

### Modos, modelo y esfuerzo
| Modo | Cuándo | Modelo sugerido | `/effort` sugerido |
|---|---|---|---|
| FAST | textos, valores, bug obvio, búsqueda, doc puntual | haiku | low |
| STANDARD (default) | feature, componente, endpoint, lógica | sonnet | medium |
| DEEP | arquitectura, contratos multicapa, seguridad, debugging sin causa clara | opus | high |

Claude no puede cambiar ni ver su modelo/`/effort` activo desde la sesión. Si el modelo activo no coincide con el sugerido: detenerse antes de leer/editar y responder solo `[rol: X] · MODO · <modelo actual> (sugerido: /model <m> · /effort <n>)` + `¿Continuamos?`. El `/effort` es solo recomendación (no detiene): indicarlo en una línea cuando el modo cambie respecto a la respuesta anterior. Evitar `xhigh`/`max` en planes con límite de uso.
Cerrar cada respuesta con `[rol: X] · MODO · <modelo>` (+ `/effort <n>` si cambió el modo).

### Mapa
| Rol | Lee | Modifica | Nunca modifica | Valida con |
|---|---|---|---|---|
| <ROL> | <patrones> | <patrones> | <capas> | <comando> |

### Contratos entre capas (cambio → revisar ambos lados)
- <contrato>: `<archivo A>` ↔ `<archivo B>`

### Excluidos por defecto
- *Generados*: <patrones>
- *Sensibles (nunca leer, mostrar ni commitear)*: <patrones>
- *Históricos*: <patrones>

### Perfiles
<un bloque por rol, según templates/role.md>
<!-- roles:end -->
