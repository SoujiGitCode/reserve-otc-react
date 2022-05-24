/// Menu
import MetisMenu from "metismenujs";
import React, {Component, useContext} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGavel, faFilePen, faBuildingColumns, faHouse} from '@fortawesome/free-solid-svg-icons'

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import {Link} from "react-router-dom";

class MM extends Component {
    componentDidMount() {
        this.$el = this.el;
        this.mm = new MetisMenu(this.$el);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}


class SideBar extends Component {

    /// Open menu
    componentDidMount() {

        // sidebar open/close
        var btn = document.querySelector(".nav-control");
        var aaa = document.querySelector("#main-wrapper");

        function toggleFunc() {
            return aaa.classList.toggle("menu-toggle");
        }

        btn.addEventListener("click", toggleFunc);
    }

    state = {
        loveEmoji: false,
    };

    render() {
        //acceder a localstorage para obtener Level
        const storedData = JSON.parse(localStorage.getItem('userDetails'))
        let level = ''
        if (localStorage.getItem('userDetails') !== null) {
            level = storedData.level
        } else {
            level = 0
        }
        // console.log(level)

        /// Path
        let path = window.location.pathname;
        path = path.split("/");
        path = path[path.length - 1];



        console.dir(path)
        /// Active menu
        let dashboard = [
                "",
                "orders",
                "trades"
            ],
            accounts = [
                "add",
                "check",
            ],
            orders = [
                "compra",
                "venta",
            ],
            market = [
                "comprar",
                "vender",
                "book"
            ];


        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">
                    <MM className="metismenu" id="menu">
                        <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faHouse} size={"lg"}/>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link className={`${path === "orders" ? "mm-active" : ""}`} to="/dashboard"
                                          onClick={() => this.props.onClick()}>Ordenes</Link>
                                </li>

                                <li className={level !== "2" ? "allfinNone" : null}>
                                    <Link className={`${path === "trades" ? "mm-active" : ""}`} to="/trades"
                                          onClick={() => this.props.onClick()}>Trades</Link>
                                </li>

                            </ul>
                        </li>


                        <li className={`${accounts.includes(path) ? "mm-active" : ""}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faBuildingColumns} size={"lg"}/>
                                <span className="nav-text">Cuentas Externas</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link className={`${path === "add" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/agregar-cuenta">
                                        Agregar
                                    </Link>

                                    <Link className={`${path === "check" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/cuentas-registradas">
                                        Asociadas
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li className={`${orders.includes(path) ? "mm-active" : ""}`} className={""}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faFilePen} size={"lg"}/>
                                <span className="nav-text">Crear Orden</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link className={`${path === "compra" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/orden-compra">
                                        Compra
                                    </Link>

                                    <Link className={`${path === "venta" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/orden-venta">
                                        Venta
                                    </Link>


                                </li>
                            </ul>
                        </li>


                        <li className={`${market.includes(path) ? "mm-active" : ""}`}
                            className={level !== "2" ? "allfinNone" : null}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faGavel} size={"lg"}/>
                                <span className="nav-text">Order Book</span>
                            </Link>
                            <ul>
                                <li>
                                    <Link className={`${path === "book" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/order-book">
                                        Order Book
                                    </Link>


                                </li>
                            </ul>
                        </li>

                    </MM>
                    <div className="plus-box allfinNone">
                        <p className="fs-16 font-w500 mb-1">Get summary report now</p>
                        <Link to={"#"} className="text-white fs-26"><i
                            className="las la-long-arrow-alt-right"></i></Link>
                    </div>
                    <br/><br/>
                    <div className="copyright allfinNone">
                        <p className="fs-14 font-w200"><strong className="font-w400">Okapago</strong> © 2022 Derechd</p>
                        <p>Made with <i className="fa fa-heart text-danger"></i> by AllfinTec</p>
                    </div>
                </PerfectScrollbar>
            </div>
        );
    }
}

export default SideBar;
