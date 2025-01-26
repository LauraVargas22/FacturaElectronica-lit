import {LitElement, html, css} from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Swal from 'sweetalert2'

export class RegisterElement extends LitElement {
    
    static properties = {
        products: { type: Array },
        summary: {type: Object},
        visible: {type: Boolean},
        personalData: { type: Object },
    }

    constructor() {
        super()
        this.personalData = {};
        this.products = [];
        this.summary = {};
        this.visible = false;
    }

    createRenderRoot(){
        return this;
    }

    addProduct(){
        const id = Date.now().toString(16);
        this.products = [
            ...this.products,
            {
                id,
                nameProduct: '',
                unitValue: 0,
                quantity: 0,
                subT: 0,
            },
        ];
    }

    removeProduct(event) {
        const idToRemove = event.target.dataset.id;
        this.products = this.products.filter((product) => product.id !== idToRemove);
    }

    summaryValues() {
        let subTotal = 0;
        
        this.products.forEach((product) => {
            const unitValue = parseFloat(product.unitValue) || 0;
            const quantity = parseFloat(product.quantity) || 0;
            subTotal += unitValue * quantity;
        });
        
        const vat = (subTotal * 0.19);
        const total = subTotal + vat;
        
        this.summary = {
            subTotal,
            vat,
            total,
        }

        return this.summary;
    }

    headerPersonalData(){
        this.personalData = {
            names: document.getElementById('names')?.value || '',
            surname: document.getElementById('surname')?.value || '',
            numID: document.getElementById('numId')?.value || '',
        }

        return this.personalData;
    }

    popUpOpen() {
        const {names, surname, numID} = this.headerPersonalData();
        if(!names || !surname || !numID) {
            Swal.fire({
                title: "Error",
                text: "Please, complete all personal data",
                icon: "warning",
            });
            return;
        }
        this.visible = true;
    }

    popUpClose() {
        this.visible = false;
    }
    
    confirm(){
        this.visible = false;

        Swal.fire({
            title: "Thank you for your purchase.",
            icon: "success",
            draggable: true
        }).then(() => {
            // Recarga la página después de cerrar el popup
            location.reload();
        });
    }

