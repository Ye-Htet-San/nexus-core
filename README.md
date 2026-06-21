# Nexus Core (`nexus-arch`)

Nexus Core is a high-performance, resilient TypeScript backend module engineered to handle order processing, intelligent routing, and dynamic logistics invoicing. It has now evolved from a core engine into a full-stack REST API and interactive web dashboard.

## 🚀 Key Features

* **Interactive Logistics Dashboard:** A sleek, dark-mode frontend built with Tailwind CSS to visualize order processing and logistics invoices in real-time.
* **RESTful API Bridge:** Powered by Express.js, securely exposing the backend routing engine to web clients over local HTTP.
* **Automated Order Processing:** Validates, serializes, and retrieves order manifests from the core database subsystem.
* **Live OpenStreetMap (OSRM) Integration:** Consumes real-world telemetry and road network data via the Open Source Routing Machine API to calculate precise driving distances.
* **Fault-Tolerant Fallback Routing:** Implements an automated backup estimation engine using Euclidean geometry to prevent system crashes during API rate-limiting or network downtime.

## 🛠️ Tech Stack

* **Backend API:** Node.js (v20+), TypeScript, Express.js, CORS
* **Frontend UI:** HTML5, Tailwind CSS, Vanilla JavaScript
* **Execution Wrapper:** `tsx` (TypeScript Execute)
* **Upstream APIs:** Open Source Routing Machine (OSRM) API

## 📁 System Architecture

```text
nexus-core/
├── src/
│   ├── core/
│   │   ├── matrixEngine.ts     # Internal data structures and processing
│   │   └── routingEngine.ts    # API communication & geometric fallback safety
│   ├── types/
│   │   ├── common.ts           # Shared geometric and business type definitions
│   │   └── osrm.ts             # API response schema contracts
│   └── index.ts                # Express API server & application entry point
└── index.html                  # Interactive Tailwind CSS frontend dashboard
```

## ⚙️ Setup & Installation

### Prerequisites
Ensure you have **Node.js** installed on your system.

### 1. Clone the Repository
```bash
git clone [https://github.com/Ye-Htet-San/nexus-core.git](https://github.com/Ye-Htet-San/nexus-core.git)
cd nexus-core
```

### 2. Install Dependencies
```bash
npm install
```

## 🏃 How to Run

### 1. Boot up the API Server
Run the TypeScript engine in your terminal to start the Express server:
```bash
npx tsx src/index.ts
```
*You should see this successful startup log in your terminal:*
```text
🚀 Nexus API Engine running on http://localhost:3000
```

### 2. Open the Dashboard UI
*( You can manually double-click the `index.html` file in your file explorer ).*

Enter a valid Target Order ID (e.g., `Nex-1109`) into the dashboard and click **Process** to witness the engine calculate the route and generate the final invoice!
