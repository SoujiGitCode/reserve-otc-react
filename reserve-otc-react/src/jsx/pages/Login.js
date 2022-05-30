import React, {useEffect, useState} from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    loadingToggleAction, loginAction,
} from '../../store/actions/AuthActions';

import logo from '../../images/otc/rsv-otc-logo-lg-nobg.png'
import AnimatedLetters from "../components/Okapago/AnimatedLetters";

function Login (props) {

    const [letterClass, setLetterClass] = useState('text-animate')
    const textArray = [ 'R', 'e', 's', 'e', 'r', 'v', 'e',' ','O', 'T', 'C']


    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000);
        return () => clearTimeout(timer);
    }, [])


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

        <div className="container-fluid vh-100">
            <div className="row vh-100 align-items-center text-center" style={{background:"#161616"}}>
                <div className="col-12" style={{background:"#161616", padding:"50px"}}>

                    <div className="col-12 my-4 logo-animated">
                            <img src={logo} alt=""  className={"login-logo"}/>
                    </div>
                    <br/><br/>

                    <div className="col-12 " style={{background:"#161616"}}>
                        <div className="row m-0 justify-content-center align-items-center">
                            <div className="col-lg-4">
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12">
                                            <div className="auth-form-1" style={{background:"#161616"}}>
                                                <div className="mb-4">
                                                    <h3 className="text-primary mb-1 ff-dogica mb-4 d-none" >   <AnimatedLetters letterClass={letterClass} strArray={textArray} idx={12}/></h3>
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
                                                <div className="new-account mt-2 allfinNone">
                                                    <p className="">
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
                    
                        <div className="col-12 login-description mt-5 " >
                            <h2 className="text-white josefin mb-2">Current Status:</h2>
                            <p className="fs-12 fc-Green">Development</p>
                            <ul className="social-icons mt-4 d-none">
                                <li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
                                <li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
                                <li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
                            </ul>
                            <div className="mt-5">
                                <Link to={"#"} className="text-white mr-4">Privacy Policy</Link>
                                <Link to={"#"} className="text-white">© 2022 Reserve</Link>
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