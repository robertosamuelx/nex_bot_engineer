import { DateTime } from "luxon"

export function calculateDate(){
    return DateTime.now().minus({hours: 3}).toJSDate()
}