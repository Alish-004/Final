import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function PaymentHistory() {
  // Sample payment data
  const payments = [
    {
      id: "TX123456",
      date: "2023-10-01",
      amount: "$50.00",
      status: "Completed",
    },
    {
      id: "TX123457",
      date: "2023-10-02",
      amount: "$75.00",
      status: "Pending",
    },
    {
      id: "TX123458",
      date: "2023-10-03",
      amount: "$100.00",
      status: "Completed",
    },
    {
      id: "TX123459",
      date: "2023-10-04",
      amount: "$45.00",
      status: "Failed",
    },
  ];

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>

      {/* Payment Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        payment.status === "Completed"
                          ? "green"
                          : payment.status === "Pending"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {payment.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default PaymentHistory;