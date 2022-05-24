import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import { Row, Card, Col, ListGroup, Badge, Tab } from "react-bootstrap";
import Reserve from "../bootstrap/ReserveModal";
import NationalBankModal from "../bootstrap/NationalBankModal";

const UiListGroup = () => {

    return (
        <Fragment>
            <Row className={"justify-content-center"}>
                <div className="col-xl-6">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title col-sm-12 text-center"> <p className="text-center">
                               Agregar Cuenta Externa</p></div>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><Reserve /></li>
                                <li className="list-group-item"><NationalBankModal bank/></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </Row>
        </Fragment>
    );
};

export default UiListGroup;
