import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// User requests an extension
export const requestExtension = async (req, res) => {
  try {
    const { rentalId, requestedEndTime } = req.body;
    const userId = req.user.id;

    // Verify the rental belongs to the user
    const rental = await prisma.rental.findFirst({
      where: {
        id: rentalId,
        userId: userId
      },
      include: {
        vehicle: true
      }
    });

    if (!rental) {
      return res.status(404).json({ error: "Rental not found or not owned by user" });
    }

    // Calculate additional amount
    const timeDiff = new Date(requestedEndTime) - new Date(rental.endTime);
    const hours = timeDiff / (1000 * 60 * 60);
    const additionalAmount = hours * rental.vehicle.pricePerHour;

    // Create extension request
    const extensionRequest = await prisma.rentalExtensionRequest.create({
      data: {
        rentalId,
        requestedEndTime: new Date(requestedEndTime),
        additionalAmount,
        startTime: rental.endTime, // Extension starts when original rental ends
        endTime: new Date(requestedEndTime)
      }
    });

    res.status(201).json({
      message: "Extension request submitted",
      extensionRequest,
      additionalAmount
    });

  } catch (error) {
    console.error("Error requesting extension:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User pays for extension
export const payForExtension = async (req, res) => {
  try {
    const { extensionId } = req.body;
    const userId = req.user.id;

    // Verify the extension request belongs to the user
    const extension = await prisma.rentalExtensionRequest.findFirst({
      where: {
        id: extensionId,
        rental: {
          userId: userId
        }
      },
      include: {
        rental: {
          include: {
            vehicle: true
          }
        }
      }
    });

    if (!extension) {
      return res.status(404).json({ error: "Extension request not found" });
    }

    // Initiate payment with Khalti (similar to your existing payment code)
    const amount = extension.additionalAmount * 100; // Convert to paisa

    const options = {
      method: "POST",
      url: "https://dev.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key 73e1324761654a95aac003f6301bafec",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        return_url: "http://localhost:5173/payment/verify",
        website_url: "https://localhost:5173",
        amount: amount.toString(),
        purchase_order_id: `EXT-${extensionId}`,
        purchase_order_name: "Rental Extension",
        customer_info: {
          name: `${req.user.firstName} ${req.user.lastName}`,
          email: req.user.email,
          phone: req.user.contactNumber,
        },
      }),
    };

    const response = await axios(options);
    const paymentUrl = response.data.payment_url;

    // Update extension payment status
    await prisma.rentalExtensionRequest.update({
      where: { id: extensionId },
      data: { paymentStatus: "initiated" }
    });

    res.status(200).json({ 
      payment_url: paymentUrl,
      extensionId 
    });

  } catch (error) {
    console.error("Error paying for extension:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin approves/rejects extension
export const processExtension = async (req, res) => {
  try {
    const { extensionId, action } = req.body; // action: 'approve' or 'reject'

    // Verify admin role is already checked by your admin middleware

    const extension = await prisma.rentalExtensionRequest.findUnique({
      where: { id: extensionId },
      include: { rental: true }
    });

    if (!extension) {
      return res.status(404).json({ error: "Extension request not found" });
    }

    if (action === 'approve') {
      // Update rental end time
      await prisma.rental.update({
        where: { id: extension.rentalId },
        data: { 
          endTime: extension.requestedEndTime,
          amount: {
            increment: extension.additionalAmount
          }
        }
      });

      // Update extension status
      await prisma.rentalExtensionRequest.update({
        where: { id: extensionId },
        data: { 
          status: "approved",
          paymentStatus: "paid"
        }
      });

      return res.json({ message: "Extension approved successfully" });

    } else if (action === 'reject') {
      // Update extension status
      await prisma.rentalExtensionRequest.update({
        where: { id: extensionId },
        data: { 
          status: "rejected",
          paymentStatus: "failed"
        }
      });

      return res.json({ message: "Extension rejected" });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

  } catch (error) {
    console.error("Error processing extension:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get pending extensions (for admin)
export const getPendingExtensions = async (req, res) => {
  try {
    const extensions = await prisma.rentalExtensionRequest.findMany({
      where: { status: "pending" },
      include: {
        rental: {
          include: {
            user: true,
            vehicle: true
          }
        }
      }
    });

    res.json(extensions);
  } catch (error) {
    console.error("Error fetching pending extensions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's extension requests
export const getUserExtensions = async (req, res) => {
  try {
    const userId = req.user.id;

    const extensions = await prisma.rentalExtensionRequest.findMany({
      where: {
        rental: {
          userId: userId
        }
      },
      include: {
        rental: {
          include: {
            vehicle: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(extensions);
  } catch (error) {
    console.error("Error fetching user extensions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};