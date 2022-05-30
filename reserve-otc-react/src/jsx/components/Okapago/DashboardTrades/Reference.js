import React, {Fragment, useState} from "react";
import {Row, Card, Col, Button, Modal, Container} from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import get from "lodash/get";


//Components used //
function AccountData(props) {
    console.dir(props)
    const allfinRsv= "allfinpayments1"
    const [copied, setCopied] = useState(false)
    //settings form values in order to keep it even if user dosnt change any of them
    return (<div className="card-body">

        <div className="basic-form">
            <div className="form-group row mb-4"><label className="col-sm-12 col-form-label fs-14 text-center">Datos de
                Transferencia</label>
            </div>

            <div className="row fc-BlueSec  my-2 text-center">
                <div className="col mb-2 fs-12 text-right">
                    Cuenta RSV:
                </div>
                <div className="col text-white fs-12 text-left">
                    {allfinRsv}
                </div>
            </div>
            <div className="row  my-2 text-center">
                <div className="col mb-2 fs-12 text-right fc-Green text-left">
                    Total:
                </div>
                <div className="col fc-Green fs-12 text-left">
                    {props.data.amount} RSV
                </div>
            </div>


            <div className="form-group row justify-content-center mb-n5 mt-3">
                <label className="col-sm-12  text-right col-form-label fs-14 text-center mb-2">Referencia RSV</label>
                <div className="col-sm-12 my-2">
                    <input id="refVal" type="text" className="form-control fs-12 text-center"
                           placeholder="Referencia a validar"
                           onChange={(e) => props.setReference(e.target.value)}
                           value={props.reference}
                    />
                </div>
            </div>
        </div>


    </div>);
}

function AccountResponse(props) {

    //console.dir(props)
    const error = props.response?.error
    const code = props.response?.code
    let result = 'Exitoso'
    let description = 'Refencia RSV registrada y enviada'
    let rsvDesc = ''
    let symbol = true;

    if (error === true || code !== 200) {
        result = 'Error'
        description = 'Contacte con un operador'
        symbol = false
    }


    return (
        <Fragment>

            <div className="card-body" >
                {props.loading ?
                    <div className={"row justify-content-center"}>
                        <p>
                            Procesando su solicitud de crear Trade
                        </p>
                        <div className={"col-12 preloaderDiv"}>
                            <Loader color={props.color} loading={true} size={30} />
                        </div>
                        Esto puede tardar varios segundos. <br/>
                    </div>
                    :
                    <div className="row">
                        <div  className={"col-12 text-center"}>
                            {props.response?.code=== 200 ?
                                <i className="customCheckmark">✓</i>
                                :
                                <i className="customXmark">⮿</i>
                            }
                        </div>
                        <div className="col-12 text-center">
                            {props.response?.code=== 200 ?
                                <h3 className={"text-white"}>Exitoso</h3>
                                :
                                <h3 className={"text-white"}>Error</h3>
                            }

                            {props.response?.code=== 200 ?
                                <p>Referencia Enviada<br/> </p>
                                :
                                <p>Contacte con un operador de Reserve<br/> </p>
                            }

                            <p className={get(props.response, 'verify_rsv.code') ===1 ? "fc-Green" : "fc-Red"}>
                                {
                                    {
                                        1: 'Referencia Validada!',
                                        2: 'Referencia con monto incorrecto',
                                        0: 'referencia no encontrada o no enviada'
                                    }[get(props.response, 'verify_rsv.code')]
                                }
                            </p>


                        </div>
                    </div>
                }



            </div>

        </Fragment>
    )

        ;
}

const Reference = (props) => {

    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customerId = ''
    if (localStorage.getItem('userDetails') !== null) {
        //console.log(storedData.userData)
        //customerId = storedData.userData.customers[0].id
        customerId = storedData.userData.customers.id
    } else {
        customerId = "0"
    }
    //console.log(customerId)

    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [modalData, setModalData] = useState(true);

    //data variables
    const [dataResult, setDataResult] = useState(false)
    const [response, setResponse] = useState('')
    const [id, setId] = useState('')
    const [reference, setReference] = useState('')
    const postData = {
        id: props.data.id, order_id: props.data?.order_id, customer_id: props.customer_id, rsv_reference: reference,
        bs_account_id: props.data.bs_account_id, rsv_account_id: props.data.bs_account_id, amount: props.data.amount
    };

    //adding account
    function modalVerify() {
        setModalData(false)
        setDataResult(true)
        tradeUpdate()
    }

    async function tradeUpdate() {
        await axios.post(`/trades/create`, postData,).then(async (res) => {
            //console.dir(res.data)
            setResponse(res.data)
            setLoader(false)

        });

    }

    //modal interaction functions


    function openModal() {
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)

    }

    function closeModal() {
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
        props.setReload(true)

    }

    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"

    return (
        <div className="bootstrap-modal">
            {/* <!-- Button trigger modal --> */}
            <button onClick={() => openModal()} data-bn-type="button" className=" btnSmall fc-Green fs-12"
                    disabled={props.disabled}>{props.children}</button>
            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal} centered>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Agregar Referencia RSV</h4>
                    <Button
                        variant=""
                        className="close"
                        onClick={() => closeModal()}
                    >
                        <span>&times;</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-xl-12 col-lg-12">
                        <div className="card">
                            {modalData ?
                                <AccountData
                                    setReference={val => setReference(val)}
                                    setUserId={id => setId(id)}
                                    data={props.data}/>
                                :
                                <AccountResponse
                                    response={response}
                                    loading={loader}
                                    color={color}
                                    postData={postData}
                                    setReload={reload => props.setReload(reload)}
                                    setLoader={loader => setLoader(loader)}/>}
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


                    {modalData &&
                    <Button
                        variant="primary"
                        onClick={() => modalVerify()}>Enviar
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default Reference;



