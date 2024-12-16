// Definición de un nuevo componente personalizado llamado CustomGallery
class CustomGallery extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement

        // Crear el Shadow DOM para encapsular el contenido y estilos
        this.shadow = this.attachShadow({ mode: 'open' });

        // Crear un contenedor para la galería
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery-container');

        // Crear los estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para el contenedor de la galería */
            .gallery-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
                margin: 1rem;
                padding: 10px;
                box-sizing: border-box;
            }

            /* Estilos para cada ítem de la galería */
            .gallery-item {
                position: relative;
                text-align: center;
                border-radius: 10px;
                overflow: hidden;
                background-color: #fff;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: pointer;
                border: 1px solid #ddd;
            }

            /* Efecto hover para los ítems de la galería */
            .gallery-item:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
            }

            /* Estilos para las imágenes dentro de los ítems */
            .gallery-item img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            /* Efecto hover sobre la imagen */
            .gallery-item:hover img {
                transform: scale(1.1);
            }

            /* Estilos para la descripción dentro de cada ítem */
            .gallery-item p {
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                font-size: 1rem;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0;
                text-align: center;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }

            /* Efecto hover sobre la descripción */
            .gallery-item:hover p {
                background-color: rgba(0, 0, 0, 0.8);
            }

            /* Estilos para los mensajes de error */
            .message-error {
                color: red;
                font-weight: bold;
                margin: 1rem 0;
                text-align: center;
            }
        `;

        // Plantilla de un ítem dentro de la galería
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="gallery-item">
                <img src="" alt="Imagen de galería">
                <p></p>
            </div>
        `;

        // Ensamblar el Shadow DOM
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.galleryContainer);
    }

    // Método llamado cuando el componente se conecta al DOM
    connectedCallback() {
        // Obtener el atributo 'endpoint' que contiene la URL de la API
        const urlApi = this.getAttribute('endpoint');
        if (urlApi) {
            this.fetchData(urlApi); // Si existe un endpoint, se cargan los datos desde esa URL
        } else {
            // Si no se proporciona el endpoint, muestra un mensaje de error
            this.galleryContainer.innerHTML = `<p class="message-error">Error: No se proporcionó un endpoint</p>`;
        }
    }

    // Método para obtener los datos de la API
    fetchData = async (url) => {
        try {
            const response = await fetch(url); // Realiza una solicitud GET a la API
            const data = await response.json(); // Convierte la respuesta en formato JSON
            const items = data.results || []; // Extrae los ítems de los datos

            // Obtener detalles adicionales de cada ítem mediante su URL
            const detailedItems = await Promise.all(
                items.map(async item => {
                    const res = await fetch(item.url); // Realiza una solicitud adicional para obtener detalles
                    return await res.json();
                })
            );

            // Renderiza los ítems detallados en la galería
            this.render(detailedItems);
        } catch (error) {
            console.error('Error al cargar datos de la API:', error);
            // Muestra un mensaje de error si la API falla
            this.galleryContainer.innerHTML = `<p class="message-error">Error al cargar la galería</p>`;
        }
    };

    // Método para renderizar los ítems en la galería
    render = (items) => {
        this.galleryContainer.innerHTML = ''; // Limpia el contenido previo de la galería

        // Itera sobre los ítems y agrega cada uno a la galería
        items.forEach(item => {
            const card = this.template.content.cloneNode(true); // Clona la plantilla de un ítem
            const image = card.querySelector('img'); // Selecciona la imagen del ítem
            const description = card.querySelector('p'); // Selecciona la descripción del ítem

            // Suponer un formato estándar de la API; adaptarlo según el formato real
            image.src = item.avatar || item.image || item.sprites?.front_default || 'https://via.placeholder.com/150'; // Usar imagen o placeholder
            image.alt = item.name || item.title || 'Imagen sin descripción'; // Descripción alternativa para la imagen
            description.textContent = item.name || item.title || 'Sin descripción'; // Texto de la descripción

            // Agregar el ítem a la galería
            this.galleryContainer.appendChild(card);
        });
    };
}

// Registrar el nuevo elemento personalizado 'custom-gallery'
customElements.define('custom-gallery', CustomGallery);
