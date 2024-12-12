import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import logo from '../assets/logo.png'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { verifySchema } from '../pages/yup'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDatabase, onValue, ref } from 'firebase/database';
import { app } from '../firebase.config';

const initialValues = {
    otp: ''
}
function Verify({ setState }) {
    const [loading, setLoading] = useState(false)
    const db = getDatabase(app)

    const navi = useNavigate()
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues,
        validationSchema: verifySchema,
        onSubmit: (values) => {
            setLoading(!loading)
            window.confirmationResult.confirm(values.otp).then(res => {
                const check = ref(db, 'users/' + res.user.phoneNumber)
                onValue(check, (data) => {
                    if (data.exists()) {
                        toast.success('OTP Verifyed')
                        setLoading(false)
                        navi('/home')
                    }
                    else {
                        toast.success('User not Found')
                        setLoading(false)
                        navi('/signup')
                    }
                })

            })
                .catch(err => {
                    toast.error('incorrect OTP')
                    setLoading(false)

                })
        }
    })
    return (


        <Col sm={6} className='my-2'>
            <img className='img-fluid rounded-pill my-4 shadow-lg' src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />

            <div className='py-5 mx-4 w-75'>
                <small className='mb-5' style={{ color: '#313131', fontSize: '13px', cursor: 'pointer' }} onClick={() => setState(true)}><i class="fa-solid fa-angle-left me-1"></i>  Back to login</small>
                <h2 style={{ fontWeight: 600, color: '#313131' }} className='mt-4' >Verify Code</h2>
                <small style={{ color: '#313131' }} className=' '>Login to access your travelwise  account</small>
                <form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Enter Code"
                        className="w-100 mt-5 mb-1"
                    >
                        <Form.Control type="number" name='otp' placeholder="otp" style={{ borderColor: '#1C1B1F' }} value={values.otp} onBlur={handleBlur} onChange={handleChange} />
                    </FloatingLabel>
                    <div className='form_error'><p className='text-danger'>{errors.otp}</p> </div>
                    <small><span>Didn’t receive a code?</span><span style={{ color: '#FF8682' }} > Resend</span></small>

                    <button type='submit' className='btn w-100 rounded-1 text-white p-2' style={{ background: '#515DEF', fontSize: '13px' }} disabled={loading}>
                        {loading ? <div class="spinner-border text-light" role="status">
                        </div> : 'Verify'}</button>
                </form> <br />
                <div className='w-100 text-center my-2'>
                </div>

            </div>
        </Col>

    )
}

export default Verify