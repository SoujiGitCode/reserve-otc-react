import React, { Fragment } from "react";
import { ButtonGroup, Dropdown, SplitButton } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import PageTItle from "../../layouts/PageTitle";

const Security = () => {
    return (
        <Fragment>
            <PageTItle activeMenu="Security" motherMenu="Form" pageContent="Change Password" />
            <div className="row justify-content-center ">
                <div className="col-sm-12 col-lg-6">
                    <div className="card">
                        <div className="card-header justify-content-center">
                            <h4 className="card-title text-center" >Change Login Password</h4>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Old Password</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">New Password</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Confirm Password</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Repeat Password"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row justify-content-center">
                                        <div className="col-sm-12 text-center">
                                            <button type="submit" className="btn btn-outline-primary btn-square">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </Fragment>
    );
};

export default Security;
