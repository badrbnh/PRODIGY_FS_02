import axios from "axios";


function getAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.accessToken : null;
}

export function fetchData(endpoint) {
    const accessToken = getAccessToken();
    const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching data:", error);
            throw error;
        });
}

export function postData(endpoint, data) {
    const accessToken = getAccessToken();
    const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
    return axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error posting data:", error);
            throw error;
        });
}

export function deleteData(endpoint) {
    const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
    const accessToken = getAccessToken();
    return axios.delete(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error deleting data:", error);
            throw error;
        });
}

export function updateData(endpoint, data) {
    const accessToken = getAccessToken();
    const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
    return axios.put(url, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error updating data:", error);
            throw error;
        });
}
