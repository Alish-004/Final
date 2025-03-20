import axios from "axios"; // Use axios instead of the deprecated request library

function payment(req, res) {
  try {
    // Extract amount from the request body
    let { amount } = req.body;

    amount =amount*100;

    // Validate the amount
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid or missing amount" });
    }
    console.log("Received amount:", amount);

    // Prepare the request options for Khalti API
    const options = {
      method: "POST",
      url: "https://dev.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key 73e1324761654a95aac003f6301bafec", // Replace with your actual Khalti API key
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        return_url: "http://example.com/", // Replace with your actual return URL
        website_url: "https://example.com/", // Replace with your actual website URL
        amount: amount.toString(), // Convert amount to string
        purchase_order_id: "Order01", // Replace with your actual order ID
        purchase_order_name: "test", // Replace with your actual order name
        customer_info: {
          name: "Ram Bahadur", // Replace with actual customer name
          email: "test@khalti.com", // Replace with actual customer email
          phone: "9800000001", // Replace with actual customer phone
        },
      }),
    };

    // Make the request to Khalti API
    axios(options)
      .then((response) => {
        console.log("Khalti API response:", response.data);
        const paymentUrl = response.data.payment_url;
        res.status(200).json({ payment_url: paymentUrl }); // Send the payment URL back to the client
      })
      .catch((error) => {
        console.error("Error calling Khalti API:", error);
        res.status(500).json({ error: "Failed to initiate payment" });
      });
  } catch (error) {
    console.error("Error in payment function:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export default payment;