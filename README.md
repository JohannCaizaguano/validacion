# Guía de Inicio Rápido

## 1. Instalar Bun

Ejecuta este comando en tu terminal (PowerShell):

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

## 2. Clonar el Proyecto

```bash
git clone <tu-repositorio-url>
cd Nose
```

## 3. Instalar y Ejecutar

```bash
bun install
bun run dev
```

## 4. Ejecutar Pruebas

El proyecto incluye una suite de pruebas automatizadas para validar las Historias de Usuario (HU).

```bash
bun test
```

Para ver el detalle completo de la última ejecución y cómo cada prueba valida los requisitos del negocio, consulta el archivo [REPORTE_PRUEBAS.md](./REPORTE_PRUEBAS.md).

