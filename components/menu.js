// Definición de un nuevo componente personalizado llamado MenuComponent
class MenuComponent extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement
        const shadow = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular los estilos y contenido

        // Definir los estilos del componente en una constante
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para el menú de navegación */
            nav {
                display: flex;
                justify-content: center;
                gap: 2rem;
                background: linear-gradient(90deg, #6a11cb, #2575fc);
                padding: 1rem 2rem;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 0 0 10px 10px;
            }

            /* Estilos para los enlaces dentro del menú */
            a {
                text-decoration: none;
                font-family: 'Poppins', Arial, sans-serif;
                color: #fff;
                font-size: 1.2rem; 
                font-weight: 600;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                transition: all 0.3s ease;
            }

            /* Estilo para el enlace activo */
            a.active {
                background-color: rgba(255, 255, 255, 0.2);
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
            }

            /* Efecto hover sobre los enlaces */
            a:hover {
                background-color: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);
            }
        `;

        // Se agregan los estilos al Shadow DOM
        shadow.appendChild(style);

        // Se estructura el HTML del menú de navegación
        shadow.innerHTML += `
            <nav>
                <a href="#home" data-target="home" class="active">Inicio</a>
                <a href="#profile" data-target="profile">Perfil</a>
                <a href="#table" data-target="table">Tabla</a>
                <a href="#gallery" data-target="gallery">Galería</a>
            </nav>
        `;
    }

    // Método llamado cuando el componente se conecta al DOM
    connectedCallback() {
        this.attachEventListeners(); // Se agregan los event listeners
    }

    // Método para agregar los listeners a los enlaces
    attachEventListeners() {
        const links = this.shadowRoot.querySelectorAll('a'); // Seleccionamos todos los enlaces del menú
        const mainSections = document.querySelectorAll('app-main > div'); // Seleccionamos todas las secciones del main

        // Iteramos sobre los enlaces
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevenimos el comportamiento por defecto del enlace

                // Eliminar la clase 'active' de todos los enlaces
                links.forEach(l => l.classList.remove('active'));

                // Agregar la clase 'active' al enlace que ha sido clickeado
                link.classList.add('active');

                // Obtenemos la sección objetivo desde el atributo 'data-target' del enlace
                const targetId = link.getAttribute('data-target');

                // Ocultamos todas las secciones y mostramos solo la seleccionada
                mainSections.forEach(section => section.hidden = true);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.hidden = false; // Mostramos la sección seleccionada
                }
            });
        });
    }
}

// Registramos el componente personalizado en el DOM
customElements.define('custom-menu', MenuComponent);
