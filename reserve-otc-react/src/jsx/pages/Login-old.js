import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    loadingToggleAction, loginAction, logout,
} from '../../store/actions/AuthActions';

//
//import logo from '../../images/logo-2.png'
import logo from '../../images/otc/web-logo.png';
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";

function Login (props) {
    //clear cached ata
   /* const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
        alert('Complete Cache Cleared')
    };*/

    const [email, setEmail] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function onLogin(e) {
        e.preventDefault();

        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return ;
		}
		dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, props.history));
    }


  return (

        <div className="login-main-page" style={{backgroundImage:"url("+ loginbg +")"}}>
            <div className="login-wrapper">
                <div className="login-aside-left" style={{backgroundImage:"url("+ login +")"}}>
                    <Link to="/dashboard" className="login-logo">
                        <img src={logo} alt="" />
                      </Link>
                    <div className="login-description">
                        <h2 className="text-black  mb-2">Current Status:</h2>
                        <p className="fs-12">Development</p>
                        <ul className="social-icons mt-4">
                            <li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
                            <li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
                            <li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
                        </ul>
                        <div className="mt-5">
                            <Link to={"#"} className="text-black mr-4">Privacy Policy</Link>
                            <Link to={"#"} className="text-black mr-4">Contact</Link>
                            <Link to={"#"} className="text-black">© 2021 AllfinTec</Link>
                        </div>
                    </div>
                </div>
                <div className="login-aside-right">
                    <div className="row m-0 justify-content-center h-100 align-items-center">
                      <div className="col-xl-7 col-xxl-7">
                        <div className="authincation-content">
                          <div className="row no-gutters">
                            <div className="col-xl-12">
                              <div className="auth-form-1">
                                <div className="mb-4">
                                    <h3 className="text-primary mb-1">Bienvenido a Okapago</h3>
                                    <p className="">Ingrese con sus credenciales en el siguiente formulario</p>
                                </div>
                                {props.errorMessage && (
                                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                                        {props.errorMessage}
                                    </div>
                                )}
                                {props.successMessage && (
                                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                                        {props.successMessage}
                                    </div>
                                )}
                                <form onSubmit={onLogin}>
                                    <div className="form-group">
                                        <label className="mb-2 ">
                                          <strong>Correo</strong>
                                        </label>
                                        <input type="email" className="form-control"
                                          value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                        />
                                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2 "><strong>Contraseña</strong></label>
                                        <input
                                          type="password"
                                          className="form-control"
                                          value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                    </div>
                                  <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="form-group">
                                      <div className="custom-control custom-checkbox ml-1 ">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="basic_checkbox_1"
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="basic_checkbox_1"
                                        >
                                          Recordarme
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className="btn btn-primary btn-block"
                                    >
                                      Entrar
                                    </button>
                                  </div>
                                </form>
                                <div className="new-account mt-2">
                                  <p className="allfinNone">
                                    Don't have an account?{" "}
                                    <Link className="text-primary" to="./page-register">
                                      Sign up
                                    </Link>
                                  </p>


                                    <Link className="allfinNone text-primary" to="./page-recovery">
                                        Password Recovery
                                    </Link>
                                </div>


                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {

   // console.log('login enviado state :'+ JSON.stringify(state))
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);