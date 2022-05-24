import React, {Fragment, useEffect, useState} from "react";
import {Accordion, Card} from "react-bootstrap";
import ContextAwareToggle from "./ContextAwareToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Reference from "./Reference";
import IndexedTrades from "./IndexedTrades";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DeleteAlert from "./Delete";
import BuyOrders from "./Buy-Orders";
import SellOrders from "./Sell-Orders";


function Orders (props){
   //console.log(props)
    const deleteData = {orderId: props.data.id};

    const MySwal = withReactContent(Swal)

    async function alertToggle() {
        await MySwal.fire({
            title: <strong>Tiempo Restante</strong>,
            html: <i>Restan : {props.data.order_time}:00hrs para dar de baja a esta orden</i>,
            icon: 'info'
        })
    }

    let status = props.data.status
    switch (status) {
        case '0':
            status = "Referencia Invalida"
            break;
        case '1':
            status = "Activo"
            break;
        case '2':
            status = "Cerrado"
            break;
        case '20':
            status = "Eliminado"
            break;
        default:
    }

    const [hide, setHide] = useState(false)
    return(
        <Fragment>
            <Card className={"smBorder fs-12 fixBottomCard"} >
                <Card.Header eventKey={props.data?.id}>
                    <div className="col-1">
                        {props.data.id}
                    </div>
                    <div className="col-2">
                        {props.data.order_type == 0 ? "Compra" : "Venta"}
                    </div>
                    <div className="col-2">
                        {props.data.amount}
                    </div>
                    <div className="col-1">
                        {props.data.exchange_rate}
                    </div>
                    <div className="col-2">
                        {status}
                    </div>
                    <div className="col-1">
                      {props.data.trades.length}
                    </div>
                    <div className="col-3">
                        <div className="row justify-content-start">
                            <div className="">
                                <button  data-bn-type="button" className=" btnSmall fs-12 fc-Blue"
                                onClick={()=>alertToggle()}
                                >
                                    <FontAwesomeIcon icon={faClock} /></button>
                            </div>
                            <div className="">
                                <ContextAwareToggle eventKey={props.data.id} setHide={val=>setHide(val)}  hide={hide}> Detalles</ContextAwareToggle>
                            </div>
                            <div className="">
                                { props.data.status === "0" && props.data.order_type==="1" &&
                                <Reference setReload = {value => props.setReload(value)}
                                            data = {props.data}
                                >Ref</Reference>
                                }
                            </div>
                            <div className="">
                                {props.data.trades.length === 0 &&
                                <DeleteAlert
                                    setReload={val => props.setReload(val)}
                                    deleteData={deleteData}
                                    setLoader = {val => props.setLoader(val)}
                                />
                                }

                            </div>
                        </div>

                    </div>
                </Card.Header>
                <Accordion.Collapse eventKey={props.data?.id}>
                    {props.data.order_type== 0?
                        <BuyOrders data ={props.data} customer_id={props.customer_id} setReload = {value => props.setReload(value)}/>
                        :
                        <SellOrders data ={props.data} customer_id={props.customer_id} setReload = {value => props.setReload(value)}
                                    setLoader = {val => props.setLoader(val)} />
                    }
                </Accordion.Collapse>
            </Card>
        </Fragment>
    )
}

export default Orders