import React, {Fragment, useEffect, useContext, useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import axios from 'axios'
import SellTrades from "./SellTrades"
import Loader from "react-spinners/ClipLoader";
import BuyTrades from "./BuyTrades";
import Refresh from "../Refresh";


function DashboardTrades(props) {

    //loader vars
    let [loader, setLoader] = useState(true);
    let [color, setColor] = useState("#1a5a6e");

    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        customer_id = storedData.userData.customers.id
    } else {
        customer_id = 0
    }
    //console.log(customerId)

    //variables
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)
    const [account, setAccount] = useState('')
    const postData = {order_type: "" , status: "", customer_id: customer_id, show_account_detail:1, show_order_detail:1};



    function clearForm (){
        setFormStep(true)
        setReload(false)
        setAccount("")

    }

    useEffect(() =>{
        (
            async  ()=> {
                try{
                    const response = await axios.post('trades', postData).then((res) => {
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
                try{
                    const response = await axios.post('trades', postData).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                        setReload(false)
                    })
                }catch (e) {console.log('fail reload');}

            }
        )()

    }, [reload]);


    return(
        <Fragment>

            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h3 className={"text-sou"}>Trades Activos</h3>
                </div>
                <Refresh setReload={val=>setReload(val)} setLoader={val=>setLoader(val)}/>
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
                                    <Card.Header className={"fc-DarkGrey text-center pd5"}>
                                        <div className="col-1">
                                            Id
                                        </div>
                                        <div className="col-1">
                                            Tipo
                                        </div>
                                        <div className="col-1">
                                            RSV
                                        </div>
                                        <div className="col-1">
                                            Tasa
                                        </div>
                                        <div className="col-2">
                                            Estado
                                        </div>
                                        <div className="col-2">
                                            Banco
                                        </div>
                                        <div className="col text-center">
                                            Acciones
                                        </div>
                                    </Card.Header>


                                {query  &&  Array.isArray(query) &&
                                    query?.map((query, id) => (

                                            query.status !== "20" &&

                                                <Fragment>
                                                    {query.order_type == 0 ?
                                                        <SellTrades
                                                            key={id}
                                                            customer_id={customer_id}
                                                            setReload = {value => setReload(value)}
                                                            data={query}
                                                            setLoader={val => setLoader(val)}
                                                            next= {next => setFormStep(next)}
                                                        />
                                                        :
                                                        <BuyTrades
                                                            key={id}
                                                            customer_id={customer_id}
                                                            setReload = {value => setReload(value)}
                                                            data={query}
                                                            setLoader={val => setLoader(val)}
                                                            next= {next => setFormStep(next)}
                                                        />
                                                    }

                                                </Fragment>


                                        )
                                    )
                                }
                            </Accordion>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    )
}
export default DashboardTrades;
