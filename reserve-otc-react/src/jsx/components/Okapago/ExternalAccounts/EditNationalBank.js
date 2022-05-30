import React, { useState } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader"


//Components used //
function AccountData(props) {
    //settings form values in order to keep it even if user dosnt change any of them
    props.setName(props.data.name)
    props.setNumber(props.data.number)
    props.setRif(props.data.rif)
    props.setBank(props.data.bank_id)
    props.setUserId(props.data.id)

    return (      <div className="card-body" >
        <div className="basic-form">
            <form>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label fs-12">Banco</label>
                    <div className="col-sm-9">
                        <div className=" form-group  row justify-content-center">
                            <select id="bank" name="bank" className="form-control  col-sm-12 idType fs-12 idType"
                                defaultValue={props.data.bank_id}
                                    onChange={bank => props.setBank(bank.target.value)}
                            >
                                <option className={"allfinNone"} value="0156">100%BANCO</option>
                                <option value="0196" className={"allfinNone"}>ABN AMRO BANK</option>
                                <option value="0172" className={"allfinNone"}>BANCAMIGA BANCO MICROFINANCIERO, C.A.</option>
                                <option value="0171" className={"allfinNone"}>BANCO ACTIVO BANCO COMERCIAL, C.A.</option>
                                <option value="0166" className={"allfinNone"}>BANCO AGRICOLA</option>
                                <option value="0175" className={"allfinNone"}>BANCO BICENTENARIO</option>
                                <option value="0128" className={"allfinNone"}>BANCO CARONI, C.A. BANCO UNIVERSAL</option>
                                <option value="0164" className={"allfinNone"}>BANCO DE DESARROLLO DEL MICROEMPRESARIO</option>
                                <option value="6" >BANCO DE VENEZUELA S.A.I.C.A.</option>
                                <option value="9">BANCO DEL CARIBE C.A.</option>
                                <option value="0149" className={"allfinNone"}>BANCO DEL PUEBLO SOBERANO C.A.</option>
                                <option value="0163" className={"allfinNone"}>BANCO DEL TESORO</option>
                                <option value="0176" className={"allfinNone"}>BANCO ESPIRITO SANTO, S.A.</option>
                                <option value="11">BANCO EXTERIOR C.A.</option>
                                <option value="0003" className={"allfinNone"}>BANCO INDUSTRIAL DE VENEZUELA.</option>
                                <option value="0173" className={"allfinNone"}>BANCO INTERNACIONAL DE DESARROLLO, C.A.</option>
                                <option value="1" className={"allfinNone"}>BANCO MERCANTIL C.A.</option>
                                <option value="22" className={"allfinNone"}>BANCO NACIONAL DE CREDITO</option>
                                <option value="0116" className={"allfinNone"}>BANCO OCCIDENTAL DE DESCUENTO.</option>
                                <option value="29">BANCO PLAZA</option>
                                <option value="8">BANCO PROVINCIAL BBVA</option>
                                <option value="5">BANCO VENEZOLANO DE CREDITO S.A.</option>
                                <option value="0168" className={"allfinNone"}>BANCRECER S.A. BANCO DE DESARROLLO</option>
                                <option value="2" >BANESCO BANCO UNIVERSAL</option>
                                <option value="0177" className={"allfinNone"}>BANFANB</option>
                                <option value="0146" className={"allfinNone"}>BANGENTE</option>
                                <option value="7">BANPLUS BANCO COMERCIAL C.A</option>
                                <option value="0190" className={"allfinNone"}>CITIBANK.</option>
                                <option value="0121" className={"allfinNone"}>CORP BANCA.</option>
                                <option value="0157" className={"allfinNone"}>DELSUR BANCO UNIVERSAL</option>
                                <option value="10">FONDO COMUN</option>
                                <option value="0601" className={"allfinNone"}>INSTITUTO MUNICIPAL DE CR&#201;DITO POPULAR</option>
                                <option value="0169" className={"allfinNone"}>MIBANCO BANCO DE DESARROLLO, C.A.</option>
                                <option value="0137" className={"allfinNone"}>SOFITASA</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Número de Cuenta</label>
                    <div className="col-sm-9">
                        <input  id="accNumber" type="text" className="form-control fs-12" placeholder="ingrese numero de cuenta" defaultValue={props.data.number}
                                onChange={number => props.setNumber(number.target.value)}/>
                    </div>
                </div>
                <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Nombre</label>
                    <div className="col-sm-9">
                        <input  id="accName" type="text" className="form-control fs-12" placeholder="nombre asociado a la cuenta"
                                defaultValue={props.data.name}
                                onChange={name => props.setName(name.target.value)}/>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-sm-3 col-form-label fs-12">Id Asociado</label>
                    <div className="col-sm-9">
                        <div className=" form-group  row justify-content-center">
                            <select id="idBT" name="idBT" className="form-control  col-sm-3 idType fs-12 idType">
                                <option value="v">V</option>
                                <option value="j">J</option>
                                <option value="r">R</option>
                                <option value="e">E</option>
                            </select>

                            <input  id="idNumber" type="text" className="form-control col-sm-8 fs-12" placeholder="id asociado a la cuenta"
                                    defaultValue={props.data.rif}
                                    onChange={rif => props.setRif(rif.target.value)}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>);
}

