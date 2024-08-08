const API_KEY = 'dzgDxHlKQUB6re_1Oba0LoWJqVnARySZ'

const headers = new Headers()
headers.append('X-Api-Key', API_KEY)

export const getHouses = async () => {
    const result = await fetch('https://api.intern.d-tt.nl/api/houses', {
        headers,
    })
    return await result.json()
}

export const getHouse = async (id) => {
    const result = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers,
    })
    return await result.json()
}

export const createHouse = () => {}

export const editHouse = () => {}
