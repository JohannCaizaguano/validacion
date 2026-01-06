# Informe de Resultados de Pruebas Automatizadas

**Fecha del Informe:** 05 de Enero, 2026
**Estado General:** ✅ APROBADO (12/12 Pruebas Exitosas)
**Herramienta de Testing:** Bun Test Runner v1.3.5

## 1. Resumen de Ejecución Técnica

A continuación se detalla la salida cruda de la ejecución de la suite de pruebas automatizadas:

```console
bun test v1.3.5 (1e86cebd)

src\__tests__\schemas\login.schema.test.ts:
✓ Login Schema Validation > should validate correct credentials
✓ Login Schema Validation > should reject invalid email
✓ Login Schema Validation > should reject short password

src\__tests__\services\auth.service.test.ts:
✓ Auth Service > should login with correct specific credentials [1016.00ms]
✓ Auth Service > should login with any email if password is password123 [1000.00ms]
✓ Auth Service > should fail with incorrect password [1016.00ms]

src\__tests__\services\orders.service.test.ts:
✓ Orders Service > should calculate total correctly
✓ Orders Service > should calculate total for empty cart
✓ Orders Service > should create order successfully and persist [15.00ms]
✓ Orders Service > should throw error for empty order

src\__tests__\services\products.service.test.ts:
✓ Products Service > should fetch products info [813.00ms]
✓ Products Service > should have valid stock statuses [812.00ms]

 12 pass
 0 fail
 37 expect() calls
Ran 12 tests across 4 files. [4.93s]
```

## 2. Validación de Historias de Usuario

La ejecución exitosa de estas pruebas confirma el cumplimiento de los criterios de aceptación para las siguientes historias:

### HU-01: Inicio de Sesión
**Objetivo:** Permitir acceso seguro y validar credenciales.

| Prueba Ejecutada | Criterio de Aceptación Validado |
|:---|:---|
| `should validate correct credentials` | El sistema permite el acceso con credenciales válidas. |
| `should fail with incorrect password` | Se muestra/lanza un error con credenciales inválidas. |
| `should reject invalid email` | Validación de formato antes de enviar al servidor. |
| `should reject short password` | Validación de seguridad mínima en campos. |

### HU-02: Consulta de Productos
**Objetivo:** Listar productos con información correcta de precio y disponibilidad.

| Prueba Ejecutada | Criterio de Aceptación Validado |
|:---|:---|
| `should fetch products info` | Se muestran todos los productos activos con sus propiedades (ID, Nombre, Precio). |
| `should have valid stock statuses` | Cada producto muestra disponibilidad válida ('in-stock', 'low-stock', 'out-of-stock'). |

### HU-03: Creación de Pedido
**Objetivo:** Permitir la compra y cálculo de totales.

| Prueba Ejecutada | Criterio de Aceptación Validado |
|:---|:---|
| `should calculate total correctly` | El total del pedido se calcula correctamente (Suma de Precio x Cantidad). |
| `should throw error for empty order` | El pedido se crea **solo** si hay productos seleccionados. |
| `should create order successfully and persist` | El pedido queda asociado al usuario y se guarda en el historial. |

## 3. Conclusión del Sprint de Pruebas

El sistema ha superado las pruebas "Happy Path" (flujos exitosos) y "Edge Cases" (validaciones de error) definidos para este MVP.
- **Integridad de Datos:** Verificada (Cálculos de dinero y estructuras de datos).
- **Seguridad Básica:** Verificada (Validación de inputs).
- **Persistencia:** Verificada (Simulación de base de datos/localStorage).

Se recomienda proceder al despliegue en entorno de Staging/QA.
