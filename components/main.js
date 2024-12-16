// Definición de un nuevo componente personalizado llamado MainComponent
class MainComponent extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement
        const shadow = this.attachShadow({ mode: 'open' }); // Crea un Shadow DOM para encapsular los estilos y el contenido

        // Se crea un contenedor de estilos para el componente
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para el componente main */
            main {
                padding: 2rem 3rem 10rem 3rem; 
                font-family: 'Poppins', Arial, sans-serif; 
                box-sizing: border-box; 
            }

        `;

        // Se agrega el estilo al Shadow DOM
        shadow.appendChild(style);

        // Estructura HTML del componente MainComponent
        shadow.innerHTML += `
            <main>
                <slot></slot> <!-- El slot permite insertar contenido personalizado dentro del componente -->
            </main>
        `;
    }
}

// Se registra el componente personalizado para usarlo en el HTML
customElements.define('app-main', MainComponent);
