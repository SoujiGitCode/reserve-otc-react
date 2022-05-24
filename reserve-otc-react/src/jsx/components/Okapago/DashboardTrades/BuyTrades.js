import React, {Fragment, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Reference from "./Reference";
import {faClock, faCopy} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Confirm from "../Dashboard/Confirm";
import BuyTradeSendPay from "./Buy-SendPay";
import BuyTradeData from "./BuyTradeData";


function BuyTrades(props) {
    //console.log(props)
    let transferAmount = 0
    if (props.data.amount != undefined) (transferAmount = parseFloat(props.data.amount * props.data.exchange_rate).toFixed(2))

    const deleteData = {orderId: props.data.id};

    const [copied, setCopied] = useState(false)

    const MySwal = withReactContent(Swal)

    async function alertToggle() {
        await MySwal.fire({
            title: <strong>Tiempo Restante</strong>,
            html: <i>Restan : {props.data.order_time}:00hrs para dar de baja a esta orden</i>,
            icon: 'info'
        })
    }

    //console.dir(props.data.trades)
    function parsing(number) {
        return parseFloat(number).toFixed(2)
    }

    //Array of Trades
    const arrayTrades = props.data.trades
    //parsing Status
    let status = ''
    const disabled = status == 3 || status == 4
   // console.log(disabled)


    switch (props.data?.status) {
        case '0':
            status = "Pago Pendiente"
            break;
        case '1':
            status = "Pago Enviado"
            break;
        case '2':
            status = "Esperando RSV"
            break;
        case '3':
            status = "Saldo liberado"
            break;
        default:
    }

    const confirmData = {customer_id: props.customer_id, trade_id: props.data.id, reference: props.data.bs_reference}

    return (
        <Fragment>
            <Card className={"smBorder fs-10 fixBottomCard"}>
                <Card.Header eventKey={props.data.id}>
                    <div className="col-1">
                        {props.data.id}
                    </div>
                    <div className="col-1">
                        {props.data.order_type == 0 ? "Venta" : "Compra"}
                    </div>
                    <div className="col-1">
                        {props.data.amount}
                    </div>
                    <div className="col-1">
                        {props.data.exchange_rate}
                    </div>
                    <div className="col-2">
                        {status}
                    </div>
                    <div className="col-2">
                        {props.data.order[0]?.BS_bankname}
                    </div>
                    <div className="col">
                        <div className="row justify-content-center">
                            <div className="">
                                <button data-bn-type="button" className=" btnSmall fs-12 fc-Blue"
                                        onClick={() => alertToggle()}
                                >
                                    <FontAwesomeIcon icon={faClock}/></button>
                            </div>
                            <div className="">
                                <ContextAwareToggle eventKey={props.data.id}> Detalles</ContextAwareToggle>
                            </div>
                            <div>
                                {props.data.bs_status < 2 &&
                                <BuyTradeSendPay setReload={value => props.setReload(value)}
                                           setLoader = {val => props.setLoader(val)}
                                           data={props.data}
                                           disabled={disabled}
                                           total={parsing(props.data?.amount * props.data?.exchange_rate)}
                                           customer_id={props.customer_id} />
                                }
                            </div>
                            {props.data?.status == 2  &&
                            <div className="">
                                <button className={"btnSmall fc-Gold"}>
                                    Pago Confirmado
                                </button>
                            </div>
                            }

                            <div className="">
                                <button className={"btnSmall fc-Orange"}>
                                    Disputa
                                </button>
                            </div>

                        </div>

                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.data.id}>
                    <Card.Body>
                        <BuyTradeData data={props.data} />

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Fragment>
    )
}

export default BuyTrades