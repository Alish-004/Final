import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function VerifyPayment() {
  const [searchParams] = useSearchParams();

  // Get individual parameters
  const pidx = searchParams.get('pidx');
  const txnId = searchParams.get('txnId');
  const amount = searchParams.get('amount');
  const status = searchParams.get("status");

  useEffect(() => {
    async function updateRental() {
      try {
        const rentalId = localStorage.getItem("rentalId");

        if (!rentalId) {
          console.warn("No rentalId found in localStorage.");
          return;
        }

        await axios.post("http://localhost:4000/rental/update", {
          rentalId: rentalId
        });

        window.location.href= "/profile"
        console.log("Rental update successful.");
      } catch (error) {
        console.error("Error updating rental:", error);

      }
    }

    if (status === "Completed") {
      updateRental();
    }
  }, [status]);

  return (
    <div>
      <p>Payment ID: {pidx}</p>
      <p>Transaction ID: {txnId}</p>
      <p>Amount: {amount}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default VerifyPayment;
