import * as yup from 'yup'


export const loginSchema= yup.object({
    phone:yup.string().min(10).max(10).required('Please Enter valid Number')
})

export const verifySchema= yup.object({
    otp:yup.string().min(6).max(6).required('Please Enter 6 digit OTP')
})

export const signupSchema=yup.object({
    name:yup.string().min(3).required('Enter name'),
    phone:yup.string().min(10).required('Enter phone'),
    email:yup.string().email().min(4).required('Enter email'),

})