import React, {useState} from "react";
import ConfirmTrade from "./ConfirmTrade";

function TradeMaker (props){
    const [buyAmount, setBuyAmount] = useState("")
    const realCurrentAmount = parseFloat(props.orderData.amount - props.orderData.current_amount).toFixed(2)
    const bankName = props.orderData.BS_bankname


    function backForm (){
        props.form(true)
        setBuyAmount("")
    }

    return(
        <div className="css-1hajp8f">
            <div className="css-1o7at9a">
                <div className="css-cz1u7">
                    <div className="css-1g6j43w">
                        <div className="css-1utmfrx">
                            <div className="css-ll4xv2">
                                <div className="css-1fv580x">C</div>
                                Cliente allfin
                            </div>
                        </div>
                    </div>
                    <div className="css-xtcyz1">
                        <div className="css-1kvjun2">
                            <div data-bn-type="text" className="css-lo7kq7">Precio</div>
                            <div data-bn-type="text" className="css-1bshycy">{props.orderData.exchange_rate} VES</div>
                        </div>
                        <div className="css-1kvjun2">
                            <div data-bn-type="text" className="css-lo7kq7">Disponible</div>
                            <div data-bn-type="text" className="css-14zih0z">{realCurrentAmount} RSV</div>
                        </div>
                        <div className="css-g52tvx">
                            <div data-bn-type="text" className="css-lo7kq7">Tiempo Límite del Pago</div>
                            <div data-bn-type="text" className="css-1f6wzax"> no definido</div>
                        </div>
                        <div className="css-g52tvx">
                            <div data-bn-type="text" className="css-1h66qy5">Método de pago: </div>
                            <div className="css-12ws9nh">
                                <div className="css-1na7kzu">
                                    <div className="css-15b4at0">
                                        <div data-bn-type="text" className="css-ah8x14">{bankName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="css-1r7s9sd">
                <div className="css-1wz0uwi">
                    <div className="css-6rvcuk">
                        <div className="css-1om4vs3">
                            <div data-bn-type="text" className="css-u1xg25">Quiero {props.viewName}</div>
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
                        <div className="css-j8kgrd">
                            <button data-bn-type="button" id="C2CofferBuy__btn_cancel"
                                    className=" css-jz0105"
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

    )
}

export default TradeMaker;