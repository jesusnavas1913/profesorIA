import { ModuleData, ModuleStatus } from '../types';

export const INITIAL_MODULES: ModuleData[] = [
  // ==========================================
  // FASE 1: FUNDAMENTOS Y ESTRUCTURA BASE (1-10)
  // ==========================================
  {
    id: 1,
    title: "1. El Templo Raíz (Estructura)",
    description: "La organización de carpetas es el cimiento.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Antes de escribir código, necesitas un hogar. En el mundo real (PC o Móvil con Acode), creamos una carpeta raíz, un archivo `index.html` (la puerta de entrada), y carpetas para `css` y `assets`.",
      exampleCode: "<!-- ESTRUCTURA MENTAL -->\n/proyecto\n  ├── index.html  (Tú estás aquí)\n  ├── /css\n  └── /img",
      cleanCode: "<!-- index.html es el archivo principal -->",
      visualIcon: "📂",
      proTip: "El archivo principal SIEMPRE debe llamarse 'index.html'. Los servidores lo buscan automáticamente."
    },
    task: {
      instruction: "Crea un comentario que diga 'index.html' para simular la creación del archivo.",
      initialCode: "",
    },
    xpReward: 50
  },
  {
    id: 2,
    title: "2. Hola, Mundo Profesional",
    description: "El esqueleto universal (PC/Móvil).",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Toda página web profesional necesita 4 etiquetas obligatorias. Esta estructura funciona igual si programas en VS Code (PC) o en Termux (Android). Es el estándar global.",
      exampleCode: "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>Hola Mundo</body>\n</html>",
      cleanCode: "<!DOCTYPE html>\n<html>\n  <head></head>\n  <body>Hola Mundo</body>\n</html>",
      visualIcon: "💀",
      historyFact: "El <!DOCTYPE html> es la forma moderna de decirle al navegador 'No uses modo compatibilidad de los 90s'."
    },
    task: {
      instruction: "Escribe la estructura base completa con Doctype, html, head y body.",
      initialCode: "",
    },
    xpReward: 100
  },
  {
    id: 3,
    title: "3. El Cerebro Invisible (<head>)",
    description: "Donde vive la configuración, no el contenido.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "El `<head>` nunca se muestra al usuario. Aquí configuramos cómo se comporta la app en el navegador del móvil, el icono de la pestaña y el SEO para Google.",
      exampleCode: "<head>\n  <!-- Configuración aquí -->\n</head>",
      cleanCode: "<head></head>",
      visualIcon: "🧠",
    },
    task: {
      instruction: "Dentro de una estructura básica, deja el `<body>` vacío y enfócate en crear las etiquetas `<head></head>`.",
      initialCode: "<html>\n  \n  <body></body>\n</html>",
    },
    xpReward: 150
  },
  {
    id: 4,
    title: "4. El Alfabeto Universal (Charset)",
    description: "Hablando todos los idiomas.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Para que se vean las tildes, la 'ñ' y los emojis en cualquier dispositivo, debes declarar UTF-8. Sin esto, un iPhone podría mostrar símbolos extraños donde debería haber texto.",
      exampleCode: "<head>\n  <meta charset=\"UTF-8\">\n</head>",
      cleanCode: "<head>\n  <meta charset=\"UTF-8\">\n</head>",
      visualIcon: "🔤",
    },
    task: {
      instruction: "Añade `<meta charset='UTF-8'>` dentro del `<head>`.",
      initialCode: "<html>\n  <head>\n    <!-- Aquí -->\n  </head>\n  <body></body>\n</html>",
    },
    xpReward: 150
  },
  {
    id: 5,
    title: "5. La Ventana Móvil (Viewport)",
    description: "CRÍTICO: El interruptor móvil.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "¡ATENCIÓN! Sin esta línea, tu web se verá en el celular como una versión de escritorio alejada (zoom out). `width=device-width` obliga al navegador a usar el ancho real de la pantalla del teléfono.",
      exampleCode: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      cleanCode: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
      visualIcon: "📱",
      proTip: "Esta es la etiqueta más importante para el Responsive Design."
    },
    task: {
      instruction: "Activa el modo móvil escribiendo la etiqueta meta viewport completa en el head.",
      initialCode: "<html>\n  <head>\n  </head>\n  <body></body>\n</html>",
    },
    xpReward: 200
  },
  {
    id: 6,
    title: "6. El Corazón de Google (<title>)",
    description: "El nombre de la pestaña.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<title>` define el texto que aparece en la pestaña y en los resultados de Google. En móvil, es lo primero que se ve en la tarjeta de resultados.",
      exampleCode: "<head>\n  <title>Mi Portafolio</title>\n</head>",
      cleanCode: "<head>\n  <title>Portafolio</title>\n</head>",
      visualIcon: "🏷️",
    },
    task: {
      instruction: "Ponle título a tu página: 'Mi Primera Web'.",
      initialCode: "<html>\n  <head>\n  </head>\n  <body></body>\n</html>",
    },
    xpReward: 200
  },
  {
    id: 7,
    title: "7. Comentarios Pro",
    description: "Documentando como un senior.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usa comentarios para dividir secciones. En pantallas pequeñas de móvil, el código se ve más apretado, así que los comentarios visuales ayudan a no perderse al hacer scroll.",
      exampleCode: "<body>\n  <!-- HEADER PRINCIPAL -->\n  <header>...</header>\n</body>",
      cleanCode: "<body>\n  <header></header>\n</body>",
      visualIcon: "📝",
    },
    task: {
      instruction: "Escribe dos comentarios: 'Inicio' y 'Fin', y entre ellos un `<h1>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 200
  },
  {
    id: 8,
    title: "8. El Idioma (Lang)",
    description: "Ayudando a la traducción.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Debes decirle al navegador el idioma de tu contenido (`es` para español). Esto permite que Chrome en Android te pregunte: '¿Quieres traducir esta página?'.",
      exampleCode: "<html lang=\"es\">\n  ...\n</html>",
      cleanCode: "<html lang=\"es\"></html>",
      visualIcon: "🗣️",
    },
    task: {
      instruction: "Añade el atributo `lang=\"es\"` a la etiqueta `html`.",
      initialCode: "<html>\n  <body></body>\n</html>",
    },
    xpReward: 250
  },
  {
    id: 9,
    title: "9. Flujo Vertical (P vs Div)",
    description: "Lectura natural en celular.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "En el móvil, el espacio horizontal es lujo. Los elementos de bloque como `<p>` y `<div>` ocupan todo el ancho y se apilan verticalmente uno tras otro, creando un flujo de lectura natural para el scroll infinito.",
      exampleCode: "<div>\n  <p>Párrafo 1</p>\n  <p>Párrafo 2 (Abajo)</p>\n</div>",
      cleanCode: "<div>\n  <p>Texto</p>\n</div>",
      visualIcon: "⬇️",
    },
    task: {
      instruction: "Crea un `<div>` y dentro pon un `<p>` con texto.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 250
  },
  {
    id: 10,
    title: "10. El Salto Raro (<br>)",
    description: "Cuándo romper la línea.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "No uses `<br>` para separar párrafos (usa CSS). Usa `<br>` solo para direcciones o poemas. En pantallas pequeñas, el texto baja solo cuando no cabe, forzarlo con `<br>` puede romper el diseño.",
      exampleCode: "<p>Calle 123<br>Ciudad</p>",
      cleanCode: "<p>Línea 1<br>Línea 2</p>",
      visualIcon: "↵",
    },
    task: {
      instruction: "Escribe dos líneas de un poema separadas por `<br>` dentro de un `<p>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 250
  },

  // ==========================================
  // FASE 2: EL TEXTO SEMÁNTICO (11-20)
  // ==========================================
  {
    id: 11,
    title: "11. La Ley del H1",
    description: "Jerarquía Sagrada.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Regla de oro SEO: Solo UN `<h1>` por página. Los lectores de pantalla en Android/iOS usan estos títulos para permitir al usuario 'saltar' entre secciones rápidamente.",
      exampleCode: "<h1>Los Gatos</h1>\n<h2>Razas</h2>\n<h3>Persa</h3>",
      cleanCode: "<h1>Título</h1>\n<h2>Subtítulo</h2>",
      visualIcon: "👑",
    },
    task: {
      instruction: "Crea una estructura correcta: un h1, un h2 y un h3.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 300
  },
  {
    id: 12,
    title: "12. Énfasis Crítico (Strong)",
    description: "Importancia semántica.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<strong>` pone el texto en negrita. En asistentes de voz (Siri/Google), esto puede interpretarse con un tono de voz más fuerte o urgente.",
      exampleCode: "<p>Cuidado: <strong>No tocar</strong></p>",
      cleanCode: "<p><strong>Aviso</strong></p>",
      visualIcon: "💪",
    },
    task: {
      instruction: "Resalta una palabra 'Urgente' usando `<strong>` dentro de un párrafo.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 300
  },
  {
    id: 13,
    title: "13. Énfasis Tonal (Em)",
    description: "Cambiando la voz.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<em>` pone el texto en cursiva. Indica énfasis al hablar. Ayuda a dar contexto emocional al texto plano.",
      exampleCode: "<p>Yo no dije <em>eso</em>.</p>",
      cleanCode: "<p><em>Hola</em></p>",
      visualIcon: "🗣️",
    },
    task: {
      instruction: "Usa `<em>` para enfatizar una palabra en un párrafo.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 300
  },
  {
    id: 14,
    title: "14. Citas y Origen (Blockquote)",
    description: "Citando fuentes.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Para citas largas, usa `<blockquote>`. El navegador suele añadir márgenes laterales, lo cual se ve muy elegante en artículos leídos desde el móvil.",
      exampleCode: "<blockquote cite=\"https://libro.com\">\n  Ser o no ser.\n</blockquote>",
      cleanCode: "<blockquote cite=\"url\">Texto</blockquote>",
      visualIcon: "❝",
    },
    task: {
      instruction: "Crea un `blockquote` con el atributo `cite`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 350
  },
  {
    id: 15,
    title: "15. Abreviaturas (Abbr)",
    description: "Explicando siglas.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usa `<abbr>` para siglas. En PC muestra el título al pasar el mouse. En móvil, algunos navegadores muestran la definición al tocar la palabra.",
      exampleCode: "<p>La <abbr title=\"National Aeronautics and Space Administration\">NASA</abbr>.</p>",
      cleanCode: "<abbr title=\"Significado\">SIGLA</abbr>",
      visualIcon: "💡",
    },
    task: {
      instruction: "Define la sigla 'NASA' usando `<abbr>` y su título.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 350
  },
  {
    id: 16,
    title: "16. Código (Pre & Code)",
    description: "Mostrando programación.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<pre>` respeta espacios y saltos de línea. En móvil, esto suele generar una barra de scroll horizontal para no romper el diseño si la línea de código es larga.",
      exampleCode: "<pre><code>console.log('Hola');</code></pre>",
      cleanCode: "<pre><code>x = 1</code></pre>",
      visualIcon: "💻",
    },
    task: {
      instruction: "Muestra un comando de código usando `<pre>` y `<code>` anidados.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 350
  },
  {
    id: 17,
    title: "17. Ediciones (Del & Ins)",
    description: "Control de cambios.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<del>` tacha texto (eliminado). `<ins>` subraya texto (insertado). Es muy usado en e-commerce para mostrar precios rebajados.",
      exampleCode: "<p>Precio: <del>20€</del> <ins>10€</ins></p>",
      cleanCode: "<del>Viejo</del><ins>Nuevo</ins>",
      visualIcon: "🖍️",
    },
    task: {
      instruction: "Muestra un precio antiguo tachado y uno nuevo subrayado.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 400
  },
  {
    id: 18,
    title: "18. Tiempo Máquina (Time)",
    description: "Fechas inteligentes.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usar `<time>` permite que los sistemas operativos móviles detecten que es una fecha y te ofrezcan 'Añadir al Calendario' al tocarla.",
      exampleCode: "<p>Cita: <time datetime=\"2024-12-31\">Fin de año</time></p>",
      cleanCode: "<time datetime=\"2024-01-01\">Enero</time>",
      visualIcon: "📅",
    },
    task: {
      instruction: "Usa la etiqueta `<time>` con un atributo `datetime` válido.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 400
  },
  {
    id: 19,
    title: "19. Listas Descripción (DL)",
    description: "Diccionarios y metadatos.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<dl>` es genial para fichas técnicas de productos en móvil (ej. Pantalla: 6.1 pulgadas). `<dt>` es el título, `<dd>` es el dato.",
      exampleCode: "<dl>\n  <dt>CPU</dt>\n  <dd>A15 Bionic</dd>\n</dl>",
      cleanCode: "<dl><dt>A</dt><dd>B</dd></dl>",
      visualIcon: "📖",
    },
    task: {
      instruction: "Crea una lista `<dl>` con un término `<dt>` y su descripción `<dd>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 400
  },
  {
    id: 20,
    title: "20. La Letra Pequeña (Small)",
    description: "Legal y Copyright.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<small>` hace el texto más pequeño. Útil para descargos de responsabilidad que no deben distraer en una pantalla de teléfono limitada.",
      exampleCode: "<footer>\n  <small>Derechos reservados 2024</small>\n</footer>",
      cleanCode: "<small>Copyright</small>",
      visualIcon: "⚖️",
    },
    task: {
      instruction: "Escribe un aviso de copyright usando `<small>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 450
  },

  // ==========================================
  // FASE 3: HIPERVÍNCULOS Y MULTIMEDIA (21-30)
  // ==========================================
  {
    id: 21,
    title: "21. El Enlace y el Dedo (A)",
    description: "Áreas de toque.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "En móvil no hay cursor de precisión, hay dedos. Los enlaces deben ser claros. `href` es el destino. Recuerda: Si el enlace es muy pequeño, frustrarás al usuario.",
      exampleCode: "<a href=\"https://google.com\">Ir a Google</a>",
      cleanCode: "<a href=\"url\">Texto</a>",
      visualIcon: "🔗",
      proTip: "Intenta que tus enlaces y botones tengan un área mínima de 48x48px (regla de oro UX)."
    },
    task: {
      instruction: "Crea un enlace que apunte a 'https://example.com'.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 500
  },
  {
    id: 22,
    title: "22. Enlace Seguro (Target)",
    description: "Gestión de pestañas.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`target=\"_blank\"` abre nueva pestaña. En móvil, esto mantiene tu app abierta en segundo plano mientras el usuario ve el enlace. Vital para no perder tráfico.",
      exampleCode: "<a href=\"...\" target=\"_blank\" rel=\"noopener noreferrer\">Abrir</a>",
      cleanCode: "<a href=\"...\" target=\"_blank\" rel=\"noopener noreferrer\">Link</a>",
      visualIcon: "🛡️",
    },
    task: {
      instruction: "Crea un enlace seguro que se abra en una nueva pestaña.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 500
  },
  {
    id: 23,
    title: "23. Anclas Locales (ID)",
    description: "Navegación interna.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Hacer scroll infinito en móvil cansa. Usa enlaces con `href=\"#seccion\"` para crear un índice que salte directamente a la información.",
      exampleCode: "<a href=\"#contacto\">Saltar a Contacto</a>\n...\n<section id=\"contacto\">...</section>",
      cleanCode: "<a href=\"#x\">Ir</a><div id=\"x\">Fin</div>",
      visualIcon: "⚓",
    },
    task: {
      instruction: "Crea un enlace que lleve a un elemento con `id='final'`.",
      initialCode: "<html>\n  <body>\n    <div style='height:100px'>Espacio</div>\n    <!-- Tu código -->\n  </body>\n</html>",
    },
    xpReward: 550
  },
  {
    id: 24,
    title: "24. Menús Móviles (UL)",
    description: "La base del menú hamburguesa.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<ul>` es la base de todos los menús de navegación móvil (esos que se despliegan). Semánticamente es una lista de opciones.",
      exampleCode: "<ul>\n  <li>Inicio</li>\n  <li>Perfil</li>\n</ul>",
      cleanCode: "<ul><li>A</li><li>B</li></ul>",
      visualIcon: "●",
    },
    task: {
      instruction: "Crea una lista `<ul>` con 3 elementos `<li>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 550
  },
  {
    id: 25,
    title: "25. Listas Ordenadas (OL)",
    description: "Instrucciones paso a paso.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<ol>` numera automáticamente. Perfecto para recetas o tutoriales donde el usuario sigue pasos en su teléfono.",
      exampleCode: "<ol>\n  <li>Paso 1</li>\n  <li>Paso 2</li>\n</ol>",
      cleanCode: "<ol><li>A</li></ol>",
      visualIcon: "🔢",
    },
    task: {
      instruction: "Crea una lista ordenada que empiece en el número 10.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 600
  },
  {
    id: 26,
    title: "26. Imágenes y Datos (IMG)",
    description: "Cuidado con el 4G/5G.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Una imagen pesada gasta los datos de tu usuario. `<img>` es la etiqueta. Usa `width` para reservar espacio y evitar que el texto 'salte' (layout shift) mientras carga la imagen en conexiones lentas.",
      exampleCode: "<img src=\"foto.jpg\" alt=\"Descripción\" width=\"300\" />",
      cleanCode: "<img src=\"a.jpg\" alt=\"a\" />",
      visualIcon: "🖼️",
    },
    task: {
      instruction: "Inserta una imagen con sus 3 atributos clave: src, alt y width.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 600
  },
  {
    id: 27,
    title: "27. El ALT Perfecto",
    description: "Accesibilidad visual.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Si la imagen no carga (señal débil), el usuario verá el texto `alt`. Además, es lo que leen los asistentes de voz para personas ciegas.",
      exampleCode: "<img src=\"cat.jpg\" alt=\"Gato naranja durmiendo\" />",
      cleanCode: "<img src=\"x\" alt=\"Descripción\" />",
      visualIcon: "👁️",
    },
    task: {
      instruction: "Crea una imagen con un texto alternativo muy descriptivo.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 650
  },
  {
    id: 28,
    title: "28. Banners Táctiles",
    description: "Imágenes como botones.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Al envolver una `<img>` en un `<a>`, creas un botón grande y fácil de tocar. Ideal para banners de ofertas en móvil.",
      exampleCode: "<a href=\"oferta.html\">\n  <img src=\"promo.jpg\" alt=\"Ver Oferta\" />\n</a>",
      cleanCode: "<a href=\"...\"><img src=\"...\" /></a>",
      visualIcon: "👆",
    },
    task: {
      instruction: "Haz que una imagen sea un enlace a 'https://google.com'.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 650
  },
  {
    id: 29,
    title: "29. Audio y Autoplay",
    description: "Restricciones móviles.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Los móviles BLOQUEAN el audio automático para no asustar al usuario ni gastar datos. Siempre debes poner el atributo `controls` para que el usuario decida cuándo escuchar.",
      exampleCode: "<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n</audio>",
      cleanCode: "<audio controls><source src=\"a.mp3\"></audio>",
      visualIcon: "🎵",
    },
    task: {
      instruction: "Crea un reproductor de audio con una fuente mp3.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 700
  },
  {
    id: 30,
    title: "30. Video en iPhone/Android",
    description: "Inline vs Fullscreen.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Para que un video se reproduzca dentro de la web (y no en pantalla completa forzada en iPhone), usa `playsinline`. Si quieres autoplay, DEBE tener `muted`.",
      exampleCode: "<video controls playsinline muted width=\"100%\">\n  <source src=\"v.mp4\">\n</video>",
      cleanCode: "<video controls playsinline><source src=\"v.mp4\"></video>",
      visualIcon: "🎬",
    },
    task: {
      instruction: "Crea un video con los atributos `controls`, `playsinline` y `muted`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 700
  },

  // ==========================================
  // FASE 4: TABLAS Y FORMULARIOS (31-40)
  // ==========================================
  {
    id: 31,
    title: "31. Estructura de Tabla",
    description: "Datos en pantalla pequeña.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Las tablas son difíciles en móvil. Si tienen muchas columnas, necesitarás scroll horizontal (CSS). Aquí aprendemos la estructura base: `<table>`, `<tr>` (fila) y `<td>` (dato).",
      exampleCode: "<table>\n  <tr> <td>A1</td> <td>B1</td> </tr>\n  <tr> <td>A2</td> <td>B2</td> </tr>\n</table>",
      cleanCode: "<table><tr><td>Dato</td></tr></table>",
      visualIcon: "▦",
    },
    task: {
      instruction: "Crea una tabla simple de 2 filas y 2 celdas cada una.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 750
  },
  {
    id: 32,
    title: "32. Tablas Semánticas",
    description: "Organización lógica.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usa `<thead>`, `<tbody>` y `<tfoot>`. Esto permite que, si imprimes la web o usas un lector de pantalla, la tabla se entienda aunque se rompa visualmente.",
      exampleCode: "<table>\n  <thead>...</thead>\n  <tbody>...</tbody>\n</table>",
      cleanCode: "<table><thead></thead><tbody></tbody></table>",
      visualIcon: "🗂️",
    },
    task: {
      instruction: "Estructura una tabla usando thead, tbody y tfoot.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 750
  },
  {
    id: 33,
    title: "33. Encabezados (TH)",
    description: "Negrita automática.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usa `<th>` para los títulos. En móvil, esto ayuda a distinguir visualmente qué es etiqueta y qué es dato en espacios reducidos.",
      exampleCode: "<thead>\n  <tr> <th>Nombre</th> <th>Edad</th> </tr>\n</thead>",
      cleanCode: "<tr><th>Titulo</th></tr>",
      visualIcon: "T",
    },
    task: {
      instruction: "Crea una fila de encabezados con 2 columnas.",
      initialCode: "<html>\n  <body>\n    <table>\n    </table>\n  </body>\n</html>",
    },
    xpReward: 800
  },
  {
    id: 34,
    title: "34. Fusión de Celdas",
    description: "Diseño complejo.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`colspan` une columnas. `rowspan` une filas. ¡Cuidado! Las tablas complejas son la pesadilla del diseño móvil. Úsalas con sabiduría.",
      exampleCode: "<tr>\n  <td colspan=\"2\">Total</td>\n</tr>",
      cleanCode: "<td colspan=\"2\">Unido</td>",
      visualIcon: "↔️",
    },
    task: {
      instruction: "Crea una celda que ocupe 2 columnas (colspan).",
      initialCode: "<html>\n  <body>\n    <table>\n      <tr></tr>\n    </table>\n  </body>\n</html>",
    },
    xpReward: 800
  },
  {
    id: 35,
    title: "35. El Formulario (Form)",
    description: "Interacción usuario.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<form>` es el paquete de datos. En móvil, los formularios deben ser cortos y fáciles de rellenar para evitar el abandono.",
      exampleCode: "<form action=\"/api\" method=\"POST\">\n  ...\n</form>",
      cleanCode: "<form action=\"/api\" method=\"POST\"></form>",
      visualIcon: "📩",
    },
    task: {
      instruction: "Crea un `<form>` con method='POST'.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 850
  },
  {
    id: 36,
    title: "36. Teclados Virtuales (Input)",
    description: "Adaptando la experiencia.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Cuando el usuario toca un `<input type=\"text\">`, el teclado virtual sube. Asegúrate de que tu diseño no quede tapado por el teclado.",
      exampleCode: "<input type=\"text\" placeholder=\"Nombre\" />",
      cleanCode: "<input type=\"text\" />",
      visualIcon: "⌨️",
    },
    task: {
      instruction: "Crea un input de texto con un placeholder.",
      initialCode: "<html>\n  <body>\n    <form>\n    </form>\n  </body>\n</html>",
    },
    xpReward: 850
  },
  {
    id: 37,
    title: "37. El Atributo Name",
    description: "Identidad de datos.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "El `name` es clave. Además, el navegador usa el `name` para el 'Autocompletar' (Sugerir correos/nombres guardados), ahorrando escritura al usuario móvil.",
      exampleCode: "<input type=\"text\" name=\"email\" />",
      cleanCode: "<input name=\"email\" />",
      visualIcon: "🏷️",
    },
    task: {
      instruction: "Añade el atributo `name` a un input.",
      initialCode: "<html>\n  <body>\n    <form>\n      <input type='text'>\n    </form>\n  </body>\n</html>",
    },
    xpReward: 900
  },
  {
    id: 38,
    title: "38. Click Target (Label)",
    description: "Expandiendo el área de toque.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Vital en móvil: Al usar `<label for='id'>`, si el usuario toca la palabra 'Correo', el input se activa. Esto triplica el área táctil y reduce errores de dedo.",
      exampleCode: "<label for=\"x\">Correo</label>\n<input id=\"x\" type=\"email\">",
      cleanCode: "<label for=\"x\">X</label><input id=\"x\">",
      visualIcon: "🔗",
    },
    task: {
      instruction: "Conecta un Label y un Input usando 'for' e 'id'.",
      initialCode: "<html>\n  <body>\n    <form>\n    </form>\n  </body>\n</html>",
    },
    xpReward: 900
  },
  {
    id: 39,
    title: "39. Inputs Inteligentes",
    description: "Teclados específicos.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Magia pura: `type='email'` muestra la '@' en el teclado. `type='tel'` muestra solo números grandes. `type='url'` muestra '.com'. ¡Úsalos siempre!",
      exampleCode: "<input type=\"email\" />\n<input type=\"tel\" />",
      cleanCode: "<input type=\"email\">",
      visualIcon: "📱",
      proTip: "Nunca uses type='text' para un teléfono, obligas al usuario a cambiar de teclado manualmente."
    },
    task: {
      instruction: "Crea un input de tipo `email` y uno de tipo `tel`.",
      initialCode: "<html>\n  <body>\n    <form>\n    </form>\n  </body>\n</html>",
    },
    xpReward: 950
  },
  {
    id: 40,
    title: "40. Selección Fácil (Radio/Check)",
    description: "Evitando el 'Fat Finger'.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Los checkboxes por defecto son pequeños. Siempre úsalos junto a un `<label>` para que el usuario pueda tocar el texto para marcar la opción.",
      exampleCode: "<label><input type=\"checkbox\"> Acepto</label>",
      cleanCode: "<input type=\"radio\" name=\"g\">",
      visualIcon: "☑️",
    },
    task: {
      instruction: "Crea dos radio buttons que compartan el mismo atributo 'name'.",
      initialCode: "<html>\n  <body>\n    <form>\n    </form>\n  </body>\n</html>",
    },
    xpReward: 950
  },

  // ==========================================
  // FASE 5: EL NIVEL SUPREMO (SEMÁNTICA) (41-50)
  // ==========================================
  {
    id: 41,
    title: "41. El Comodín de Bloque (Div)",
    description: "Usar solo en emergencia.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<div>` no significa nada. Úsalo solo para agrupar elementos visualmente cuando no haya una etiqueta semántica (como section o article) adecuada.",
      exampleCode: "<div class=\"contenedor-anuncio\">\n  <img src=\"...\" />\n</div>",
      cleanCode: "<div>...</div>",
      visualIcon: "📦",
    },
    task: {
      instruction: "Agrupa dos elementos dentro de un `<div>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1000
  },
  {
    id: 42,
    title: "42. El Comodín de Línea (Span)",
    description: "Estilizando palabras.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<span>` tampoco significa nada, pero es 'inline' (en línea). Úsalo para colorear o cambiar la fuente de una parte de un texto.",
      exampleCode: "<p>Precio: <span class=\"rojo\">$50</span></p>",
      cleanCode: "<span>Texto</span>",
      visualIcon: "🖍️",
    },
    task: {
      instruction: "Envuelve una sola palabra de un párrafo con `<span>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1000
  },
  {
    id: 43,
    title: "43. Contenido Principal (Main)",
    description: "Lo único importante.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Solo UN `<main>` por página. Debe contener el contenido específico de esa URL, excluyendo menús, footers y barras laterales que se repiten.",
      exampleCode: "<body>\n  <nav>...</nav>\n  <main>\n    <h1>El Artículo</h1>\n  </main>\n</body>",
      cleanCode: "<main>...</main>",
      visualIcon: "🎯",
    },
    task: {
      instruction: "Define la zona `<main>` del documento.",
      initialCode: "<html>\n  <body>\n    <!-- Nav -->\n    <!-- Aquí va el main -->\n    <!-- Footer -->\n  </body>\n</html>",
    },
    xpReward: 1050
  },
  {
    id: 44,
    title: "44. La Cabecera Global (Header)",
    description: "Marca y Navegación.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<header>` contiene el logo, título del sitio y navegación. Puede usarse para la cabecera de la página o la cabecera de un artículo.",
      exampleCode: "<header>\n  <img src=\"logo.png\">\n  <nav>...</nav>\n</header>",
      cleanCode: "<header>...</header>",
      visualIcon: "🧢",
    },
    task: {
      instruction: "Crea un `<header>` con un título dentro.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1050
  },
  {
    id: 45,
    title: "45. El Pie de Página (Footer)",
    description: "Cierre y Créditos.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<footer>` va al final. Información legal, contacto, enlaces a redes sociales y copyright.",
      exampleCode: "<footer>\n  <p>© 2024 Empresa</p>\n</footer>",
      cleanCode: "<footer>...</footer>",
      visualIcon: "🦶",
    },
    task: {
      instruction: "Crea un `<footer>` con texto de copyright.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1100
  },
  {
    id: 46,
    title: "46. Navegación (Nav)",
    description: "El mapa del sitio.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "Usa `<nav>` para bloques de enlaces de navegación importantes. No todos los enlaces van en nav, solo los menús principales.",
      exampleCode: "<nav>\n  <ul>\n    <li><a href=\"/home\">Inicio</a></li>\n  </ul>\n</nav>",
      cleanCode: "<nav>...</nav>",
      visualIcon: "🧭",
    },
    task: {
      instruction: "Envuelve una lista de enlaces dentro de un `<nav>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1100
  },
  {
    id: 47,
    title: "47. Secciones (Section)",
    description: "Capítulos del contenido.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<section>` agrupa contenido temático. Generalmente, cada sección debería tener un título (`h2`-`h6`).",
      exampleCode: "<section>\n  <h2>Sobre Nosotros</h2>\n  <p>...</p>\n</section>",
      cleanCode: "<section><h2>T</h2></section>",
      visualIcon: "📚",
    },
    task: {
      instruction: "Crea un `<section>` que contenga un `<h2>`.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1150
  },
  {
    id: 48,
    title: "48. Artículo (Article)",
    description: "Contenido independiente.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<article>` es contenido que tiene sentido por sí solo (una noticia, un post de blog, un tweet, un producto). Podrías sacarlo de la web y seguiría teniendo sentido.",
      exampleCode: "<article>\n  <h2>Noticia Urgente</h2>\n  <p>Ocurrió hoy...</p>\n</article>",
      cleanCode: "<article>...</article>",
      visualIcon: "📰",
    },
    task: {
      instruction: "Crea un `<article>` con un título y párrafo.",
      initialCode: "<html>\n  <body>\n  </body>\n</html>",
    },
    xpReward: 1150
  },
  {
    id: 49,
    title: "49. Contenido Lateral (Aside)",
    description: "Info tangencial.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "`<aside>` es contenido relacionado indirectamente: barras laterales, publicidad, cajas de 'sabías que'. Si lo borras, el contenido principal se entiende igual.",
      exampleCode: "<aside>\n  <h3>Publicidad</h3>\n</aside>",
      cleanCode: "<aside>...</aside>",
      visualIcon: "👉",
    },
    task: {
      instruction: "Crea un `<aside>` junto al contenido principal.",
      initialCode: "<html>\n  <body>\n    <main>...</main>\n    <!-- Tu aside -->\n  </body>\n</html>",
    },
    xpReward: 1200
  },
  {
    id: 50,
    title: "50. MASTER HTML: Integración",
    description: "El Examen Final: Completa la Arquitectura.",
    status: ModuleStatus.ACTIVE,
    theory: {
      text: "He preparado la estructura base de un sitio profesional 'Mobile-First'. Tu misión es rellenar los huecos: activa el Viewport, crea el menú, llena la tabla, configura el formulario para móviles y pon el copyright.",
      exampleCode: "<!-- TU MISIÓN -->\n<meta name='viewport' ...>\n<input type='email'>\n<footer>...</footer>",
      cleanCode: "<!-- SITIO COMPLETO -->",
      visualIcon: "🎓",
    },
    task: {
      instruction: "Completa el código: 1. Añade el Meta Viewport. 2. Crea un Nav en el Header. 3. Pon contenido en el Article. 4. Crea una Tabla (thead/tbody). 5. Inputs (email/tel) en el Form. 6. Copyright en Footer.",
      initialCode: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <!-- 1. FALTA EL META VIEWPORT AQUÍ (CRÍTICO PARA MÓVIL) -->
    
    <title>Examen Final</title>
  </head>
  <body>
    <header>
      <!-- 2. CREA UN MENÚ DE NAVEGACIÓN (NAV + UL) AQUÍ -->
      
    </header>

    <main>
      <article>
        <!-- 3. AÑADE UN TÍTULO H1 Y UN PÁRRAFO -->
        
        <!-- AÑADE UNA IMAGEN RESPONSIVE (WIDTH) -->
        
      </article>

      <section>
        <h3>Datos</h3>
        <table>
          <!-- 4. CREA UNA TABLA CON THEAD Y TBODY -->
          
        </table>
      </section>

      <section>
        <h3>Contacto</h3>
        <form>
          <!-- 5. CREA INPUTS TIPO EMAIL Y TEL -->
          
        </form>
      </section>
    </main>

    <footer>
      <!-- 6. AÑADE EL COPYRIGHT EN SMALL -->
      
    </footer>
  </body>
</html>`,
    },
    xpReward: 1500
  }
];
