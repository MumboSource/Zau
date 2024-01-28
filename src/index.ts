import { join } from "path";
import { Injector } from "./modules/Injector";
import { getAsarPath } from "./modules/Utilities"

if(!process.env.LOCALAPPDATA){
    throw new Error("LOCALAPPDATA not found, please run this in a command prompt.");
}
new Injector(getAsarPath(join(process.env.LOCALAPPDATA, "DiscordCanary")));