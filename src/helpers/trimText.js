export function trimText(string, limit){
    return string.length > limit ? string.substring(0, limit - 3) + "..." : string.substring(0, limit)
}