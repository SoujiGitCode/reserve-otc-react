import React, {Fragment, useState} from "react";
import TradeMaker from "./TradeMaker";
import BookTradeMaker from "./BookTradeMaker";

function OrderBookList (props){
    const [form, setForm] = useState(true)

    const realCurrentAmount = parseFloat(props.data.amount - props.data.current_amount).toFixed(2)
    const bankName = props.data.BS_bankname

    return(
        <Fragment>
            {form
                ?
                <div className="css-vurnku" className={realCurrentAmount == 0 ? "allfinNone" :null}>
                    <div className="css-tsk0hl row">
                        <div className="css-1q1sp11 row fs-12">

                            <div className="css-11db165 col-3 ">
                                <div className="css-4ptx7h">
                                    <div className="css-1kj0ifu ">
                                        <div className="css-1m1f8hn fs-12">{props.data.exchange_rate}</div>
                                        <div className="css-dyl994 fs-10">Bs</div>
                                    </div>
                                </div>
                            </div>

                            <div className="css-lalzkr col-4">
                                <div className="css-4ptx7h">
                                    <div className="css-1kj0ifu ">
                                        <div className="css-1m1f8hn fs-12">{realCurrentAmount}</div>
                                        <div className="css-dyl994 fs-12">RSV</div>
                                    </div>
                                </div>
                            </div>

                            <div className="css-tlcbro col-4">
                                <div className="css-1n3cl9k">
                                    <div className="css-1xsacww fs-12">
                                        <div data-bn-type="text" className="css-e6o4x5">
                                            {bankName}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="css-12cfnoy col">
                                <div className="css-1kh7ut8">
                                    <button data-bn-type="button" id="C2CofferBuy__btn"
                                            type="button" className=" css-s1iig6 fs-10"
                                            onClick={() =>setForm(false)}
                                    >{props.viewName}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                :
                <BookTradeMaker
                    reload = {value => props.reload(value)}
                    viewName = {props.viewName}
                    form = {form => setForm(form)}
                    orderData = {props.data}
                />
            }

        </Fragment>

    )
}

export default OrderBookList