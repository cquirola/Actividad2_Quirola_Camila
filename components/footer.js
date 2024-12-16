// Definición del nuevo componente personalizado 'FooterComponent'
class FooterComponent extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement
        const shadow = this.attachShadow({ mode: 'open' }); // Crea el Shadow DOM para el encapsulamiento

        // Crear y aplicar los estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            /* Importar fuente de Google Fonts */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

            /* Estilo para el footer */
            footer {
                background: linear-gradient(90deg, #3a3a3a, #595959); /* Fondo degradado */
                color: white; /* Color de texto blanco */ 
                text-align: center; /* Alineación centrada del texto */
                padding: 1rem 0; /* Espaciado interno */
                font-family: 'Poppins', Arial, sans-serif; /* Fuente personalizada */
                font-size: 0.9rem; /* Tamaño de fuente más pequeño */
                box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil en la parte superior */
                position: fixed; /* Fijar el footer en la parte inferior */
                bottom: 0; /* Ubicarlo en la parte inferior */
                left: 0; /* Alineado a la izquierda */
                width: 100%; /* Ancho completo */
                z-index: 100; /* Asegura que el footer esté por encima de otros elementos */
            }

            /* Estilo para el párrafo en el footer */
            p {
                margin: 0.5rem 0; /* Márgenes superior e inferior */
                font-weight: 300; /* Peso de fuente más ligero */
            }

            /* Estilo para los enlaces (a) */
            a {
                color: #4CAF50; /* Color verde para los enlaces */
                text-decoration: none; /* Eliminar subrayado */
                font-weight: 600; /* Peso de fuente negrita */
            }

            a:hover {
                text-decoration: underline; /* Subrayar el enlace al pasar el mouse */
            }

            /* Estilo para los enlaces del footer */
            .footer-links {
                margin-top: 1rem; /* Márgenes superior */
            }

            .footer-links a {
                margin: 0 10px; /* Espaciado entre enlaces */
                font-size: 1rem; /* Tamaño de fuente para los enlaces */
                color: #f1f1f1; /* Color gris claro para los enlaces */
            }

            .footer-links a:hover {
                color: #fff; /* Cambiar color al pasar el mouse */
            }
        `;

        // Agregar el estilo al Shadow DOM
        shadow.appendChild(style);

        // Estructura HTML del footer
        shadow.innerHTML += `
            <footer>
                <p>&copy; ${new Date().getFullYear()} Mi Aplicación Web. Todos los derechos reservados.</p>
                <p>Desarrollado por Camila Quirola</p>
                <!-- Se pueden agregar más enlaces de interés en el footer si es necesario -->
                <div class="footer-links">
                    <a href="#">Enlace 1</a>
                    <a href="#">Enlace 2</a>
                    <a href="#">Enlace 3</a>
                </div>
            </footer>
        `;
    }
}

// Registrar el componente como 'app-footer'
customElements.define('app-footer', FooterComponent);
