import { MatrixEngine } from "./core/matrixEngine.js";
import { RoutingEngine } from "./core/routingEngine.js";
import { BaseReopsitory } from "./repository/baseRepository.js";
import type { CommercialOrder } from "./types/common.js";
import express from "express";
import cors from "cors";
import { error } from "node:console";

class OrderRepository extends BaseReopsitory<CommercialOrder>{ }

const db = new OrderRepository();

db.save({
     id: "Nex-1109",
    item: "Mechanical Keyboard",
    price: 180_000,
    pickupLocation:[21.9925,96.0953],//[0, 2]
    deliveryLocation: [21.9545,96.0967]//[0, 7]
})

// const incomingOrder: CommercialOrder = {
//     id: "Nex-1109",
//     item: "Mechanical Keyboard",
//     price: 180_000,
//     pickupLocation:[21.9925,96.0953],//[0, 2]
//     deliveryLocation: [21.9545,96.0967]//[0, 7]
// };

// db.save(incomingOrder);

// const orderToProcess = db.getById("Nex-1109");
// if (orderToProcess) {
//     console.log(`\n--- Processing Order ${orderToProcess.id} ---`);

//     const isRoutable = MatrixEngine.isValidRoute(
//         orderToProcess.pickupLocation,
//         orderToProcess.deliveryLocation
//     );
//     if (isRoutable) {
//         const distance = MatrixEngine.calculateBlocks(
//             orderToProcess.pickupLocation,
//             orderToProcess.deliveryLocation
//         );
//         const deliveryFee = distance * 1500; // 1500 per block
//         const tax = orderToProcess.price * 0.05; // 5% commercial tax
//         const total = orderToProcess.price + deliveryFee + tax;

//         console.log(`✅ Route Approved. Distance: ${distance} blocks.`);
//         console.log(`💰 Final Invoice: ${total.toLocaleString()} MMK`);
    
//     } else {
//         console.log(`❌ Order Rejected: Invalid delivery route coordinates.`);
//     }
// }

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/process/:orderId", async (req, res) => {
    const orderId = req.params.orderId;
    const orderToProcess = db.getById(orderId);

    if (!orderToProcess) {
        return res.status(404).json({ error: "Order not found." });

    }

    console.log(`\n--- Processing Order ${orderToProcess.id} ---`);
    console.log(`📡 Connecting to Routing Satellite...`);

    const distanceInKm = await RoutingEngine.getRealDrivingDistance(
        orderToProcess.pickupLocation,
        orderToProcess.deliveryLocation
    );

    if (distanceInKm > 0) {
        const deliveryFee = distanceInKm * 1000;
        const tax = orderToProcess.price * 0.05;
        const total = orderToProcess.price + deliveryFee + tax;

        res.json({
            success: true,
            distance: distanceInKm.toFixed(2),
            fee: deliveryFee,
            tax: tax,
            total: total,
            item: orderToProcess.item

        });


    } else {
        res.status(400).json({
            error: "Could not calculate a valid route."
        })
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Nexus API Engine running on http://localhost:${PORT}`);
})
// async function processOrder() {
//     const orderToProcess = db.getById("Nex-1109");

//     if (orderToProcess) {
//         console.log(`\n --- Processing Order ${orderToProcess.id} ---`);
//         console.log(`📡 Connecting to Routing Satellite...`);

//         const distanceInKm = await RoutingEngine.getRealDrivingDistance(
//             orderToProcess.pickupLocation,
//             orderToProcess.deliveryLocation
//         )
    
//         if (distanceInKm > 0) {
//             const deliveryFee = distanceInKm * 1000;
//             const tax = orderToProcess.price * 0.05;
//             const total = orderToProcess.price + deliveryFee + tax;


//             console.log(`✅ Route Calculated via OpenStreetMap.`);
//             console.log(`🛣️ Driving Distance: ${distanceInKm.toFixed(2)} km`);
//             console.log(`🚚 Delivery Fee: ${deliveryFee.toLocaleString()} MMK`);
//             console.log(`💰 Final Invoice: ${total.toLocaleString()} MMK`)
//         } else {
//             console.log(`❗❗ Order Rejected!: Could not calculate a valid route`)
//         }
//     }
// }

// processOrder();