import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/otc/rsv-otc-logo-sm.png'
import Loader from '../pages/Loader/Loader';
import axios from'axios'
import {Redirect} from "react-router-dom";

import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
function Register(props) {


   /* const Login = lazy(() => {
        return new Promise(resolve => {
            setTimeout(() => resolve(import('../../jsx/pages/Login')), 500);
        });
    });*/

    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [redirect , setRedirect] = useState(false);

    const dispatch = useDispatch();

    const onSignUp= async (e) => {
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
        }else if (password !== passwordConfirm) {
            errorObj.passwordConfirm = 'Passwords must match';
            error = true;
        }else{
            await axios.post('/register',
                {
                    first_name: name,
                    last_name: lastName,
                    email: email,
                    password:password,
                    password_confirm: passwordConfirm
                });
            setRedirect(true);


        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(email, password, props.history));
    }

    console.log(redirect)
    if (redirect) return  <Redirect to={'/login'} />
  return (

    <div className='authincation h-100 p-meddle'>

        <div className='container h-100'>
            <div className='row justify-content-center h-100 align-items-center'>
                <div className='col-md-6'>
                    <div className='authincation-content'>
                        <div className='row no-gutters'>
                            <div className='col-xl-12'>
                                {props.showLoading && <Loader />}
                                <div className='auth-form'>
                                    <div className='text-center mb-3'>
                                        <img src={logo} alt="" />
                                    </div>
                                    <h4 className='text-center mb-4 text-white'>Sign up your account</h4>
                                    {props.errorMessage && (
                                        <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                                            {props.errorMessage}
                                        </div>
                                    )}
                                    {props.successMessage && (
                                        <div className='bg-green-300 text-danger text-green-900  p-1 my-2'>
                                            {props.successMessage}
                                        </div>
                                    )}
                                    <form onSubmit={onSignUp}>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Name</strong>
                                            </label>
                                            <input type='text' className='form-control' placeholder='first name'name='name'
                                                   onChange={(e) => setName(e.target.value)} />

                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                                <strong>Last Name</strong>
                                            </label>
                                            <input type='text' className='form-control' placeholder='last name'name='lastName'
                                                   onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Email</strong>
                                            </label>
                                            <input type="email" className="form-control"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                        </div>
                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                              <strong>Password</strong>
                                            </label>
                                            <input type="password" className="form-control"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label className='mb-1 text-white'>
                                                <strong>Confirm Password</strong>
                                            </label>
                                            <input type="password" className="form-control"
                                                   value={passwordConfirm}
                                                   onChange={(e) =>
                                                       setPasswordConfirm(e.target.value)}
                                            />
                                        </div>
                                        {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                        {errors.passwordConfirm && <div className="text-danger fs-12">{errors.passwordConfirm}</div>}
                                        <div className='text-center mt-4'>
                                            <input type='submit' className='btn btn-primary btn-block' value={"Send"}/>
                                        </div>
                                    </form>
                                    <div className='new-account mt-3 text-white'>
                                        <p>
                                            Already have an account?{' '}
                                            <Link className='text-primary' to='/login'>
                                                Sign in
                                            </Link>

                                        </p>
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
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);
