import type { Coordinate } from "../types/common.js";
import type { OSRMResponse } from "../types/osrm.js";

export class RoutingEngine{
    public static async getRealDrivingDistance(start: Coordinate, end: Coordinate): Promise<number>{
     
        const [startLon, startLat] = start;
        const [endLon, endLat] = end;

        const url = `http://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=false`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    "User-Agent":"NexusArchitectureDevApp/1.0 (Contact:yehtetsan1@gmail.com)"
                },
                signal:AbortSignal.timeout(5000)
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);

            }
            const data = (await response.json()) as OSRMResponse;

            if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
                throw new Error("No drivable route found between these locations.");

            }
            const distanceInKm = data.routes[0]!.distance/1000;
            return distanceInKm;
            
        } catch(error) {
            console.log("⚠️ [Routing Network Warning]: Public OSRM server timed out or failed.");

            const fallbackDistance = RoutingEngine.getFallbackDistance(start, end);
            console.log(`[Routing Engine]: Using calculated backup distance: ${fallbackDistance.toFixed(2)}Km`)
            return fallbackDistance;
        }
         
    }
    private static getFallbackDistance(start: Coordinate, end: Coordinate): number{
        const [lat1, lon1] = start;
        const [lat2, lon2] = end;

        const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2 * Math.PI / 180);
        const y = lat2 - lat1;

        return Math.sqrt(x * x + y * y) * 111;
    }
}