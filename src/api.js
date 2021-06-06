export async function fetchMatchHistory() {
    return fetch("/api/hello")
        .then((response) => response.json())
}
