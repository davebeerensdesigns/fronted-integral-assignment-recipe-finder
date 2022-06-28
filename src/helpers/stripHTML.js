export function stripHTML(string) {
    return string.replace(/(<([^>]+)>)/gi, "");
}