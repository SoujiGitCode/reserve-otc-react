import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext";
import axios from "axios"


//axios.defaults.baseURL = "http://localhost:8000/api/"
axios.defaults.baseURL = "https://s4.livingcodestudio.com/api/"
//axios.defaults.baseURL = "https://back.okapagos.com/api/"
axios.defaults.withCredentials=true
ReactDOM.render(
        <Provider store = {store}>
            <SimpleReactLightbox>
                <BrowserRouter basename='/'>
                    <ThemeContext>
                        <App />
                    </ThemeContext>
                </BrowserRouter>    
            </SimpleReactLightbox>
        </Provider>	
    ,
    document.getElementById("root")
);
reportWebVitals();
