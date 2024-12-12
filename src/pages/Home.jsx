import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import logo from '../assets/logo.png'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Home() {
    const [loading, setLoading] = useState(true)
    const [phoneNumber,setPhoneNumber]=useState(`+91 0000000000`)
    const navi=useNavigate()

    useEffect(() => { 
      setLoading(true)
    onAuthStateChanged(auth,(user)=>{
        if(user)
        {
            setPhoneNumber(user.phoneNumber)
            setLoading(false)
        }
        else{

            navi('/')
        }
    })
     
    }, [])
    


    const Logout=()=>{
        signOut(auth).then(res=>{
            console.log(res,'signed out')
            toast.success('Logged Out Successfully')
        })
        .catch(err=>{
            console.log(err)
            toast.error('Facing issue to logout')

        })
    }
    return (
        <div>
            {
                !loading?
               <>
                    <div className='d-flex justify-content-end align-items-center w-100 pe-5'>
                    <img className='img-fluid rounded-pill my-4 shadow-lg me-5 mt-3' src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />
    
                </div>
                <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
    
                    <Row className='w-50'>
                        <Col sm={12}>
                            <h4 className='text-center' style={{fontWeight:'600'}}>{phoneNumber}</h4>
    
                        </Col>
                        <Col sm={12}>
                            <button className='btn w-100 rounded-1 text-white p-2 mt-4' style={{ background: '#515DEF', fontSize: '13px' }} onClick={Logout}>Logout</button>
    
                        </Col>       </Row>
                </div>
               </>
            :<div className='d-flex justify-content-center align-items-center'style={{height:'100vh'}}><div class="spinner-border text-dark "  role="status"/></div>
            }
        </div>
    )
}

export default Home