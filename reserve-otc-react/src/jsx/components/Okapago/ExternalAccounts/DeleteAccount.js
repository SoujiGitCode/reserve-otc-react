import React, { useState } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";


//Components used //
function AccountData(props) {
    //settings form values in order to keep it even if user dosnt change any of them
    props.setUserId(props.data.id)
    return (   <div className="card-body" >
        <div className="basic-form">
            <div className="row">
                <div className="col text-center">
                    <i className="customXmark">⚠</i>
                    <br/>
                    Advertencia <br/>
                    Esta cuenta sera eliminada permanentemente <br/>
                    si esta de acuerdo presione "Proceder"
                </div>
            </div>
        </div>
    </div>);
}

function AccountResponse(props) {
    //console.dir(props)
    const error = props.response.error
    let result = 'Exitoso'
    let description = 'Su cuenta ha sido eliminada'
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
                        Procesando su solicitud de eliminar cuenta
                    </p>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={props.color} loading={props.loadingStatus} size={30} />
                    </div>
                    Esto puede tardar varios segundos. <br/>
                </div>
                :
                <div className="row">
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

                </div>

            }



        </div>);
}

const DeleteAccount= (props) => {
    //console.log(props)
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


    const postData = {id: id};


    //adding account
    function modalVerify() {
        setModalData(false)
        setDataResult(true)

        //console.dir(postData)
        deleteRequest().then(r => console.log('ejecutado DeleteRequest'))

    }

    //account save endpoint
    const  filteredData = 'okData'

    async function deleteRequest(response) {
        await axios.post(`/account/delete`, postData,).then( async (res) => {
            //console.dir(res.data)
            setResponseData(res.data)
            setLoader(false)
            props.setReload(true)
        });

    }

    //modal interaction functions

    function resetData(){
        props.setReload(false)
    }

    function openModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)
        resetData()
    }

    function closeModal (){
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
        resetData()
    }

    //loader vars
    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#1a5a6e");


    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}
            <button onClick={() => openModal()}  data-bn-type="button" className=" css-2c4swc">Eliminar</button>
            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal}>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Eliminar Cuenta</h4>
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
                            {modalData ?
                                <AccountData
                                    setUserId = {id => setId(id)}
                                    data={props.data}
                                /> : <AccountResponse response={responseData}
                                                      loadingStatus={loader}
                                                      color = {color}
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
                        onClick={() => modalVerify()}>Proceder
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default DeleteAccount;



