import type { Coordinate } from "../types/common.js";

export class MatrixEngine{
    // Validate if a delivery path is linear (move only straight along X or Y axis)
   public static isValidRoute(start: Coordinate, end: Coordinate): boolean{
       const [startX, startY] = start;
       const [endX, endY] = end;

       // Bountry check : Ensure coordinates are within 8x8 grids
       if (startX < 0 || startX > 7 || startY < 0 || startY > 7)
           return false;
       if (endX < 0 || endX > 7 || endY < 0 || endY > 7)
           return false;
       
       return startX === endX || startY === endY;
   }
    public static calculateBlocks(start: Coordinate, end: Coordinate): number {
        return Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);
    }
}