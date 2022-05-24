import React, { useState } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";
import {Link} from "react-router-dom";
import {faFilePen, faHouse} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function AccountResponse(props) {
    //console.dir(props)
    const error = props.response.error
    let result = 'Exitoso'
    let description = 'Su orden ha sido creada'
    let symbol = true;

    if (error ===true){
        result= 'Error'
        description = 'Contacte con un operador'
        symbol = false
    }

    return (
        <div className="card-body" >
            {props.loadingStatus ?
                <div className={"row justify-content-center"}>
                    <p>
                        Procesando su solicitud de crear Orden
                    </p>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={props.color} loading={props.loadingStatus} size={30} />
                    </div>
                    Esto puede tardar varios segundos. <br/>
                </div>
                :
                <div className="row mt-n4">
                    <div  className={"col-12 text-center"}>
                        {symbol ?
                            <i className="customCheckmark">✓</i>
                            :
                            <i className="customXmark">⮿</i>
                        }
                    </div>
                    <div className="col-12 text-center">
                        <h3 className={"text-white"}>{result}</h3>
                        <p>{description}<br/> </p>
                    </div>

                    <div className="col-12 justify-content-center text-center my-3 fs-10">
                        Si quiere permanecer en esta pagina seleccione la opción <b>Crear otra orden</b>, si desea ver
                        sus ordenes activas presione click sobre <b>Lista de ordenes</b>
                    </div>

                        <div className="col-12 justify-content-center text-center my-3">
                            <Link onClick={()=> props.closeModal()} to={"#"}><FontAwesomeIcon icon={faFilePen} size={"md"}/> Crear otra orden</Link>
                        </div>

                        <div className="col-12 text-center mt-3 mb-n4">
                            <Link to="/dashboard">  <FontAwesomeIcon icon={faHouse} size={"md"}/> Lista de ordenes</Link>
                        </div>
                    </div>

            }



        </div>);
}

const ConfirmOrder= (props) => {
    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customerId=''
    if (localStorage.getItem('userDetails') !== null) {
        //console.log(storedData.userData)
        //customerId = storedData.userData.customers[0].id
        customerId = storedData.userData.customers.id
    }else {
        customerId= "0"
    }
    //console.log(customerId)

    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [modalData, setModalData] = useState(true);

    //data variables
    const [dataResult, setDataResult] = useState(false)
    const [responseData, setResponseData] = useState('')

    const [reserve, setReserve] = useState('')
    const [holder, setHolder] = useState('')
    const [id, setId] = useState('')


    const postData = props.postData


    //account save endpoint
    const  filteredData = 'okData'

    async function createOrder(response) {
        switch (filteredData) {
            case 'okData':

                await axios.post(`/orders/create`, postData,).then( async (res) => {
                    //console.dir(res.data)
                    setResponseData(res.data)
                    setLoader(false)
                });

                //await delayedRequest()
                break;
            case 'failed':
                //';
                swal("Faltan Datos - No es posible Registrar", "Verificar los datos ingresados", "error", {button: false,});
                break;
            case 'pending':
                //';
                swal("Estatus de Transacción", "Pendiente", "info", {button: false,});
                break;
            default:
                return '';
        }
    }

    //modal interaction functions

    function resetData(){
    }

    function openModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)
        createOrder().then(r => console.log('orden creada'))
    }

    function closeModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
        resetData()

        props.clearForm()
    }

    //loader vars
    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#1a5a6e");


    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}
            <button className={"btn btn-primary text-center "}
                    onClick={() => openModal()}

            >Confirmar Orden</button>
            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal} centered>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Crear Orden</h4>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => closeModal()}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body >
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                          <AccountResponse response={responseData}
                                                       closeModal={()=> closeModal()}
                                                      loadingStatus={loader}
                                                      color = {color}
                                                      setLoader={loader => setLoader(loader)}
                          />

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={"text-center justify-content-center"}>
                    <Button
                        onClick={() => closeModal()}
                        variant="danger light"
                    >
                        Volver
                    </Button>


                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default ConfirmOrder;



