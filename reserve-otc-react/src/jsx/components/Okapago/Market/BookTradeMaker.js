import React, {useState} from "react";
import ConfirmTrade from "./ConfirmTrade";

function BookTradeMaker (props){
    const [buyAmount, setBuyAmount] = useState("")
    const realCurrentAmount = parseFloat(props.orderData.amount - props.orderData.current_amount).toFixed(2)
    const bankName = props.orderData?.BS_bankname


    function backForm (){
        props.form(true)
        setBuyAmount("")
    }

    return(
        <div className="row">
            <div className="css-1hajp8f row">
                <div className="css-1o7at9a col-6">
                    <div className="css-cz1u7 row">

                        <div className="css-xtcyz1 row">
                            <div className="css-1kvjun2 col-12 fs-12">
                                <div className="row">
                                    <div data-bn-type="text" className="fc-Blue font-weight-bolder col-12 mb-1">Precio</div>
                                    <div data-bn-type="text" className="col-12 fc-DarkGrey">{props.orderData.exchange_rate} Bs</div>
                                </div>
                            </div>

                            <div className="css-1kvjun2 col-12 fs-12">
                                <div className="row">
                                    <div data-bn-type="text" className="fc-Blue font-weight-bolder col-12 mb-1">Disponible</div>
                                    <div data-bn-type="text" className="col-12 fc-DarkGrey">{realCurrentAmount} RSV</div>
                                </div>
                            </div>

                            <div className="css-1kvjun2 col-12 fs-12">
                                <div className="row">
                                    <div data-bn-type="text" className="fc-Blue font-weight-bolder col-12 mb-1">Método de Pago</div>
                                    <div data-bn-type="text" className="col-12 fc-DarkGrey">{bankName}</div>
                                </div>
                            </div>

                            <div className="css-1kvjun2 col-12 fs-12">
                                <div className="row">
                                    <div data-bn-type="text" className="fc-Blue font-weight-bolder col-12 mb-1">Tiempo</div>
                                    <div data-bn-type="text" className="col-12 fc-DarkGrey"></div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="col-6">
                    <div className="css-1wz0uwi row">
                        <div className="css-6rvcuk col-12">
                            <div className="css-1om4vs3">
                                <div data-bn-type="text" className="css-u1xg25 fs-12 text-center">Quiero {props.viewName}</div>
                                <div className=" css-m4abs">
                                    <input data-bn-type="input" id="C2CofferBuy_quantity_input" aria-label=""
                                           placeholder="0.00" autoComplete="off"
                                           className="css-16fg16t" value={buyAmount}
                                           onChange={e => setBuyAmount(e.target.value)}
                                    />
                                    <div className="bn-input-suffix css-vurnku">
                                        <div className="css-10nf7hq">
                                            <button data-bn-type="button" id="C2Cofferlistbuy_btn_allamount" type="button"
                                                    className=" css-l2myl5"

                                                    onClick={()=>setBuyAmount(realCurrentAmount)}
                                            >Max
                                            </button>
                                            <div data-bn-type="text" className="css-18grlu8">RSV</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="css-12jje50">
                            <div className="css-j8kgrd text-center justify-content-center">
                                <button data-bn-type="button" id="C2CofferBuy__btn_cancel"
                                        className=" css-jz0105 fs-10"
                                        onClick={() =>backForm()}
                                >Cancelar
                                </button>

                                <ConfirmTrade
                                    clearBuyAmount = {val => setBuyAmount(val)}
                                    reload = {value => props.reload(value)}
                                    viewName={props.viewName}
                                    orderData={props.orderData}
                                    buyAmount = {buyAmount}
                                    clearform = {form => props.clearForm(form)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default BookTradeMaker;