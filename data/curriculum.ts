import { ModuleData, ModuleStatus } from '../types';

const INITIAL_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  
</body>
</html>`;

export const INITIAL_MODULES: ModuleData[] = [
  {
    id: 1,
    title: "1. Encabezados (H1-H6)",
    description: "Los títulos son la estructura principal. El <h1> es único por página.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Empezamos con la estructura base. Todo documento HTML necesita un `<h1>` como título principal. ¡Solo debe haber uno! Los `<h2>` a `<h6>` son subtítulos.",
      exampleCode: "<h1>Juguetes</h1>\n<h2>Patines</h2>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
</body>
</html>`,
      visualIcon: "👑",
      proTip: "El <h1> es lo más importante para Google (SEO)."
    },
    task: {
      instruction: "Dentro del <body>, añade un etiqueta `<h1>` con el texto 'Mi Primera Página'.",
      initialCode: INITIAL_BOILERPLATE,
    },
    xpReward: 100
  },
  {
    id: 2,
    title: "2. Párrafos (P)",
    description: "Bloques de texto para desarrollar tus ideas.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "Debajo del título van los párrafos. La etiqueta `<p>` crea un bloque de texto separado. Si escribes texto suelto sin etiqueta, ¡es un error!",
      exampleCode: "<p>Esto es un párrafo explicativo.</p>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
</body>
</html>`,
      visualIcon: "📝",
    },
    task: {
      instruction: "Añade un `<p>` debajo del H1 con el texto 'Esto es un párrafo de introducción.'.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
</body>
</html>`,
    },
    xpReward: 100
  },
  {
    id: 3,
    title: "3. Enlaces (A)",
    description: "Conectando con el mundo (Hyperlinks).",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "La etiqueta `<a>` (anchor) crea enlaces. Su atributo `href` dice 'a dónde ir'. Sin enlaces, la web no existiría.",
      exampleCode: "<a href=\"https://google.com\">Ir a Google</a>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
</body>
</html>`,
      visualIcon: "🔗",
    },
    task: {
      instruction: "Añade un enlace `<a>` que vaya a 'https://google.com' con el texto 'Visitar Google'.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
</body>
</html>`,
    },
    xpReward: 150
  },
  {
    id: 4,
    title: "4. Imágenes (IMG)",
    description: "Contenido visual para tu web.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "La etiqueta `<img>` no tiene cierre. Usa `src` para la ruta de la imagen y `alt` para describirla si falla o para ciegos.",
      exampleCode: "<img src=\"foto.jpg\" alt=\"Un gato\" />",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
</body>
</html>`,
      visualIcon: "🖼️",
    },
    task: {
      instruction: "Añade una etiqueta `<img>` con src='https://via.placeholder.com/150' y alt='Imagen de prueba'.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
</body>
</html>`,
    },
    xpReward: 150
  },
  {
    id: 5,
    title: "5. Listas (UL, OL, LI)",
    description: "Organizando datos en listas.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "`<ul>` es para puntos (desordenada) y `<ol>` para números (ordenada). Dentro, cada ítem es un `<li>`.",
      exampleCode: "<ul>\n  <li>Manzana</li>\n  <li>Pera</li>\n</ul>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
</body>
</html>`,
      visualIcon: "📋",
    },
    task: {
      instruction: "Crea una lista desordenada `<ul>` con dos elementos `<li>` dentro: 'Elemento 1' y 'Elemento 2'.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
</body>
</html>`,
    },
    xpReward: 200
  },
  {
    id: 6,
    title: "6. Contenedores (DIV)",
    description: "Cajas invisibles para agrupar.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "El `<div>` es el rey del diseño. Es una caja vacía que agrupa cosas. Por sí solo no hace nada, pero sirve para aplicar CSS a bloques enteros.",
      exampleCode: "<div>\n  <p>Grupo</p>\n</div>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
  <div style=\"background-color: #eee; padding: 10px;\">
    <p>Texto agrupado en caja</p>
  </div>
</body>
</html>`,
      visualIcon: "📦",
    },
    task: {
      instruction: "Crea un `<div>` (opcional: con style) y mete un párrafo `<p>` nuevo dentro que diga 'Texto agrupado en caja'.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
</body>
</html>`,
    },
    xpReward: 200
  },
  {
    id: 7,
    title: "7. Estilos en Línea (SPAN)",
    description: "Detalles dentro del texto.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "Mientras `<div>` es para bloques grandes, `<span>` es para trozos pequeños de texto dentro de un párrafo. Ideal para colorear una palabra.",
      exampleCode: "<p>Hola <span style=\"color:red\">Rojo</span></p>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
  <div style=\"background-color: #eee; padding: 10px;\">
    <p>Texto agrupado en caja</p>
  </div>
  <p>Este texto tiene una palabra <span style=\"color: blue;\">azul</span>.</p>
</body>
</html>`,
      visualIcon: "🎨",
    },
    task: {
      instruction: "Añade un nuevo párrafo donde uses `<span>` para poner la palabra 'azul' con `style='color: blue;'`.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
  <div style=\"background-color: #eee; padding: 10px;\">
    <p>Texto agrupado en caja</p>
  </div>
</body>
</html>`,
    },
    xpReward: 250
  },
  {
    id: 8,
    title: "8. Saltos de Línea (BR)",
    description: "Rompiendo líneas.",
    status: ModuleStatus.LOCKED,
    theory: {
      text: "La etiqueta `<br>` corta la línea. No la uses para separar párrafos (para eso son los párrafos), úsala para poemas o direcciones.",
      exampleCode: "<p>Linea 1<br>Linea 2</p>",
      cleanCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
  <div style=\"background-color: #eee; padding: 10px;\">
    <p>Texto agrupado en caja</p>
  </div>
  <p>Este texto tiene una palabra <span style=\"color: blue;\">azul</span>.</p>
  <p>Primera línea<br>Segunda línea</p>
</body>
</html>`,
      visualIcon: "↵",
    },
    task: {
      instruction: "Crea un párrafo con dos líneas de texto separadas por una etiqueta `<br>`.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  <h1>Mi Primera Página</h1>
  <p>Esto es un párrafo de introducción.</p>
  <a href="https://google.com">Visitar Google</a>
  <img src="https://via.placeholder.com/150" alt=\"Imagen de prueba\" />
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
  <div style=\"background-color: #eee; padding: 10px;\">
    <p>Texto agrupado en caja</p>
  </div>
  <p>Este texto tiene una palabra <span style=\"color: blue;\">azul</span>.</p>
</body>
</html>`,
    },
    xpReward: 250
  }
];
