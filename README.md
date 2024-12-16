# Actividad 2 Camila Quirola

Este proyecto es una demostración de cómo utilizar **Web Components** para crear una página web modular y reutilizable. 

## Descripción de los Componentes

### 1. **`header.js`** - Componente del Encabezado
El componente `HeaderComponent` se encarga de mostrar el encabezado de la página, que incluye el título de la aplicación y un subtítulo. Utiliza un shadow DOM para encapsular los estilos y el contenido, lo que asegura que no interfiera con otros estilos de la página.

#### Funcionamiento:
- El encabezado tiene un fondo con un degradado lineal y texto centrado.
- Se utiliza la fuente Poppins de Google Fonts.
- El `header` está diseñado para ser visualmente llamativo y moderno, con un sombreado sutil y un tamaño de texto adecuado.


### 2. **`footer.js`** - Componente del Pie de Página
El componente `FooterComponent` muestra un pie de página fijo en la parte inferior de la página.

- El pie de página tiene un fondo con un degragado lineal similar al encabezado.
- Está fijado en la parte inferior con `position: fixed`, por lo que siempre es visible mientras se navega.
- Muestra el año actual utilizando `new Date().getFullYear()`.

### 3. **`customTable.js`** - Componente de la Tabla
El componente `CustomTable` permite mostrar una tabla dinámica que obtiene datos de una API proporcionada a través de un atributo `endpoint`.

#### Funcionamiento:
- El componente realiza una solicitud `fetch` para obtener los datos de una API.
- Los datos obtenidos se muestran en una tabla, incluyendo un efecto de hover en las filas.
- Si no se proporciona un `endpoint`, muestra un mensaje de error.

### 4. **`gallery.js`** - Componente de la Galería de Imágenes
El componente `CustomGallery` muestra una galería de imágenes con un diseño en cuadrícula. Cada ítem tiene una imagen y una descripción, obtenidos de una API.

#### Funcionamiento:
- Al igual que `customTable.js`, obtiene datos de una API para llenar la galería.
- Cada imagen tiene un efecto de hover que aumenta su tamaño y agrega un sombreado en el texto de la descripción.
- La galería usa una cuadrícula flexible.

### 5. **`menu.js`** - Componente del Menú de Navegación
El componente `MenuComponent` proporciona un menú de navegación con enlaces que permiten a los usuarios navegar por la aplicación. El diseño es sencillo y accesible.

### 6. **`socialProfile.js`** - Componente de Perfil Social
El componente `SocialProfile` permite mostrar un perfil social, incluyendo una foto, nombre y enlaces a redes sociales. 

#### Funcionamiento:
- Muestra la foto del perfil, el nombre y enlaces a las redes sociales.


### 7. **`main.js`** - Componente Principal
El componente `MainComponent` integra todos los componentes anteriores para crear una página web completa. Este archivo maneja la estructura y organización de la página, colocando los componentes en su lugar adecuado.

#### Funcionamiento:
- El componente usa todos los componentes definidos anteriormente.
- Organiza el contenido, con el encabezado en la parte superior, el menú de navegación, y luego el contenido principal (tabla, galería, etc.).


### `index.html` - Página Principal
El archivo `index.html` es la entrada principal del proyecto. Aquí se incluyen los componentes personalizados y se inicializa la página web. Se asegura de cargar correctamente todos los archivos JavaScript y los componentes.

