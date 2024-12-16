// Definición del nuevo componente personalizado 'HeaderComponent'
class HeaderComponent extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement
        const shadow = this.attachShadow({ mode: 'open' }); // Crea el Shadow DOM para el encapsulamiento

        // Crear y aplicar los estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            /* Importar fuente de Google Fonts */
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

            /* Estilo del header */
            header {
                background: linear-gradient(90deg, #3a3a3a, #595959); /* Fondo degradado */
                color: white; /* Color de texto blanco */
                text-align: center; /* Alineación centrada del texto */
                padding: 2rem 3rem; /* Espaciado interno */
                font-family: 'Poppins', Arial, sans-serif; /* Fuente personalizada */
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
                position: relative; /* Posicionamiento relativo para control adicional */
            }

            /* Estilo para el título principal (h1) */
            h1 {
                margin: 0; /* Eliminar márgenes */
                font-size: 2.5rem; /* Tamaño de fuente grande */
                font-weight: 600; /* Peso de fuente seminegrita */
                letter-spacing: 2px; /* Espaciado entre letras */
                text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); /* Sombra para el texto */
            }

            /* Estilo para el subtítulo (h2) */
            h2 {
                font-size: 1.3rem; /* Tamaño de fuente más pequeño */
                font-weight: 400; /* Peso de fuente normal */
                margin: 0.5rem 0; /* Márgenes superior e inferior */
                color: rgba(255, 255, 255, 0.9); /* Color blanco con opacidad */
            }

            /* Estilo para el párrafo (p) */
            p {
                font-size: 1rem; /* Tamaño de fuente más pequeño */
                font-weight: 300; /* Peso de fuente más ligero */
                margin-top: 0.5rem; /* Márgen superior */
                color: rgba(255, 255, 255, 0.7); /* Color blanco con opacidad más baja */
            }
        `;

        // Agregar el estilo al Shadow DOM
        shadow.appendChild(style);

        // Estructura HTML del header (se agrega directamente al Shadow DOM)
        shadow.innerHTML += `
            <header>
                <h1>Mi Aplicación Web</h1>
                <h2>Actividad 2</h2>
                <p>Desarrollado por Camila Quirola</p>
            </header>
        `;
    }
}

// Registrar el componente como 'app-header'
customElements.define('app-header', HeaderComponent);
