import {LitElement, html, css} from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Swal from 'sweetalert2'

export class InvoiceElement extends LitElement {
    static properties = {
        personalData: {type: Object},
        products: { type: Array },
        summary: {type: Object},
        invoiceModel: {type: Object},
        visible: {type: Boolean},
    }

    static styles = css`
        /*Botón Pagar*/
        #btnInvoice {
            font-family: "Courier Prime", serif;
            font-weight: 600;
            background: #0E1047;
            color: white;
            font-size: 1.5rem;
            padding: 10px;
            border-radius: 25px;
            width: 6rem;
        }
        
        /*POPUP */
        .popup {
            display: none; /*Oculto por defecto */
            background: #F4F7FC;
            padding: 2rem;
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            max-height: 80%;
            background-color: #E9EFF7;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: fadeIn 0.5s ease-out;
            overflow-y: auto;
            border-radius: 10px;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        }
        
        /* Botón de cierre */
        .close {
            background: #0E1047;
            color: white;
            border-radius: 50%;
            padding: 10px;
            font-size: 30px;
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .close:hover {
            background: #0E1047;
        }
        
        /* Título del Popup */
        .title_popup {
            color: #2F3A56;
            text-align: center;
            font-family: "Courier Prime", serif;
            font-weight: 700;
            font-size: 2.8rem;
            margin-bottom: 1.5rem;
        }
        
        /* Cabecera del Popup (Nombre e ID) */
        .header_popup {
            font-family: "Roboto", sans-serif;
            color: #2F3A56;
            font-weight: 500;
            font-size: 1.8rem;
            background: #FFFFFF;
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 8px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        /* Tabla de Productos */
        #invoiceProducts th {
            background-color: #2F3A56;
            color: white;
            font-family: "Courier Prime", serif;
            font-weight: 600;
            font-size: 1.6rem;
            text-align: center;
            padding: 1rem;
            border-radius: 5px;
        }
        
        /* Filas de la tabla */
        #invoiceProducts td {
            padding: 1rem;
            text-align: center;
            font-size: 1.4rem;
            color: #4A4A4A;
        }
        
        /* Sección de valores (Subtotal, IVA, Total) */
        #values {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-family: "Roboto", sans-serif;
            color: #2F3A56;
            font-weight: 500;
            font-size: 1.8rem;
            padding: 2rem 3rem;
            background-color: #FFFFFF;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            margin-top: 1rem;
        }
        
        /* Efectos de Hover en las filas de la tabla */
        #invoiceProducts tr:hover {
            background-color: #F1F4F8;
            transition: background-color 0.3s ease;
        }

        /* Tabla */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            font-family: "Roboto", serif;
            font-weight: 500;
            font-size: 1.5rem;
        }
        
        table th {
            background-color: #34495e;
            color: white;
            text-align: left;
            padding: 10px;
        }
        
        table td {
            padding: 10px;
            border-bottom: 1px solid #dddddd;
        }
        
        table tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        
        table tr:hover {
            background-color: #f1f1f1;
        }
        .popup::-webkit-scrollbar:horizontal {
            width: 0.3rem;
            height: 0.3rem
        }
        /*Deslizador pop up*/
        .popup::-webkit-scrollbar {
            width: 0.3rem;
        }
        /*Estilos del deslizador*/
        .popup::-webkit-scrollbar-thumb {
            background: linear-gradient(#323542, #080530);
            border-radius: 1rem;
        }
        
        /*Botón Confirmar Pago*/
        #confirm {
            font-family: "Courier Prime", serif;
            font-weight: 600;
            background: #0E1047;
            color: white;
            font-size: 1.5rem;
            padding: 10px;
            margin-top: 1rem;
            border-radius: 25px;
            width: max-content;
        }
    `;
    constructor() {
        super(),
        this.visible = false;
        this.invoiceModel = {
            personalData: {
                numID: '',
                names: '',
                surname: '',
                email: '', 
                address: ''
            },
            products: [],
            summary: {
                subTotal: 0,
                vat: 0,
                total: 0,
            }
        }
    }

    popUpOpen() {
        /* const {names, surname, numID} = this.invoiceModel.personalData;
        if(!names || !surname || !numID) {
            Swal.fire({
                title: "Error",
                text: "Please, complete all personal data",
                icon: "warning",
            });
            return;
        } */
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
        //Desestructuración de los datos
        const { personalData: { numID, names, surname }, products, summary: { subTotal, vat, total } } = this.invoiceModel;

        return html /*HTML*/`
        <!--Botón para pagar la factura-->
        <div class="d-flex justify-content-center">
            <button  @click="${this.popUpOpen}" id="btnInvoice" type="button" class="btn btn-secondary">Pay</button>
        </div>
        <!--Ventana emergente al cumplirse el evento pay-->
        <div id="popup" class="popup" style="display: ${this.visible ? 'block' : 'none'};">
            <div class="col">
                <h1 class="title_popup">Invoice</h1>
                <p class="header_popup" id="popUpName">Sr@ ${names}</p> <!--Nombre Comprador-->
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
                    ${products.map((product) => html /*HTML*/ `
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
            <div id="values" class="col text-left">
                <p id="popUpSubTotal">SUBTOTAL: ${subTotal}</p>
                <p id="popUpVat">VAT ${vat}</p>
                <p id="popUpTotal">TOTAL ${total}</p>
            </div>
            <div class="d-flex justify-content-center">
                <!--Botón de confirmación de la compra-->
                <button  @click="${this.confirm}" id="confirm" type="button" class="btn btn-primary">Confirm</button>
            </div>
            <!--Botón para cerrar popup-->
            <button @click="${this.popUpClose}" id="popUpClose" type="button" class="close">&times;</button>
            </div>
        </div>
        `
    }
}

customElements.define('invoice-element', InvoiceElement);