import { config } from "dotenv"
config()
import schedule from 'node-schedule'
import fetch from 'node-fetch'
import { calculateDate } from "./services/syncronize"

console.log("Initializing deamon...")

schedule.scheduleJob("0 * * * * *", async () => {
    const date = calculateDate()

    const res = await fetch("http://localhost:3001/campaigns/filterbyCreatedAt", {
        body: JSON.stringify({ createdAt: date }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST"
    })
    const campaigns = await res.json()

    campaigns.forEach((campaign:any) => {
        console.log(`Schedulling ${campaign.name} to send at ${campaign.sendAt}`)
    });
})