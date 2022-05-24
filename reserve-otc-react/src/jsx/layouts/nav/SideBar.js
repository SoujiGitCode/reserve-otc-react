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
        path = path[path.length - 1]

        /// Active menu
        let dashboard = [
                "dashboard",
                "trades",
                "new-dashboard"
            ],
            accounts = [
                "agregar-cuenta",
                "cuentas-registradas",
            ],
            orders = [
                "orden-compra",
                "orden-venta",
            ],
            market = [
                "order-book",
            ];

       // console.dir(dashboard.includes(path))

        return (
            <div className="deznav">
                <PerfectScrollbar className="deznav-scroll">
                    <MM className="metismenu" id="menu">
                        <li className={`${dashboard.includes(path) ? "mm-active arrow-down" : "mm-nonactive"}`} id={"test"}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faHouse} size={"lg"}/>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                            <ul className={`${dashboard.includes(path) ? "d-soft-block" : "mm-collapse"}`} >
                                <li>
                                    <Link className={`${path === "dashboard" ? "mm-active" : ""}`} to="/dashboard"
                                          onClick={() => this.props.onClick()}>Ordenes</Link>
                                </li>

                                <li className={level !== "2" ? "allfinNone" : null}>
                                    <Link className={`${path === "trades" ? "mm-active" : ""}`} to="/trades"
                                          onClick={() => this.props.onClick()}>Trades</Link>
                                </li>

                                <li className={level !== "2" ? "allfinNone" : null}>
                                    <Link className={`${path === "new-dashboard" ? "mm-active" : ""}`} to="/new-dashboard"
                                          onClick={() => this.props.onClick()}>New Dashboard</Link>
                                </li>
                            </ul>
                        </li>


                        <li className={`${accounts.includes(path) ?  "mm-active arrow-down" : "mm-nonactive"}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faBuildingColumns} size={"lg"}/>
                                <span className="nav-text">Cuentas Externas</span>
                            </Link>
                            <ul className={`${accounts.includes(path) ? "d-soft-block" : "mm-collapse"}`} >
                                <li>
                                    <Link className={`${path === "agregar-cuenta" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/agregar-cuenta">
                                        Agregar
                                    </Link>

                                    <Link className={`${path === "cuentas-registradas" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/cuentas-registradas">
                                        Asociadas
                                    </Link>

                                </li>
                            </ul>
                        </li>

                        <li className={`${orders.includes(path) ?  "mm-active arrow-down" : "mm-nonactive"}`} >
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faFilePen} size={"lg"}/>
                                <span className="nav-text">Crear Orden</span>
                            </Link>
                            <ul className={`${orders.includes(path) ? "d-soft-block" : "mm-collapse"}`} >
                                <li>
                                    <Link className={`${path === "orden-compra" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/orden-compra">
                                        Compra
                                    </Link>

                                    <Link className={`${path === "orden-venta" ? "mm-active" : ""}`}
                                          onClick={() => this.props.onClick()} to="/orden-venta">
                                        Venta
                                    </Link>


                                </li>
                            </ul>
                        </li>


                        <li className={`${market.includes(path) ? "mm-active arrow-down" : "mm-nonactive"} ${level !== "2" ? "allfinNone" : null}`}>
                            <Link className="has-arrow ai-icon" to="#">
                                <FontAwesomeIcon icon={faGavel} size={"lg"}/>
                                <span className="nav-text">Order Book</span>
                            </Link>
                            <ul className={`${market.includes(path) ? "d-soft-block" : "mm-collapse"}`} >
                                <li>
                                    <Link className={`${path === "order-book" ? "mm-active" : ""}`}
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