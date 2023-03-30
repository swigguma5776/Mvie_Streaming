



export const serverCalls = {
    token: localStorage.getItem('token'),
    baseUrl: 'https://mvie-streaming-backend.glitch.me/api',
    getShow: async () => {
        console.log(serverCalls.token)
        const response = await fetch(`${serverCalls.baseUrl}/show`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    getCast: async (id: string) => {
        const response = await fetch(`${serverCalls.baseUrl}/cast/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    getUserHub: async () => {
        const response = await fetch(`${serverCalls.baseUrl}/userhub`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },
    createShow: async(data: any = {}) => {
        const response = await fetch(`${serverCalls.baseUrl}/show`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    createCast: async(data: any = {}) => {
        const response = await fetch(`${serverCalls.baseUrl}/cast`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    createUserHub: async(data: any = {}) => {
        const response = await fetch(`${serverCalls.baseUrl}/userhub`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    updateShow: async(data: any = {}, id: string) => {
        const response = await fetch(`${serverCalls.baseUrl}/show/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    deleteShow: async(id: string) => {
        const response = await fetch(`${serverCalls.baseUrl}/show/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${serverCalls.token}`
            }
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    }
}



export const getMvieData = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'a09faf10309ad7aea8ecad3ee15ec80f',
    getData: async(title:string, type: string) => {
        console.log('we are in getData')
        if (type === 'movie'){

            const res = await fetch(`${getMvieData.baseUrl}/search/movie?api_key=${getMvieData.apiKey}&language=en-US&query=${title}&page=1&include_adult=false`)
            const data = await res.json()
            console.log(data.results)
            return data.results


        } else {

            const res = await fetch(`${getMvieData.baseUrl}search/tv?api_key=${getMvieData.apiKey}&language=en-US&query=${title}&page=1&include_adult=false`)
            const data = await res.json()
            console.log(data.results)
            return data.results
        }
    },
    getGenre: async(genres:any = [], type: string) => {
        let genreSet = new Set(genres)
        let finalGenres = ""
        const response = await fetch(`${getMvieData.baseUrl}genre/${type}/list?api_key=${getMvieData.apiKey}&language=en-US`)
        const results = await response.json()
        const data = await results.genres


        for (let genre of data){
            if (genreSet.has(genre.id)){
                finalGenres +=  genre.name + ", "
            }
        }
        console.log(finalGenres)
        return finalGenres.slice(0, -2)
    },
    getStreaming: async(movieId: string, type: string) => {
        let finalStreaming = ""
        const response = await fetch(`${getMvieData.baseUrl}${type}/${movieId}/watch/providers?api_key=${getMvieData.apiKey}`)
        const results = await response.json()
        console.log(results)

        const data = await results.results.US.rent || await results.results.US.flatrate
        console.log(data)
        for (let rent of data){
            finalStreaming += rent.provider_name + ", "
        }
        console.log(finalStreaming)
        return finalStreaming.slice(0, -2)
    },
    getCast: async(movieId: string, type: string) => {
        const response = await fetch(`${getMvieData.baseUrl}${type}/${movieId}/credits?api_key=${getMvieData.apiKey}&language=en-US`)
        const results = await response.json()
        return results.cast.slice(0,6)
    }
}

