import React, {useState, useeffect, useEffect} from "react"
import axios from "axios";
import Loader from "react-spinners/DotLoader"
import OrderBookList from "../../Market/OrderBookList";
import OrdersPreview from "./OrdersPreview";
import Refresh from "../../Refresh";


const MarketPreview = () => {
    //loader vars
    const [sellLoader, setSellLoader] = useState(true)
    const [buyLoader, setBuyLoader] = useState(true)

    const [sellReload, setSellReload] = useState(false)
    const [buyReload, setBuyReload] = useState(false)

    const color= "#00e9ff"
    //queries vars

    const [sells, setSells] = useState()
    const [buys, setBuys ] = useState()
    const page = 1
    const countPage = 5

    const sellRequest = {order_type: "1", status: "1", show_account_detail: "1", page: page, count_page: countPage};
    const buyRequest = {order_type: "0", status: "1", show_account_detail: "1", page: page, count_page: countPage};


//functions for orders - based on types
    async function GetSellOrders() {
        //setSellLoader(true)
        await axios.post('orders', sellRequest).then((res) => {
           // console.dir(res.data)
            setSells(res.data?.data)
            setSellLoader(false)
            setSellReload(false)
        })
    }


    async function GetBuyOrders() {
       // setBuyLoader(true)
        await axios.post('orders', buyRequest).then((res) => {
            //console.dir(res.data)
            setBuys(res.data?.data)
            setBuyLoader(false)
            setBuyReload(false)
        })
    }

    //useEffects
    useEffect(() => {
        (
            async () => {
                try {
                    GetBuyOrders()
                    GetSellOrders()
                } catch (e) {
                    console.log('fail orders list');
                }
            }
        )()
    }, []);

    //useEffects reload Sell
    useEffect(() => {
        (
            async () => {
                try {
                    GetSellOrders()
                } catch (e) {
                    console.log('fail effect sell reload');
                }
            }
        )()
    }, [sellReload]);

    //useEffects reload Buy
    useEffect(() => {
        (
            async () => {
                try {
                    GetBuyOrders()
                } catch (e) {
                    console.log('fail effect buy reload');
                }
            }
        )()
    }, [buyReload]);

    return(
        <div className="market-prev row justify-content-center">
            <div className="col-12 text-center fc-Green">
                Order Book
            </div>

            <div className="col-6 fs-10 my-4 book-prev-left border-bottom-Green">
                <div className="row text-center justify-content-center my-3 fc-LightIBlue">
                    Ventas
                </div>
                <div className="refresh-orderbook">
                    <Refresh setReload={val=>setSellReload(val)} setLoader={val=>setSellLoader(val)} color={"white"}/>
                </div>


                <div className="row">

                            <div className="col-12">
                                <div className="row border-bottom-Green p-3 justify-content-center">
                                    <div className="col fs-10 text-center">
                                        Banco
                                    </div>
                                    <div className="col fs-10 text-center">
                                        RSV
                                    </div>
                                    <div className="col fs-10 text-center">
                                        Tasa
                                    </div>
                                </div>
                            </div>

                    {sellLoader ?
                        <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                            <Loader color={color} loading={sellLoader} />
                        </div>
                        :
                        <div className="col-12">
                                {sells &&
                                sells.map((query, id) => (
                                        <OrdersPreview key={id} data={query} type={"sell"}/>
                                    )
                                )
                                }
                            </div>
                    }


                </div>

            </div>

            <div className="col-6 book-prev-right my-4 border-bottom-Green">
                <div className="row text-center justify-content-center fs-10 my-3 fc-LightIBlue">
                    Compras
                </div>
                <div className="refresh-orderbook">
                    <Refresh setReload={val=>setBuyReload(val)} setLoader={val=>setBuyLoader(val)} color={"white"}/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="row border-bottom-Green p-3 justify-content-center">
                            <div className="col fs-10 text-center">
                               Tasa
                            </div>
                            <div className="col fs-10 text-center">
                                RSV
                            </div>
                            <div className="col fs-10 text-center">
                                Banco
                            </div>
                        </div>
                    </div>

                    {buyLoader ?
                        <div className="d-flex col-12 justify-content-center my-4 align-content-center">
                            <Loader color={color} loading={buyLoader}/>
                        </div>
                        :
                        <div className="col-12">
                            {buys &&
                            buys.map((query, id) => (
                                    <OrdersPreview key={id} data={query} type={"buy"} />
                                )
                            )
                            }
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default MarketPreview