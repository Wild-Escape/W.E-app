
import { PaymentElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function StripeCheckout() {
    const stripe = useStripe();
    const elements = useElements();
    return (
        <div>
            <p>
                here will be the chekout
            </p>
            <form >
                <CardElement />
                <button type="submit" disabled={!stripe || loading}>Pay</button>
            </form>

        </div>
    )
}

export default StripeCheckout;