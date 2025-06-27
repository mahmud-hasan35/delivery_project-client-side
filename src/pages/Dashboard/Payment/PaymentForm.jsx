import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../../Hook/useAuth';

export default function PaymentForm() {

    const stripe = useStripe();
    const elements = useElements();
    const { parcelId } = useParams();
    const {user} = UseAuth();
    const navigate = useNavigate()


    const axiosSecure = useAxiosSecure();

    const [error, setError] = useState('')

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isPending) {
        return 'loading....'
    }
    console.log(parcelInfo);

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message)

        } else {
            setError('')
            console.log('paymentMethod', paymentMethod);

        }

        // step2: create payment intent //

        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
        if (result.error) {
      setError(result.error.message);
    } else {
        setError('')
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
         const transactionId = result.paymentIntent.id;
                    // step-4 mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }

                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {

                        // ✅ Show SweetAlert with transaction ID
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });

                        // ✅ Redirect to /myParcels
                        navigate('/dashboard/myParcels');

                    }
                }
            }
        }      
    


      


    
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4 border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-center text-green-600">
                    Pay for Parcel Pickup
                </h2>

                <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <CardElement className="bg-white p-2 rounded-md" />
                </div>

                <button
                    className="btn btn-success w-full text-white font-semibold tracking-wide"
                    type="submit"
                    disabled={!stripe}
                >
                    Pay Now $ {amount}
                </button>
                {
                    error && <p className='text-red-600'>{error}</p>
                }

            </form>

        </div>
    )
}
