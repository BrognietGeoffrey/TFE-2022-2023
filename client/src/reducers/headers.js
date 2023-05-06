const BASIC_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem("access_token")
}

export {
    BASIC_HEADERS
}