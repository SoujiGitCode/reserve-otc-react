import React, {useState} from "react"
import { Button, Modal } from "react-bootstrap"
import BuySendPayData from "./BuySendPay-Data";
import BuySendPayResponse from "./BuySendPay-Response";

const BuyTradeSendPay= (props) => {
   //console.log(props.customer_id)

    const [nextButton, setNextButton] = useState(true)
    //modal variables
    const [basicModal, setBasicModal] = useState(false);
    const [formStep, setFormStep] = useState(true)
    //data variables

    const [reference, setReference] = useState('')


    const sendPay = {type:'0', trade_id: props?.data?.id, origin: 'allfin-otc', customer_id: props.customer_id,
    reference: reference}

    //console.dir(postData)

    //modal interaction functions

    function resetData(){
        setFormStep(true)
    }

    function openModal (){
        setBasicModal(true)
        setReference('')
    }

    function closeModal (){
        setBasicModal(false)
        setFormStep(true)
        setNextButton(true)
        setReference('')
        props.setReload(true)

    }

    return (
        <div className="bootstrap-modal" >
            {/* <!-- Button trigger modal --> */}
            <button data-bn-type="button" id="C2CofferBuy__btn_buyNow" type="button"
                    className="btnSmall fc-Green"
                    onClick={() => openModal()}>
                Pagar</button>

            {/* <!-- Modal --> */}
            <Modal className="fade"
                   show={basicModal}
                   onHide={setBasicModal}
                   size="md"
                   keyboard={false}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header className={"text-center justify-content-center"}>
                    <h4 className="text-black">Enviar Pago</h4>
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
                            { formStep ?

                                <BuySendPayData
                                    total={props.total}
                                    customer_id={props.customer_id}
                                    data={props.data}
                                    reference = {reference}
                                    setReference = {ref => setReference(ref)}
                                    formStep = {value => setFormStep(value)}
                                />
                                :
                            <BuySendPayResponse
                                trade={props.trade}
                                customer_id={props.customer_id}
                                reference = {reference}
                                sendPay={sendPay}
                                setReload={val=>props.setReload(val)}
                                next={val=>setNextButton(val)}
                            />
                            }


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

                    {nextButton &&

                    <Button
                        onClick={() => setFormStep(false)}
                        variant="primary light"
                    >
                        Siguiente
                    </Button>
                    }

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default BuyTradeSendPay;



