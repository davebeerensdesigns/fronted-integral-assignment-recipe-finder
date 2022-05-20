export default function authHeader() {
    const user = localStorage.getItem('token');
    if (user) {
        return { "Content-Type": "application/json", "Authorization": "Bearer " + user };
    } else {
        return {};
    }
}