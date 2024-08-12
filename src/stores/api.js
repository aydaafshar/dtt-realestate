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


export const upload = async (id, image) => {
    const formData = new FormData()
    formData.append('image', image, image.name)

    await fetch(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, {
        method: 'POST',
        headers,
        body: formData
    })

}

export const createHouse = async (data, image) => {

    const res = await fetch('https://api.intern.d-tt.nl/api/houses', { headers, method: 'POST', body: data })
    const house = await res.json()


    if (image && image instanceof File) {
        await upload(house.id, image)
    }

    return house.id
}

export const editHouse = async (id, data, image) => {

    await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, { headers, method: 'POST', body: data })

    if (image && image instanceof File) {
        await upload(id, image)
    }

    return id
}
