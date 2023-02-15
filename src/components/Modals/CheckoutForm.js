import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Button } from 'reactstrap'
import { makePayment } from 'Api/api'
import Swal from "sweetalert2";
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "balck",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}
const CheckoutForm = (props) => {
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('keys')))
    const stripe = useStripe()
    const elements = useElements()
console.log(props,"tripData");
    const stripePayment = async () => {
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        


        if (!error) {
            try {
                
                const { id } = paymentMethod
                const values = {
                    clientId: role.id,
                    tripDetails: props.tripdata,
                    paymentId: id
                }
                await makePayment(values)
                    .then((res) => {

                        if (res.data.message === "Payment successful") {

                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Payment successful",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                            window.location.reload();
                        }
                        else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                text: "Try Again",
                                color: "black",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                           

                        }
                    });

                 
                

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }
  return (
      <form >
          <fieldset className="FormGroup">
              <div className="FormRow">
                  <CardElement options={CARD_OPTIONS} />
              </div>
              <div className='text-center'>
              <Button className="mt-4 " color="outline-primary" type="button" onClick={stripePayment}  >
                  Make Payment
              </Button>
              </div>
          </fieldset>
         
      </form>
  )
}

export default CheckoutForm