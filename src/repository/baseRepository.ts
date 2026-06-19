// import type common = require("../types/common");
import type {Identifiable} from "../types/common.js"

export abstract class BaseReopsitory<T extends Identifiable>{
   protected dataStore: Map<string, T> = new Map();
   public save(item: T): void{
       this.dataStore.set(item.id, item);
       console.log(`[Database] Successfully saved record: ${item.id}`);

   }
    public getById(id: string): T | undefined{
        return this.dataStore.get(id);
   }
}