# Nexus Core (`nexus-arch`)

Nexus Core is a high-performance, resilient TypeScript backend module engineered to handle order processing, intelligent routing, and dynamic logistics invoicing. Built natively with modern ECMAScript Modules (ESM) and TypeScript, it serves as the algorithmic "brain" for modern supply chain architectures.

## 🚀 Key Features

* **Automated Order Processing:** Validates, serializes, and commits order manifests directly to the core database subsystem.
* **Live OpenStreetMap (OSRM) Integration:** Consumes real-world telemetry and road network data via the Open Source Routing Machine (OSRM) API to calculate precise driving distances.
* **Fault-Tolerant Fallback Routing:** Implements an automated backup estimation engine using Euclidean geometry to prevent system crashes during API rate-limiting or network downtime.
* **Precision Financial Invoicing:** Calculates dynamic delivery fees and outputs complete, structured billing metrics in Myanmar Kyat (MMK).

## 🛠️ Tech Stack

* **Language:** TypeScript (Strict Mode)
* **Runtime Engine:** Node.js (v20+)
* **Execution Wrapper:** `tsx` (TypeScript Execute)
* **Upstream APIs:** Open Source Routing Machine (OSRM) API

## 📁 System Architecture

```text
src/
├── core/
│   ├── matrixEngine.ts     # Internal data structures and processing
│   └── routingEngine.ts    # API communication & geometric fallback safety
├── types/
│   ├── common.ts           # Shared geometric and business type definitions
│   └── osrm.ts             # API response schema contracts
└── index.ts                # Application lifecycle entry point
```

## ⚙️ Setup & Installation

### Prerequisites
Ensure you have **Node.js** installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/Ye-Htet-San/nexus-core.git](https://github.com/Ye-Htet-San/nexus-core.git)
cd nexus-core
```

### 2. Install Development Dependencies
```bash
npm install
```

## 🏃 How to Run

To run the core processing engine locally in development mode without compiling physical JavaScript files to disk:

```bash
npx tsx src/index.ts
```

### Sample Output Log
```text
[Database] Successfully saved record: Nex-1109

--- Processing Order Nex-1109 ---
📡 Connecting to Routing Satellite...
✅ Route Calculated via OpenStreetMap.
🛣️ Driving Distance: 5.38 km
🚚 Delivery Fee: 5,378.00 MMK
💰 Final Invoice: 195,378.00 MMK
```