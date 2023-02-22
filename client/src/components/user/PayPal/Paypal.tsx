import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Router, { useRouter } from "next/router";
import { ApprovedDonation } from "@/Apis/userApi/userRequests";
import Swal from "sweetalert2";
const PayPal = ({donation,setDonate,creatorId}:{donation:number,setDonate:any,creatorId:any}) => {
    console.log(creatorId,'-----------------')

    
    const [paidFor, setPaideFor] = useState(false);
    const [error, setError] = useState();
    const router = useRouter()

    const handleApprove = async (info:any,creatorId:any)=>{
        const response = await ApprovedDonation(info,creatorId)
        if(response.status === true){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
            setDonate(false)
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops! Something went wrong ',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    
    return (  
        <>
            <PayPalButtons
            style={{
                color:'silver',
                layout: 'horizontal',
                tagline:false,
                shape:'pill',
            }}

            createOrder={(data:any,actions:any)=>{
                return actions.order.create({
                    purchase_units:[
                        {
                            description:'hello',
                            amount:{
                                value: donation * 3 
                            }
                        }
                    ]
                })
            }}
            onApprove={async(data:any,actions:any)=>{
                const order = await actions.order.capture();
                console.log(order)
                let info = {
                    orderId : order.id,
                    note : order.purchase_units[0].description,
                    amount:order.purchase_units[0].amount.value
                }
                handleApprove(info,creatorId)
            }}

            onCancel={()=>{
                setDonate(false)  
            }}

            onError={(error:any )=>{
                setError(error?.message);
                console.log(error)
            }}
            />
        </>
    );
}
 
export default PayPal;