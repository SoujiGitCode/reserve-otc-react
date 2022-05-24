import React, {useMemo, useState} from 'react'
import PageTitle from "../../layouts/PageTitle"
import axios from 'axios'
import swal from "sweetalert"
import withReactContent from 'sweetalert2-react-content'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { css } from "@emotion/react"
import Loader from "react-spinners/PacmanLoader"
import swal2 from "sweetalert2";

export const VerifyModal= (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#0f917a");

    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');

    const today= new Date();


    const postData = {amount, name, reference, customer_id: 2, external_id: "okapagoApp", currency_id: 2,
        description:"randomdesc", date: today.toLocaleDateString('en-US')};

    function onVerify(e) {
        e.preventDefault()
        let response = ''
        if(reference!=="" && amount!=="" && name!==""){
            response='confirmed'
        }else {response='failed'}

        verifyResponse(response)
    }

    function verifyResponse(response) {

        switch (response) {
            case 'confirmed':
                //';
                swal("Transacción Registrada", "Validado!", "success",{ button: false,});

                setName('')
                setAmount('')
                setReference('')

                axios.post(`/request/save`, postData,);
                break;
            case 'failed':
                //';
                swal("Faltan Datos - No es posible Registrar", "Verificar los datos ingresados", "error",{ button: false,});
                break;
            case 'pending':
                //';
                swal("Estatus de Transacción", "Pendiente", "info",{ button: false,});
                break;
            default:
                return '';
        }
    }


    return(
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargando Request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className={"row justify-content-center"}>
                            <p>

                                Verificando Transacción en el Sistema
                            </p>
                            <div className={"col-12 preloaderDiv"}>
                                <Loader color={color} loading={loader} size={"20"} />
                            </div>
                            Espere unos Segundos. <br/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer className={"justify-content-center"}>
                        <Button variant="primary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

        </>
    )

}
export default VerifyModal;