    render() {
        const {subTotal, vat, total} = this.summaryValues();
        const {names, surname, numID} = this.headerPersonalData();
        return html /*HTML*/ `
        <!--Cartas para registrar productos-->
        <div class="col-12">
          <div class="card border-secondary mb-3" style="max-width: 100%;">
              <div id="products_title" class="card-header">Products</div>
              <div class="card-body">
                <h5 id="products_text" class="card-title">Register your products here</h5>
                <button @click="${this.addProduct}" type="button" class="btn btn-primary" id="addProduct">+</button>
                <div class="container detailProducts">
                ${this.products.map((product) => html /*HTML*/ `
                    <div class="row mt-3" id="numProducts${product.id}">
                    <!--Código del producto generado automáticamente-->
                    <div class="row p-4">
                        <label for="cod" class="col-6 form-label">COD</label>
                        <div class="col-6">
                        <input class="form-control" type="text" value="${product.id}" placeholder="${product.id}" aria-label="Disabled input example" disabled>
                        </div>
                    </div>
                    <!--Input para el nombre del producto-->
                    <div class="row p-4">
                        <label class="col-6 form-label">Name Product</label>
                        <div class="col-6">
                            <input type="text" class="border-secondary form-control product-input" @input="${(e) => this.updateProductField(product.id, 'nameProduct', e.target.value)}" .value="${product.nameProduct}" required/>
                        </div>
                    </div>
                    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 p-4">
                    <!--Input para el valor unitario del producto-->
                        <div class="col">
                            <label class="form-label">Unit Value</label>
                            <input type="text" class="border-secondary form-control product-input" @input="${(e) => this.updateProductField(product.id, 'unitValue', e.target.value)}" .value="${product.unitValue}" required/>
                        </div>
                        <!--Input para la cantidad a comprar-->
                        <div class="col">
                            <label class="form-label">Quantity</label>
                            <input type="text" class="border-secondary form-control product-input" @input="${(e) => this.updateProductField(product.id, 'quantity', e.target.value)}" .value="${product.quantity}" required/>
                        </div>
                    </div>
                    <!--Botón para eliminar productos-->
                    <div class="col-2">
                        <button @click="${this.removeProduct}" type="button" class="btn btn-danger remove-product" data-id="${product.id}">-</button>
                    </div>
                </div>
                `)}
                </div>
              </div>
            </div>
        </div>
        <div class="table-responsive">
            <table id="tableProducts" class="table">
                <!--Encabezado de la tabla-->
                <thead>
                <tr>
                    <th>COD</th>
                    <th>NAME</th>
                    <th>V/UNIT</th>
                    <th>QUANTITY</th>
                    <th>SUBT</th>
                    <th>-</th>
                </tr>
                </thead>
                <!--Cuerpo de la tabla-->
                <tbody>
                <!--Por cada producto se agrega una fila con la información respectiva-->
                ${this.products.map((product) => html /*HTML*/ `
                    <tr>
                    <td>${product.id}</td>
                    <td id="tableName">${product.nameProduct}</td>
                    <td id="tableUnitValue">${product.unitValue}</td>
                    <td id="tableQuantity">${product.quantity}</td>
                    <td id="tableSubTotal">${((parseFloat(product.unitValue)|| 0) * (parseFloat(product.quantity) || 0)).toFixed(2)}</td>
                    <!--Botón para eliminar producto desde la tabla-->
                    <td><button @click="${this.removeProduct}" type="button" class="btn btn-danger remove-product" data-id="${product.id}">-</button></td>
                    </tr>
                    `)}
                </tbody>
            </table>
        </div>
      <!--Card con la información general de la factura-->
        <div class="d-flex justify-content-end">
            <div id="card" class="card border-0 shadow-sm rounded">
            <div id="card_header" class="card-header text-center fw-bold">
                Invoice Summary
            </div>
            <ul class="list-group list-group-flush">
                <!--Subtotal del valor de la factura-->
                <li id="subTotalInvoice" class="list-group-item d-flex justify-content-between align-items-center">SubTotal: ${subTotal.toFixed(2)}</li>
                <!--Impuesto respecto al subtotal de la factura-->
                <li id="vatInvoice" class="list-group-item d-flex justify-content-between align-items-center">VAT (19%): ${vat.toFixed(2)}</li>
                <!--Valor total de la factura-->
                <li id="totalInvoice" class="list-group-item d-flex justify-content-between align-items-center">TOTAL: ${total.toFixed(2)}</li>
            </ul>
            </div>
        </div>
        <!--Botón para pagar la factura-->
        <div class="d-flex justify-content-center">
            <button  @click="${this.popUpOpen}" id="btnInvoice" type="button" class="btn btn-secondary">Pay</button>
        </div>
        <!--Ventana emergente al cumplirse el evento pay-->
        <div id="popup" class="popup" style="display: ${this.visible ? 'block' : 'none'};">
            <div class="col">
                <h1 class="title_popup">Invoice</h1>
                <p class="header_popup" id="popUpName">Sr@ ${names} ${surname} </p> <!--Nombre Comprador-->
                <p class="header_popup" id="popUpID">Identificación: ${numID}</p> <!--Identificación del usuario-->
            </div>
            <!--Tabla resumen de la compra realizada-->
            <table id="invoiceProducts" class="table table-striped table-bordered">
                <!--Encabezado de la tabla-->
                <thead>
                <tr>
                    <th id="popUpQuantity">QUANTITY</th>
                    <th id="popUpProduct">PRODUCT</th>
                    <th id="popUpUnit">V/UNIT</th>
                    <th id="popUpSubT">SUBTOTAL</th>
                </tr>
                </thead>
                <!--Cuerpo de la tabla-->
                <tbody>
                <!--Se agregan automáticamente las filas de acuerdo a los productos-->
                    ${this.products.map((product) => html /*HTML*/ `
                        <tr>
                            <td id="tableQuantity">${product.quantity}</td>
                            <td id="tableName">${product.nameProduct}</td>
                            <td id="tableUnitValue">${product.unitValue}</td>
                            <td id="tableSubTotal">${((parseFloat(product.unitValue)|| 0) * (parseFloat(product.quantity) || 0)).toFixed(2)}</td>
                        </tr>
                    `)}
                </tbody>
            </table>
            <!--Cuadro con información general-->
            <div class="d-flex justify-content-end">
                <div id="card" class="card border-0 shadow-sm rounded">
                <div id="card_header" class="card-header text-center fw-bold">
                    Invoice Summary
                </div>
                <ul class="list-group list-group-flush">
                    <!--Subtotal del valor de la factura-->
                    <li id="subTotalInvoice" class="list-group-item d-flex justify-content-between align-items-center">SubTotal: ${subTotal.toFixed(2)}</li>
                    <!--Impuesto respecto al subtotal de la factura-->
                    <li id="vatInvoice" class="list-group-item d-flex justify-content-between align-items-center">VAT (19%): ${vat.toFixed(2)}</li>
                    <!--Valor total de la factura-->
                    <li id="totalInvoice" class="list-group-item d-flex justify-content-between align-items-center">TOTAL: ${total.toFixed(2)}</li>
                </ul>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <!--Botón de confirmación de la compra-->
                <button  @click="${this.confirm}" id="confirm" type="button" class="btn btn-primary">Confirm</button>
            </div>
            <!--Botón para cerrar popup-->
            <button @click="${this.popUpClose}" id="popUpClose" type="button" class="close">&times;</button>
            </div>
        </div>
        `;
    }

    updateProductField(id, field, value) {
        this.products = this.products.map((product) => product.id === id ? { ...product, [field]: value}: product);
    }
}

customElements.define('register-element', RegisterElement);