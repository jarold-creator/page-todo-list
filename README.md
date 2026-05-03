# Todo List - Aplicación de Gestión de Tareas

Una aplicación moderna de lista de tareas (to-do list) construida con React, diseñada con una interfaz limpa y funcional.

## Características

### Funcionalidades Principales
- **Agregar tareas** - Crea nuevas tareas con descripción y fecha opcional
- **Editar tareas** - Modifica el texto y la fecha de cualquier tarea
- **Eliminar tareas** - Borra tareas con confirmación de seguridad
- **Completar tareas** - Marca tareas como completadas
- **Filtrar tareas** - Filtra por: Todas, Pendientes o Completadas
- **Limpiar completadas** - Elimina todas las tareas completadas

### Características Técnicas
- **Modo oscuro** - Soporte completo para tema claro/oscuro
- **Persistencia** - Las tareas se guardan automáticamente en localStorage
- **Rendimiento optimizado** - Uso de useMemo y React.memo
- **Accesibilidad** - Atributos ARIA y navegación por teclado
- **IDs únicos** - Generador crypto.randomUUID()
- **Diseño responsive** - Adaptado para móviles y escritorio

## Tecnologías

- **React 19** - Framework de interfaz de usuario
- **Vite** - Herramienta de construcción
- **CSS Modules** - Estilos encapsulados por componente
- **ESLint** - Calidad de código

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Verificar código
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes de React
│   ├── App.jsx                 # Componente principal
│   ├── TaskInput.jsx          # Formulario de nuevas tareas
│   ├── TaskList.jsx           # Contenedor de lista
│   ├── TaskItem.jsx           # Ítem individual de tarea
│   ├── Footer.jsx             # Pie de página con contadores
│   └── ConfirmModal.jsx        # Modal de confirmación
├── hooks/           # Hooks personalizados
│   ├── useLocalStorage.js      # Persistencia en navegador
│   └── useTheme.js           # Gestión del tema
└── styles/         # Estilos globales
    └── variables.css          # Variables CSS y temas
```

## Atajos de Teclado

- **Enter** - Confirmar acciones en modales
- **Esc** - Cancelar acciones en modales

## Capturas

### Tema Claro

![Vista principal - Tema Claro](/screenshots/captura1.png)

### Tema Oscuro

![Vista principal - Tema Oscuro](/screenshots/captura2.png)

### Modal de Edición

![Modal de edición](/screenshots/captura3.png)

### Modal de Eliminación

![Modal de confirmación de eliminación](/screenshots/captura4.png)

La aplicación incluye:
- Fondo con overlay dinámico según el tema
- Badges de fecha con indicadores de vencimiento
- Botón toggle para cambiar entre tema claro/oscuro
- Animaciones suaves en modales e interacciones

## Licencia

MIT