function AccountResponse(props) {
    console.dir(props.response.code)
    const code = props.response.code
    let result = 'Exitoso'
    let description = 'Se ha agregado su cuenta'
    let symbol=true

    if (code !==200){
        result= 'Error'
        description = 'Revise los datos ingresados e intentelo de nuevo'
        symbol=false
    }

    return (
        <div className="card-body" >
            {props.loadingStatus ?
                <div className={"row justify-content-center"}>
                    <p>
                        Vaidando los datos ingresados
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

const EditNationalBank= (props) => {
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

    const [rif, setRif] = useState('')
    const [accountnumber, setAccountnumber] = useState('')
    const [holder, setHolder] = useState('')
    const [id, setId] = useState('')
    const [bankId, setBankId] = useState('')



    const postData = {account_type: "0", currency_id: '1', rif: rif, customer_id: customerId, accountnumber: accountnumber,
        holder: holder, routing: "", swift: "", address: "", zip: "", bank_id: "2", reserve_account: "", id: id};

    //adding account
    function modalVerify() {
        setModalData(false)
        setDataResult(true)

        //console.dir(postData)
        saveRequest().then(r => console.log('ejecutado savedRequest'))

    }

    //account save endpoint
    const  filteredData = 'okData'

    async function saveRequest(response) {
        switch (filteredData) {
            case 'okData':

                await axios.post(`/account/save`, postData,).then( async (res) => {
                    // console.dir(res.data)
                    setResponseData(res.data)
                    setLoader(false)
                });

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
        setRif('')
        setAccountnumber('')
        setHolder('')
    }

    function openModal (){
        resetData()
        //console.log(postData)
        setModalData(true)
        setDataResult(false)
        setBasicModal(true)
        console.dir(props.data)
    }

    function closeModal (){
        resetData()
        setModalData(true)
        setDataResult(false)
        setBasicModal(false)
        setLoader(true)
    }
    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"

    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}
            <button onClick={() => openModal()}  data-bn-type="button" className=" css-2c4swc">Editar</button>
            {/* <!-- Modal --> */}
            <Modal className="fade" show={basicModal} onHide={setBasicModal}>
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Banco Nacional</h4>
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
                                    setBank={bank => setBankId(bank)}
                                    setNumber={number => setAccountnumber(number)}
                                    setName={name => setHolder(name)}
                                    setRif={rif => setRif(rif)}
                                    setUserId={id => setId(id)}
                                    data={props.data}

                                /> : <AccountResponse response={responseData}
                                                      loadingStatus={loader}
                                                      color = {color}
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
                        onClick={() => modalVerify()}>Guardar Cambios
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default EditNationalBank;



