# Zau

Zau is a simple dev friendly discord (canary) plugin manager / modder. Zau provides the developer with access to several hooked  discord functions and complete control over the window and ipc communications. Zau is written simply with the objective that devs can easily read, understand, modify, and fork / PR. With that being said: 

#### ZAU IS NOT INTENDED TO BE USED WITH UNTRUSTED SCRIPTS

Zau has no built-in blacklisting mechanism for functions or unsafe procedures, leaving all safety up to the user, Zau is intended to be a "playground" for **you** to modify **your discord** in the way that **you** want. Installing other peoples scripts in **not recommended**.

Plugins can be found @ `%LOCALAPPDATA%/DiscordCanary/plugins`<br>
As of 1/28/2024 Zau is `semi-functional`

## Zau Library

### Methods
>`getPopoutWindowByKey(key: string) -> BrowserWindow | undefined`<br>
>`getAllPopoutWindows() -> BrowserWindow[]`<br>
>`execInContext(code: string) -> void (UNSAFE)`<br>
>`notify(title: string, content: string) -> void`<br>

### Objects
>`electron -> The electron package, also accessible with require("electron")`<br>
>`mainScreen -> Discords intenal mainScreen.js file, see core.asar for more`<br>
