/**
 * The dependency injection principle states that high level code should 
 * never depend on low level interfaces, and should instead use abstractions.
 */
// ------------------------------------------------------------------------------
/**
 * In below example whole purchase handler system will rely upon PayPal structure of sending 
 * or recieving the data
 * If the payment method gets updated and any new method is applied instead of PayPal, 
 * whole Purchase handler will be updated
 */
class PurchaseHandler {
    processPayment(paymentDetails, amount) {
        // Complicated, PayPal specific logic goes here
        const paymentSuccess = PayPal.requestPayment(paymentDetails, amount);

        if (paymentSuccess) {
            // Do something
            return true;
        }

        // Do something
        return false;
    }
}

// ------------------------------------------------------------------------------

/**
 * To resolve the proble, we'll make a separate class to handle payment process
 */
class PurchaseHandler {
    processPayment(paymentDetails, amount) {
        const paymentSuccess = PaymentHandler.requestPayment(
            paymentDetails,
            amount
        );

        if (paymentSuccess) {
            // Do something
            return true;
        }

        // Do something
        return false;
    }
}

class PaymentHandler {
    requestPayment(paymentDetails, amount) {
        // Complicated, PayPal specific logic goes here
        return PayPal.requestPayment(paymentDetails, amount);
    }
}

/**
 * In this way, although, the code will be a bit more than it was earlier
 * but it'll be much easier to manage in long term.
 */