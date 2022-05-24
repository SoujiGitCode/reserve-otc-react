import React, { useState } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-spinners/ClipLoader";


//Components used //
function AccountData(props) {
  return (      <div className="card-body" >
    <div className="basic-form">
      <form>

        <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">Name</label>
          <div className="col-sm-9">
            <input  id="accNumber" type="text" className="form-control fs-12" placeholder="Nombre Asociado a la cuenta"
                    onChange={name => props.setName(name.target.value)}/>
          </div>
        </div>
        <div className="form-group row"><label className="col-sm-3 col-form-label fs-12">ID Reserve</label>
          <div className="col-sm-9">
            <input  id="accName" type="text" className="form-control fs-12" placeholder="ID usuario Reserve"
                    onChange={idReserve => props.setIdReserve(idReserve.target.value)}/>
          </div>
        </div>


      </form>
    </div>
  </div>);
}

function AccountResponse(props) {
  //console.dir(props.response.code)
  const code = props.response.code
  let result = 'Exitoso'
  let description = 'Se ha agregado su cuenta'
  let symbol = true

  if (code !==200){
    result= 'Error'
    description = 'Revise los datos ingresados e intentelo de nuevo'
    symbol = false
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

const ReserveModal= () => {
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



  const postData = {account_type: "1", currency_id: '2', RIF: "", customer_id: customerId, accountnumber: "",
    holder: holder, routing: "", swift: "", address: "", zip: "", bank_id: "26", reserve_account: reserve };



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
          console.dir(res.data)
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
    setReserve('')
    setHolder('')
  }

  function openModal (){
    resetData()
    //console.log(postData)
    setModalData(true)
    setDataResult(false)
    setBasicModal(true)
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
  let [color, setColor] = useState("#1a5a6e");


  return (
      <div className="bootstrap-modal" >
        {/* <!-- Button trigger modal --> */}
        <button
            variant="secondary"
            type="button"
            className="mb-2 mr-2 btn btn-primary btn-rounded col-lg-12"
            onClick={() => openModal()}
            data-bn-type="button">
                  <span className="btn-icon-left text-info">
                    <i className="fa fa-plus color-info"  />
                  </span>Cuenta Reserve
        </button>
        {/* <!-- Modal --> */}
        <Modal className="fade" show={basicModal} onHide={setBasicModal} centered>
          <Modal.Header className={"text-center justify-content-center"}>
            <h4 className="text-black">Reserve</h4>
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
                        setName={name => setHolder(name)}
                        setIdReserve={idReserve => setReserve(idReserve)}


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
                onClick={() => modalVerify()}>Agregar
            </Button>
            }

          </Modal.Footer>
        </Modal>
      </div>
  );
};


export default ReserveModal;



