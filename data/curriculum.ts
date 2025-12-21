import { ModuleData, ModuleStatus } from '../types';

export const INITIAL_MODULES: ModuleData[] = [
  {
    id: 1,
    title: "1. El Origen (Torre de Control)",
    description: "Configura el cerebro invisible de tu web. Los cimientos de todo proyecto digital.",
    status: ModuleStatus.ACTIVE,
    xpReward: 500,
    steps: [
      {
        id: "doctype",
        tag: "<!DOCTYPE html>",
        title: "Declaración de Estándar",
        explanation: "Es el 'Grito de Guerra'. Le dice al navegador: 'Oye, usa HTML5 moderno'. Sin esto, el navegador intentará adivinar y tu diseño se verá mal.",
        instruction: "Escribe `<!DOCTYPE html>` en la primera línea. Es el permiso para empezar.",
        exampleSnippet: "<!DOCTYPE html>",
        xpReward: 50
      },
      {
        id: "html-lang",
        tag: "<html>",
        title: "El Territorio",
        explanation: "La etiqueta <html> envuelve TODO. El atributo 'lang' es vital para que Google sepa en qué idioma hablas y para que los traductores funcionen.",
        instruction: "Debajo del doctype, abre `<html lang=\"es\">` y ciérrala al final. Todo vivirá dentro.",
        exampleSnippet: "<html lang=\"es\">\n\n</html>",
        xpReward: 100
      },
      {
        id: "head-tag",
        tag: "<head>",
        title: "El Cerebro",
        explanation: "El <head> es la parte invisible. Aquí van las instrucciones para Google. El cliente no lo ve, pero el buscador lo lee para darte autoridad.",
        instruction: "Dentro del <html>, crea la etiqueta `<head>` y su respectivo cierre `</head>`.",
        exampleSnippet: "<head>\n</head>",
        xpReward: 100
      },
      {
        id: "body-tag",
        tag: "<body>",
        title: "El Escenario",
        explanation: "El <body> es lo único que el cliente ve. Es donde ocurre la magia: títulos, imágenes y botones. Si no está en el body, no existe para el usuario.",
        instruction: "Debajo del </head>, crea las etiquetas `<body>` y `</body>`.",
        exampleSnippet: "<body>\n</body>",
        xpReward: 150
      }
    ],
    theory: {
      text: "Arquitecto, antes de poner ventanas, necesitamos el terreno. El Doctype define la era, el HTML define el idioma y el Body define la realidad visual.",
      exampleCode: "<!DOCTYPE html>\n<html lang=\"es\">\n  <head></head>\n  <body></body>\n</html>",
      cleanCode: "Estructura Pura",
      visualIcon: "🗼",
      proTip: "HTML es como una muñeca rusa: etiquetas siempre dentro de etiquetas."
    }
  },
  {
    id: 2,
    title: "2. El Despertar (Voz y Marca)",
    description: "Dale identidad a tu sitio. Aprende a priorizar con títulos y párrafos.",
    status: ModuleStatus.ACTIVE,
    xpReward: 600,
    steps: [
      {
        id: "meta-charset",
        tag: "<meta>",
        title: "Traductor Universal",
        explanation: "Sin UTF-8, letras como la 'ñ' saldrán como símbolos raros. Es el código que entiende todos los idiomas del mundo.",
        instruction: "Dentro del <head>, añade `<meta charset=\"UTF-8\">`.",
        exampleSnippet: "<meta charset=\"UTF-8\">",
        xpReward: 100
      },
      {
        id: "title-tag",
        tag: "<title>",
        title: "La Identidad",
        explanation: "El <title> es el nombre que sale en la pestaña y en Google. Es tu primera oportunidad de atraer un cliente.",
        instruction: "Dentro del <head>, escribe `<title>Mi Web Profesional</title>`.",
        exampleSnippet: "<title>Nombre de tu Web</title>",
        xpReward: 100
      },
      {
        id: "h1",
        tag: "<h1>",
        title: "Promesa de Valor",
        explanation: "Solo debe haber un <h1>. Es tu titular más potente. Google lo lee para saber qué vendes exactamente.",
        instruction: "Dentro del <body>, escribe tu titular principal con `<h1>Mi Marca</h1>`.",
        exampleSnippet: "<h1>Titular Maestro</h1>",
        xpReward: 200
      },
      {
        id: "p-tag",
        tag: "<p>",
        title: "La Narrativa",
        explanation: "Los párrafos son para convencer. El navegador les da el espacio justo para que el cliente no se canse de leer.",
        instruction: "Debajo del <h1>, añade un párrafo descriptivo con `<p>`.",
        exampleSnippet: "<p>Somos expertos en...</p>",
        xpReward: 100
      }
    ],
    theory: {
      text: "En Internet, la gente no lee, escanea. La jerarquía de texto guía el ojo del usuario hacia lo que realmente importa: tu oferta.",
      exampleCode: "<h1>Títular</h1>\n<p>Descripción</p>",
      cleanCode: "Jerarquía Visual",
      visualIcon: "✍️",
      proTip: "Un buen título aumenta un 40% la retención del usuario."
    }
  },
  {
    id: 3,
    title: "3. Sistema Nervioso (Enlaces)",
    description: "Crea puentes hacia el dinero. Sin enlaces, tu web es un callejón sin salida.",
    status: ModuleStatus.ACTIVE,
    xpReward: 700,
    steps: [
      {
        id: "a-tag",
        tag: "<a>",
        title: "Portales de Acción",
        explanation: "La etiqueta <a> (ancla) es un portal. El atributo 'href' es el destino. Es como le dices al cliente: 'Haz clic para comprar'.",
        instruction: "Crea un enlace que diga 'Contáctanos' apuntando a `https://wa.me/tu_numero`.",
        exampleSnippet: "<a href=\"url\">Texto</a>",
        xpReward: 200
      },
      {
        id: "nav-tag",
        tag: "<nav>",
        title: "Mapa de Ruta",
        explanation: "La etiqueta <nav> le dice a Google: 'Aquí están mis enlaces clave'. Es el índice de tu negocio digital.",
        instruction: "Envuelve tu enlace dentro de una etiqueta `<nav></nav>`.",
        exampleSnippet: "<nav>\n  <a href=\"#\">Inicio</a>\n</nav>",
        xpReward: 200
      }
    ],
    theory: {
      text: "Los enlaces permiten que el usuario fluya. Una web sin navegación es una pérdida de tiempo para el cliente.",
      exampleCode: "<nav><a href=\"#\">...</a></nav>",
      cleanCode: "Navegación",
      visualIcon: "🔗",
      proTip: "Usa textos descriptivos en tus enlaces para que Google te premie."
    }
  },
  {
    id: 4,
    title: "4. Los Sentidos (Multimedia)",
    description: "Impacto visual inmediato. Una web sin imágenes es aburrida.",
    status: ModuleStatus.ACTIVE,
    xpReward: 800,
    steps: [
      {
        id: "img-tag",
        tag: "<img>",
        title: "Ventanas Visuales",
        explanation: "La etiqueta <img> no tiene cierre. Usa 'src' para la ruta y 'alt' para describir la imagen. El 'alt' es obligatorio para el SEO.",
        instruction: "Añade una imagen con `src=\"foto.webp\"` y un texto `alt` descriptivo.",
        exampleSnippet: "<img src=\"url\" alt=\"descripción\">",
        xpReward: 200
      }
    ],
    theory: {
      text: "Las imágenes venden emociones. Sin el atributo 'alt', eres invisible para Google Imágenes y para personas con discapacidad visual.",
      exampleCode: "<img src=\"logo.png\" alt=\"Logo\">",
      cleanCode: "Multimedia",
      visualIcon: "🖼️",
      proTip: "Usa formatos WebP para que tu web cargue a la velocidad del rayo."
    }
  },
  {
    id: 5,
    title: "5. Armadura Semántica (Estructura)",
    description: "Organiza tu código como un profesional. Dale significado real a cada parte.",
    status: ModuleStatus.ACTIVE,
    xpReward: 1000,
    steps: [
      {
        id: "header",
        tag: "<header>",
        title: "La Corona",
        explanation: "El <header> agrupa logo y navegación. Le dice al navegador: 'Esto es lo primero que debes ver'.",
        instruction: "Envuelve tu navegación en un `<header></header>`.",
        exampleSnippet: "<header>\n  <nav>...</nav>\n</header>",
        xpReward: 250
      },
      {
        id: "main",
        tag: "<main>",
        title: "El Núcleo",
        explanation: "Solo hay un <main>. Contiene la razón de ser de tu página. Es la parte más importante para Google.",
        instruction: "Crea un contenedor `<main></main>` para tu contenido principal.",
        exampleSnippet: "<main>\n  <p>Texto único...</p>\n</main>",
        xpReward: 300
      },
      {
        id: "footer",
        tag: "<footer>",
        title: "El Cierre",
        explanation: "El <footer> contiene datos legales y contacto. Es donde el usuario busca seguridad final.",
        instruction: "Añade un `<footer>` con el texto de copyright al final del body.",
        exampleSnippet: "<footer>\n  <p>&copy; 2025</p>\n</footer>",
        xpReward: 250
      }
    ],
    theory: {
      text: "La semántica separa aficionados de ingenieros. Usar tags correctos hace que Google te ame y tus clientes confíen.",
      exampleCode: "<header></header>\n<main></main>\n<footer></footer>",
      cleanCode: "Arquitectura",
      visualIcon: "🦴",
      proTip: "No uses <div> para todo; usa etiquetas con significado."
    }
  },
  {
    id: 6,
    title: "6. Caja Registradora (Formularios)",
    description: "Convierte visitas en dinero capturando datos reales.",
    status: ModuleStatus.ACTIVE,
    xpReward: 1500,
    steps: [
      {
        id: "form",
        tag: "<form>",
        title: "Recinto de Datos",
        explanation: "El <form> agrupa la información para enviarla. Es tu herramienta de venta principal.",
        instruction: "Dentro del <main>, crea un contenedor `<form>`.",
        exampleSnippet: "<form>\n</form>",
        xpReward: 200
      },
      {
        id: "input",
        tag: "Email",
        title: "Filtro Inteligente",
        explanation: "Type='email' verifica que pongan un @ real. Te ahorra errores y correos falsos.",
        instruction: "Añade un `<input type=\"email\" placeholder=\"Tu email\">`.",
        exampleSnippet: "<input type=\"email\">",
        xpReward: 300
      },
      {
        id: "button",
        tag: "Submit",
        title: "El Gatillo",
        explanation: "Sin el botón 'submit', el formulario no sirve de nada. Es el que dispara la acción de envío.",
        instruction: "Añade un `<button type=\"submit\">Suscribirme</button>`.",
        exampleSnippet: "<button type=\"submit\">Enviar</button>",
        xpReward: 300
      }
    ],
    theory: {
      text: "Un formulario es una conversación comercial. Pide solo lo necesario para no cansar al cliente.",
      exampleCode: "<form><input><button>OK</button></form>",
      cleanCode: "Captación",
      visualIcon: "📥",
      proTip: "Usa el atributo 'required' para evitar envíos vacíos."
    }
  },
  {
    id: 7,
    title: "7. Almacén de Datos (Listas)",
    description: "Ordena el caos. Muestra beneficios de forma clara y rápida.",
    status: ModuleStatus.ACTIVE,
    xpReward: 1200,
    steps: [
      {
        id: "ul",
        tag: "<ul>",
        title: "Lista de Ventajas",
        explanation: "Las listas (<ul>) son perfectas para resumir beneficios. El cerebro las procesa mucho más rápido.",
        instruction: "Crea una lista `<ul>` con 3 elementos `<li>`.",
        exampleSnippet: "<ul>\n  <li>Rapidez</li>\n  <li>Poder</li>\n</ul>",
        xpReward: 300
      }
    ],
    theory: {
      text: "La claridad vende. Las listas rompen la monotonía y facilitan la toma de decisiones del cliente.",
      exampleCode: "<ul><li>Beneficio</li></ul>",
      cleanCode: "Orden",
      visualIcon: "📊",
      proTip: "Usa listas ordenadas (<ol>) para guías paso a paso."
    }
  },
  {
    id: 8,
    title: "8. El ADN Invisible (SEO)",
    description: "Domina cómo te ven Google y las Redes Sociales.",
    status: ModuleStatus.ACTIVE,
    xpReward: 2000,
    steps: [
      {
        id: "meta-desc",
        tag: "<meta>",
        title: "Gancho en Google",
        explanation: "La meta-description es el resumen bajo tu link en Google. Es tu última oportunidad de atraer el clic.",
        instruction: "En el <head>, añade: `<meta name=\"description\" content=\"Aprende con Cortex.\">`.",
        exampleSnippet: "<meta name=\"description\" content=\"...\">",
        xpReward: 500
      },
      {
        id: "og-title",
        tag: "og:title",
        title: "Impacto Social",
        explanation: "Controla cómo se ve tu link en WhatsApp o Facebook. Te permite elegir el título social.",
        instruction: "Añade en el <head>: `<meta property=\"og:title\" content=\"Master Pro\">`.",
        exampleSnippet: "<meta property=\"og:title\" content=\"...\">",
        xpReward: 500
      }
    ],
    theory: {
      text: "Lo que el cliente no ve, el buscador lo adora. El SEO técnico es la base del crecimiento real.",
      exampleCode: "<meta name=\"description\" content=\"...\">",
      cleanCode: "SEO Elite",
      visualIcon: "🔍",
      proTip: "No superes los 160 caracteres en tus descripciones."
    }
  }
];
