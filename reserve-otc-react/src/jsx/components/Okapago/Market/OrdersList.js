import React, {Fragment, useState} from "react";
import TradeMaker from "./TradeMaker";

function OrdersList (props){
    //console.dir(props.data)

    const [form, setForm] = useState(true)

    const realCurrentAmount = parseFloat(props.data.amount - props.data.current_amount).toFixed(2)
    const bankName = props.data.BS_bankname

    return(
        <Fragment>
            {form
                ?
                <div className="css-vurnku" className={realCurrentAmount == 0 ? "allfinNone" :null}>
                    <div className="css-tsk0hl">
                        <div className="css-1q1sp11">
                            <div className="css-1mjaumg">
                                <div className="css-22x53h">
                                    <div className="css-1rhb69f">
                                        <div className="css-188b24c">C</div>
                                        Cliente allfin
                                    </div>
                                </div>
                            </div>
                            <div className="css-11db165">
                                <div className="css-4ptx7h">
                                    <div className="css-1kj0ifu">
                                        <div className="css-1m1f8hn">{props.data.exchange_rate}</div>
                                        <div className="css-dyl994">VES</div>
                                    </div>
                                </div>
                            </div>
                            <div className="css-lalzkr">
                                <div className="css-vurnku">
                                    <div className="css-3v2ep2">
                                        <div className="css-1v5oc77">Disponible</div>
                                        <div className="css-vurnku">{realCurrentAmount} RSV</div>
                                    </div>
                                </div>
                            </div>

                            <div className="css-tlcbro">
                                <div className="css-1n3cl9k">
                                    <div className="css-1xsacww">
                                        <div data-bn-type="text" className="css-e6o4x5">
                                            {bankName}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="css-12cfnoy">
                                <div className="css-1kh7ut8">
                                    <button data-bn-type="button" id="C2CofferBuy__btn"
                                            type="button" className=" css-s1iig6"
                                            onClick={() =>setForm(false)}
                                    >{props.viewName}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <TradeMaker
                    reload = {value => props.reload(value)}
                    viewName = {props.viewName}
                    form = {form => setForm(form)}
                    orderData = {props.data}
                />
            }

        </Fragment>

    )
}

export default OrdersList