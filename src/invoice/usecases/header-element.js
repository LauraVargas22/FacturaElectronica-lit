import {LitElement, html, css} from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export class HeaderElement extends LitElement {

    static properties = {
        personalData: {type: Object},
    }
    constructor() {
        super(),
        this.personalData = {
            numID: '',
            names: '',
            surname: '',
            email: '', 
            address: ''
        }
    }

    updatePersonalData(event) {
        const field = event.target.name;
        const value = event.target.value;
        this.personalData = {
            ...this.personalData,
            [field]: value, // Actualiza solo el campo correspondiente.
        };
        return this.personalData;
    }

    createRenderRoot(){
        return this;
    }

    render() {
        //Crea ID de la factura
        let numInvoice = Date.now().toString(16);
        return html`
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
            <label for="address" class="col-3 form-label">Address</label>
            <div class="col-6">
                <input type="text" @input="${this.updatePersonalData}" class="form-control" name="address" id="address" placeholder="Enter Address..." required>
            </div>
        </div>
        <!--Email-->
        <div class="row p-4">
            <label for="email" class="col-3 form-label">Email</label>
            <div class="col-6">
                <input type="email" @input="${this.updatePersonalData}" class="form-control" name="email" id="email" placeholder="Enter email..." required>
            </div>
        </div>
        `
    }
}
customElements.define('header-element', HeaderElement);