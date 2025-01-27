import {LitElement, html, css} from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export class HeaderElement extends LitElement {

    static properties = {
        personalData: {type: Object}, //Declaración de la propiedad personalData como objeto
    }

    constructor() {
        super(), //Constructor de la superclase
        this.personalData = {}; //Inicialización del objeto creado
    }

    /**
     * Función para actualizar el objeto de información personal cuando el usuario completa los inputs
     * @param {*} event 
     * @returns {Object} Objeto con personalData
     */
    updatePersonalData(event) {
        const field = event.target.name; //Nombre del input
        const value = event.target.value; //Valor que el usuario ingresa
        this.personalData = {
            ...this.personalData,
            [field]: value, // Actualiza el valor ingresado de acuerdo con el nombre del input.
        };
        return this.personalData;
    }

    //Se define donde se renderiza el DOM del componente
    createRenderRoot(){
        return this;
    }

    //Crear marcado HTML del componente
    render() {
        //Crea ID de la factura en hexadécimal
        let numInvoice = Date.now().toString(16);
        return html`
        <!--Número de factura-->
        <div class="row p-4">
            <label for="numInvoice" class="col-3 form-label">Num Invoice</label>
            <div class="col-6">
            <!--ID predeterminado-->
            <input class="form-control" @input="${this.updatePersonalData}" type="text" placeholder="${numInvoice}" aria-label="Disabled input example" disabled>
            </div>
        </div>
        <!--Identificación-->
        <div class="row p-4">
            <label for="numID" class="col-3 form-label">ID</label>
            <div class="col-6">
            <!--Se actualizan los datos-->
            <input type="number" @input="${this.updatePersonalData}" class="form-control" name="numID" id="numId" placeholder="Enter ID..." required>
            </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 p-4">
            <!--Nombres-->
            <div class="col">
                <label for="names" class="form-label">Name</label>
                <input id="names" @input="${this.updatePersonalData}" type="text" class="form-control" name="names" placeholder="Enter Names..." required>
            </div>
            <!--Apellidos-->
            <div class="col">
                <label for="surname" class="form-label">Surname</label>
                <input type="text" @input="${this.updatePersonalData}" class="form-control" id="surname" name="surname" placeholder="Enter Surname..." required>
            </div>
        </div>
        <!--Dirección-->
        <div class="row p-4">
            <label for="address" class="col-6 form-label">Address</label>
            <div class="col-6">
                <input type="text" @input="${this.updatePersonalData}" class="form-control" name="address" id="address" placeholder="Enter Address..." required>
            </div>
        </div>
        <!--Email-->
        <div class="row p-4">
            <label for="email" class="col-6 form-label">Email</label>
            <div class="col-6">
                <input type="email" @input="${this.updatePersonalData}" class="form-control" name="email" id="email" placeholder="Enter email..." required>
            </div>
        </div>
        `
    }
}
customElements.define('header-element', HeaderElement);