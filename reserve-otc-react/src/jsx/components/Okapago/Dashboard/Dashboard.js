import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import axios from 'axios'
import Orders from "./Orders"
import Loader from "react-spinners/ClipLoader";
import Refresh from "../Refresh";


function Dashboard(props) {

    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"
    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        customer_id = storedData.userData.customers.id
    } else {
        customer_id = 0
    }
    //console.log(customer_id)

    //variables
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)
    const [account, setAccount] = useState('')
    const postData = {order_type: "" , status: "", show_trade_detail: "1", show_account_detail:"1", customer_id: customer_id};



    useEffect(() =>{
        (
            async  ()=> {
                try{
                    const response = await axios.post('orders', postData).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                    })
                }catch (e) {console.log('fail login');}

            }
        )()

    }, []);

    useEffect(() =>{
        (
            async  ()=> {
                //console.log(reload)
                try{
                    const response = await axios.post('orders', postData).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                        setReload(false)
                    })
                }catch (e) {console.log(e + ' ' +query)
                            }

            }
        )()

    }, [reload]);


    return(
        <Fragment>

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h3 className={"text-sou"}>Ordenes Activas</h3>
                </div>

                <Refresh setReload={val=>setReload(val)} setLoader={val=>setLoader(val)} />
            </div>

            {loader ?
                <div className={"row justify-content-center"}>
                    <div className={"col-12 preloaderDiv"}>
                        <Loader color={color} loading={loader} size={50}/>
                    </div>
                </div>

                :

                <div className="row">
                    <div className="col-12 text-center">
                        <div className="col-12">

                            <Accordion defaultActiveKey="0">
                                <Card.Header className={"fc-DarkGrey pd5"}>
                                    <div className="col-1">
                                        Id
                                    </div>
                                    <div className="col-2">
                                        Tipo
                                    </div>
                                    <div className="col-2">
                                        RSV
                                    </div>
                                    <div className="col-1">
                                        Tasa
                                    </div>
                                    <div className="col-2">
                                        Estado
                                    </div>
                                    <div className="col-1">
                                        Trades
                                    </div>
                                    <div className="col-3">
                                        Acciones
                                    </div>
                                </Card.Header>
                                {query !== undefined  &&  Array.isArray(query)&&
                                    query?.map((query, id) => (

                                        query.status !== "20" &&
                                            <Orders
                                                key={id}
                                                customer_id={customer_id}
                                                setReload = {value => setReload(value)}
                                                data={query}
                                                setLoader={val => setLoader(val)}
                                                next= {next => setFormStep(next)}
                                            />
                                        ))
                                }

                            </Accordion>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    )
}
export default Dashboard;
