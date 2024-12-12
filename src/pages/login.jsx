
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import logo from '../assets/logo.png';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import slider1 from '../assets/slider1.png';
import Verify from '../components/Verify';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../pages/yup';
import { app, auth } from '../firebase.config';
import { getAuth, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-toastify';

const initialValues = {
    phone: ''
};

function Login() {
    const navi = useNavigate();
    const [state, setState] = useState(true);
    const [loading, setLoading] = useState(false);
    const [mount, setMount] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setMount(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navi('/home');
            } else {
                setMount(false);
            }
        });

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' });
            recaptcha.render().then(() => {
                setLoading(true);
                const phone = `+91${values.phone}`;

                signInWithPhoneNumber(auth, phone, recaptcha)
                    .then((res) => {
                        window.confirmationResult = res;
                        setLoading(false);
                        setState(!state);
                        toast.success('OTP sent successfully');
                    })
                    .catch((err) => {
                        setLoading(false);
                        toast.success('For testing purposes, use phone 9999999999 and OTP 123456');
                    });
            }).catch((error) => {
                toast.error('Refresh the page before trying again');
            });
        }
    });

    return (
        <div className='flex justify-content-center' >
            {!mount ?
                <Row className='d-flex justify-content-center align-items-center' style={{  paddingInline: '6vw' }}>

                    {state ?
                        <Col   className='ps-5'>
                            <img className='img-fluid rounded-pill  shadow-lg' src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />
                            <div className='py-5 mx-4 w-75'>
                                <h2 style={{ fontWeight: 600, color: '#313131' }}>Login</h2>
                                <small style={{ color: '#313131' }} className='mt-2 mb-5'>An authentication code has been sent to your email.</small>
                                <form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingInput" label="Enter Mobile Number" className="w-100 mt-5">
                                        <Form.Control
                                            type="String"
                                            placeholder="Phone"
                                            name='phone'
                                            style={{ borderColor: '#1C1B1F' }}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.phone}
                                        />
                                    </FloatingLabel>
                                    <div className='form_error mb-4'>
                                        <p className='text-danger'>{errors.phone}</p>
                                    </div>
                                    <div id='recaptcha-container'></div>
                                    <button type='submit' className='btn w-100 rounded-1 text-white p-2' style={{ background: '#515DEF', fontSize: '13px' }} disabled={loading}>
                                        {loading ? <div className="spinner-border text-light" role="status"></div> : 'Get OTP'}
                                    </button>
                                </form>
                                <br />
                                <div className='w-100 text-center my-2'>
                                    <small><span>Don't have an account?</span> <Link to={'/signup'} style={{ textDecoration: 'none' }}><span style={{ color: '#FF8682' }}> Sign up</span></Link></small>
                                </div>
                            </div>
                        </Col>
                        : <Verify setState={setState} />
                    }
                    {width >= 700 && (
                        <>
                            <Col  className='slider-side d-flex justify-content-center  '>
                                <img src={slider1} className='img-fluid border -shadow' style={{borderRadius:"6px",width:"400vh"}} alt="" />
                            </Col>
                        </>
                    )}
                </Row> :
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className="spinner-border text-dark" role="status" />
                </div>
            }
        </div>
    );
}

export default Login;
