// Definición de un nuevo componente personalizado llamado CustomTable
class CustomTable extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase base HTMLElement

        // Crear el Shadow DOM para encapsular el contenido y estilos
        this.shadow = this.attachShadow({ mode: 'open' });

        // Crear un contenedor para la tabla
        this.tableContainer = document.createElement('div');
        this.tableContainer.classList.add('table-container');

        // Crear los estilos del componente
        const style = document.createElement('style');
        style.textContent = `
            /* Estilos para el contenedor de la tabla */
            .table-container {
                width: 100%;
                overflow-x: auto;
                margin: 20px 0;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            /* Estilos para la tabla */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 0;
                font-family: 'Poppins', Arial, sans-serif;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
            }

            /* Estilos para las celdas de la tabla */
            th, td {
                border: 1px solid #ddd;
                padding: 12px 15px;
                text-align: left;
                font-size: 1rem;
            }

            /* Estilos específicos para las celdas de encabezado */
            th {
                background-color: #f4f4f4;
                font-weight: 600;
                color: #333;
            }

            /* Estilos para las celdas de datos */
            td {
                background-color: #fafafa;
                color: #555;
                transition: background-color 0.3s ease;
            }

            /* Efecto hover sobre las celdas de datos */
            td:hover {
                background-color: #e2e2e2;
            }

            /* Estilos para las filas pares */
            tr:nth-child(even) td {
                background-color: #f9f9f9;
            }

            /* Efecto hover sobre las filas */
            tr:hover {
                background-color: #eaeaea;
            }

            /* Estilos para el mensaje de error */
            .message-error {
                color: red;
                font-weight: bold;
                margin: 1rem 0;
                text-align: center;
            }

            .message-error a {
                color: #ff0000;
                text-decoration: underline;
            }

            /* Estilos para pantallas pequeñas */
            @media screen and (max-width: 768px) {
                table {
                    font-size: 0.9rem;
                }
                th, td {
                    padding: 8px;
                }
            }
        `;

        // Crear la plantilla HTML básica para la tabla
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4">Cargando datos...</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Agregar los estilos y el contenedor de la tabla al Shadow DOM
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.tableContainer);
    }

    // Método que se llama cuando el componente es añadido al DOM
    connectedCallback() {
        // Obtiene el atributo `endpoint` definido en el componente
        const urlApi = this.getAttribute('endpoint');
        if (urlApi) {
            this.fetchData(urlApi); // Si existe el endpoint, se obtienen los datos de la API
        } else {
            // Si no se proporciona un endpoint, se muestra un mensaje de error
            this.tableContainer.innerHTML = `<p class="message-error">Error: No se proporcionó un endpoint</p>`;
        }
    }

    // Método que obtiene los datos de la API
    fetchData = async (url) => {
        try {
            const response = await fetch(url); // Realiza la solicitud a la API
            const data = await response.json(); // Convierte la respuesta en formato JSON
            const users = data || []; // Si no hay datos, se usa un array vacío
            this.render(users); // Llama al método para renderizar la tabla con los datos
        } catch (error) {
            console.error('Error al cargar datos de la API:', error);
            // Muestra un mensaje de error si la API no responde correctamente
            this.tableContainer.innerHTML = `<p class="message-error">Error al cargar los datos</p>`;
        }
    };

    // Método que renderiza los datos obtenidos en la tabla
    render = (users) => {
        const tbody = document.createElement('tbody'); // Crea un cuerpo de tabla vacío
        this.tableContainer.innerHTML = ''; // Limpia el contenido previo de la tabla
        const table = this.template.content.cloneNode(true).querySelector('table'); // Clona la plantilla de la tabla
        table.querySelector('tbody').remove(); // Elimina el cuerpo de la tabla por defecto

        // Itera sobre los datos de los usuarios y agrega filas a la tabla
        users.forEach(user => {
            const row = document.createElement('tr'); // Crea una nueva fila
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name || `${user.first_name} ${user.last_name}`}</td>
                <td>${user.email}</td>
                <td>${user.phone || 'No disponible'}</td>
            `;
            tbody.appendChild(row); // Agrega la fila al cuerpo de la tabla
        });

        table.appendChild(tbody); // Agrega el cuerpo de la tabla al elemento table
        this.tableContainer.appendChild(table); // Agrega la tabla completa al contenedor
    };
}

// Definir el componente personalizado 'custom-table'
customElements.define('custom-table', CustomTable);
