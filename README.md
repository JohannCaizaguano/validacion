
Aplicación web para gestión de inventario y catálogo de productos, construida con Next.js 15, Prisma, y Supabase.

## Requisitos Previos

- **Node.js** v18 o superior
- **Bun** (opcional, recomendado) o npm
- **Cuenta de Supabase** (para la base de datos PostgreSQL)

## Configuración

### 1. Clonar el Proyecto

```bash
git clone <tu-repositorio-url>
cd Nose
```

### 2. Instalar Dependencias

```bash
# Con Bun (recomendado)
bun install

# O con npm
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres.[TU_PROJECT_REF]:[TU_PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[TU_PROJECT_REF]:[TU_PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Supabase Auth (desde tu dashboard de Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://[TU_PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key-aqui"
```

> **Nota**: Obtén estas credenciales desde tu [Dashboard de Supabase](https://app.supabase.com) → Settings → Database (para URLs) y API (para keys).

### 4. Configurar la Base de Datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Aplicar el esquema a la base de datos
npx prisma db push

# Poblar la base de datos con datos de ejemplo (60 productos)
npx prisma db seed
```

### 5. Ejecutar el Proyecto

```bash
# Modo desarrollo
bun run dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Inicia el servidor de desarrollo |
| `bun run build` | Compila el proyecto para producción |
| `bun run start` | Ejecuta la versión de producción |
| `bun test` | Ejecuta las pruebas automatizadas |
| `npx prisma studio` | Abre el visualizador de base de datos |
| `npx prisma db seed` | Re-pobla la base de datos con datos de ejemplo |

## Estructura del Proyecto

```
src/
├── app/                # Rutas de Next.js (App Router)
│   ├── page.tsx        # Página principal (catálogo)
│   ├── login/          # Página de autenticación
│   └── checkout/       # Página de checkout
├── components/         # Componentes de React
├── hooks/              # Hooks personalizados (useAuth, useCart)
├── lib/                # Utilidades (Prisma, Supabase)
├── services/           # Servicios de datos (productos, categorías)
└── types/              # Definiciones de TypeScript
prisma/
├── schema.prisma       # Esquema de base de datos
└── seed.js             # Script de datos de prueba
```

## Funcionalidades

- ✅ Catálogo de productos con imágenes
- ✅ Filtrado por categorías
- ✅ Carrito de compras
- ✅ Autenticación con Supabase
- ✅ Dashboard de administración
- ✅ Diseño responsive

## Documentación Adicional

- [REPORTE_PRUEBAS.md](./REPORTE_PRUEBAS.md) - Resultados de pruebas automatizadas
