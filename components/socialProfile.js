// Definición de un nuevo componente personalizado llamado SocialProfile
class SocialProfile extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement

        // Crear el Shadow DOM para encapsular el contenido y estilos
        this.shadow = this.attachShadow({ mode: 'open' });

        // Crear un contenedor para el perfil
        this.profileContainer = document.createElement('div');
        this.profileContainer.classList.add('profile-container');

        // Crear los estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para el contenedor del perfil */
            .profile-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #f4f4f4;
                padding: 25px;
                border-radius: 12px; 
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                width: 320px;
                text-align: center;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            /* Efecto hover sobre el contenedor */
            .profile-container:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            }

            /* Estilos para el encabezado del perfil */
            .profile-header {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            /* Estilos para la imagen del avatar */
            .profile-header img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                margin-bottom: 15px;
                border: 4px solid #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            }

            /* Estilo para el nombre del usuario */
            .profile-header h2 {
                font-size: 1.6rem;
                margin: 8px 0;
                font-weight: 600;
                color: #333;
            }

            /* Estilo para la descripción del usuario */
            .profile-header p {
                font-size: 1rem;
                color: #777;
                line-height: 1.4;
                margin-bottom: 20px;
            }

            /* Estilo para los enlaces de redes sociales */
            .social-links {
                display: flex;
                justify-content: center;
                gap: 15px;
            }

            .social-links a {
                text-decoration: none;
                color: #007bff;
                font-size: 1.4rem;
                transition: color 0.3s ease;
            }

            /* Efecto hover sobre los enlaces de redes sociales */
            .social-links a:hover {
                color: #0056b3;
            }

            /* Centrado del componente */
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;

        // Crear la plantilla HTML para el perfil
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <div class="profile-header">
                <img src="" alt="Avatar de usuario">
                <h2>Nombre del Usuario</h2>
                <p>Descripción del perfil...</p>
            </div>
            <div class="social-links">
                <a href="#" target="_blank" class="facebook">Facebook</a>
                <a href="#" target="_blank" class="twitter">Twitter</a>
                <a href="#" target="_blank" class="instagram">Instagram</a>
            </div>
        `;

        // Ensamblar el Shadow DOM con los estilos y el contenido de la plantilla
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.profileContainer);
        this.profileContainer.appendChild(this.template.content.cloneNode(true));
    }

    // Método que se llama cuando el componente es añadido al DOM
    connectedCallback() {
        // Obtener los atributos del componente para personalizar el perfil
        const avatarUrl = this.getAttribute('avatar') || 'https://via.placeholder.com/100'; // URL del avatar, por defecto una imagen de placeholder
        const userName = this.getAttribute('name') || 'Nombre del Usuario'; // Nombre del usuario
        const userDescription = this.getAttribute('description') || 'Descripción del perfil...'; // Descripción del usuario
        const facebookLink = this.getAttribute('facebook') || '#'; // Enlace a Facebook
        const twitterLink = this.getAttribute('twitter') || '#'; // Enlace a Twitter
        const instagramLink = this.getAttribute('instagram') || '#'; // Enlace a Instagram

        // Actualizar los elementos HTML dentro del Shadow DOM con los valores de los atributos
        const profileImage = this.shadow.querySelector('img');
        const profileName = this.shadow.querySelector('h2');
        const profileDescription = this.shadow.querySelector('p');
        const facebookLinkElem = this.shadow.querySelector('.social-links a:nth-child(1)');
        const twitterLinkElem = this.shadow.querySelector('.social-links a:nth-child(2)');
        const instagramLinkElem = this.shadow.querySelector('.social-links a:nth-child(3)');

        // Asignar los valores a los elementos del perfil
        profileImage.src = avatarUrl;
        profileImage.alt = `Avatar de ${userName}`;
        profileName.textContent = userName;
        profileDescription.textContent = userDescription;
        facebookLinkElem.href = facebookLink;
        twitterLinkElem.href = twitterLink;
        instagramLinkElem.href = instagramLink;
    }
}

// Definir el componente personalizado 'social-profile'
customElements.define('social-profile', SocialProfile);
