import React, {Fragment, useEffect, useState, useMemo} from "react";
import {Row, Card, Col, ListGroup, Badge, Tab} from "react-bootstrap";
import axios from "axios";
import Loader from "react-spinners/ClipLoader";
import OrdersList from "./OrdersList";



const BuyRSV = () => {
    //loader vars
    let [loader, setLoader] = useState(true);
  const color = "#1a5a6e"
    //acceder a localstorage para obtener customerid
    const storedData = JSON.parse(localStorage.getItem('userDetails'))
    let customer_id = ''
    if (localStorage.getItem('userDetails') !== null) {
        //console.log(storedData.userData)
        //customerId = storedData.userData.customers[0].id
        customer_id = storedData.userData.customers.id
    } else {
        customer_id = 0
    }
    //console.log(customerId)

    const viewName = "Comprar";

    //variables
    const [query, setQuery] = useState([])
    const [reload, setReload] = useState(false)
    const [formStep, setFormStep] = useState(true)

    const [account, setAccount] = useState('')



    const postData = {order_type: "1" , status: "1", show_account_detail: "1"};



    function clearForm (){
        setFormStep(true)
        setReload(false)
        setAccount("")

    }

    //Main UseEffect
    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.post('orders', postData).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                        clearForm()
                    })

                } catch (e) {
                    console.log('fail orders list');
                }

            }
        )()
    }, []);


    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.post('orders', postData).then((res) => {
                        //console.dir(res.data)
                        setQuery(res.data)
                        setLoader(false)
                        clearForm()
                    })

                } catch (e) {
                    console.log('fail orders list');
                }

            }
        )()
    }, [reload]);




    return (
        <Fragment>
            <Row className={"justify-content-center"}>
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title col-sm-12 text-center"><p className="text-center">
                                Comprar RSV</p></div>
                        </div>
                            <div className="card-body">
                                {loader?
                                    <div className={"row justify-content-center"}>
                                        <div className={"col-12 preloaderDiv"}>
                                            <Loader color={color} loading={loader} size={50}/>
                                        </div>
                                    </div>
                                    :
                                  <div className="css-16g55fu row">
                                    <div className="css-cjwhpx">
                                        <div className="css-17q4dod fs-14">
                                            <div className="css-1ee59nr">Anunciantes</div>
                                            <div className="css-yvjfec">Precio</div>
                                            <div className="css-8i4gf0">Disponible</div>
                                            <div className="css-az0ant">Pago</div>
                                            <div className="css-1dbfbyw">
                                                <div data-bn-type="text" className="css-vurnku">Operación</div>
                                            </div>
                                        </div>


                                        {
                                            query?.map((query, id) => (
                                                    <div key={id}>

                                                            <OrdersList
                                                                reload = {value => setReload(value)}
                                                                viewName = {viewName}
                                                                data={query}
                                                                next= {next => setFormStep(next)}
                                                            />

                                                    </div>
                                                )
                                            )
                                        }



                                    </div>
                                  </div>
                                }
                            </div>




                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default BuyRSV;

//components used
