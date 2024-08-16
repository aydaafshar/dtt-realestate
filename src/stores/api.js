const API_KEY = 'dzgDxHlKQUB6re_1Oba0LoWJqVnARySZ'

const headers = new Headers()
headers.append('X-Api-Key', API_KEY)

/**
 * Fetches the list of the houses
 *
 * @returns a list of House
 */
export const getHouses = async () => {
    const result = await fetch('https://api.intern.d-tt.nl/api/houses', {
        headers,
    })
    return await result.json()
}

/**
 * Fetch one house by id
 *
 * @param {Number} id - id of the house
 * @returns a house
 */
export const getHouse = async (id) => {
    const result = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers,
    })
    return await result.json()
}

/**
 * Removes a house
 *
 * @param {Number} id
 * @returns
 */
export const removeHouse = (id) => {
    return fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers,
        method: 'DELETE',
    })
}

/**
 * Upload an image for a house
 * @param {Number} id - house id
 * @param {File} image - image file
 */
export const upload = async (id, image) => {
    // This api accepts the data in format of FormData

    // Create an empty request payload
    const formData = new FormData()

    // adding the image file to the request payload
    formData.append('image', image, image.name)

    await fetch(`https://api.intern.d-tt.nl/api/houses/${id}/upload`, {
        method: 'POST',
        headers,
        body: formData,
    })
}

/**
 * Create a house
 *
 * @param {*} data - house details
 * @param {File} image - image file
 * @returns
 */
export const createHouse = async (data, image) => {
    const res = await fetch('https://api.intern.d-tt.nl/api/houses', {
        headers,
        method: 'POST',
        body: data, // form-data
    })
    //create a house
    const house = await res.json()

    // after creating a house we need to call the second request
    // with the generated house id to upload an image for it

    // check if image is defined and also is a valid File instance
    if (image && image instanceof File) {
        await upload(house.id, image)
    }

    // to be able to navigate to the detail page after saving the house we need to return the id
    return house.id
}

/**
 * Edit a house
 *
 * @param {Number} id - id of the house
 * @param {*} data - house details
 * @param {File} image - image file
 * @returns
 */
export const editHouse = async (id, data, image) => {
    await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers,
        // This API uses POST request to edit the resource instead of PUT or PATCH.
        method: 'POST',
        body: data,
    })

    // if there is a new image for this house we will replace it by uploading it for this house
    // check if image is defined and also is a valid File instance
    // We need to check if it is a File because it can be a url in that case user didn't change the image
    // we don't need to upload it
    if (image && image instanceof File) {
        await upload(id, image)
    }

    // to be able to navigate to the detail page after saving the house we need to return the id
    return id
}
