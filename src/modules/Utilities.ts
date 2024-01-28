import { execSync } from "child_process";
import { readdirSync } from "fs";

export function killDiscord() {
    const list = execSync('tasklist').toString().split("\n")

    for(const proc of list){
        if(proc.includes("DiscordCanary")){

            console.log(proc)
            let pid;
            for(const spl of proc.split(" ")){
                if(Number(spl)){
                    pid = spl;
                    break;
                }
            }
            
            console.log(`Killing process ${pid}...`)

            try{
                execSync(`taskkill /pid ${pid} /f`);
            }catch(e){
                console.log("Killed all discord processes...")
                break;
            }
        }
    }
}

export function getAsarPath(discordPath: string) {
    let files = readdirSync(discordPath);
    // get files[0] because files is sorted alphabetically and it'll be the app folder with the most up-to-date version
    return discordPath + "\\" + files[0] + "\\modules\\discord_desktop_core-3\\discord_desktop_core\\core.asar"
}