async function sendNickname(nickname: string) {
    const url = `http://localhost:6969?nickname=${encodeURIComponent(nickname)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.text(); // or .json() if the response is JSON
        console.log(data);
    } catch (error) {
        console.error('Error making request:', error);
    }
}

export default sendNickname;