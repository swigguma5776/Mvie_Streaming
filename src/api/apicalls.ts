



export const serverCalls = {
    token: 'test',
    baseUrl: 'https://mvie-streaming-backend.glitch.me/api',
    getShow: async () => {
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
            return data.results.slice(0,4)


        } else {

            const res = await fetch(`${getMvieData.baseUrl}search/tv?api_key=${getMvieData.apiKey}&language=en-US&query=${title}&page=1&include_adult=false`)
            const data = await res.json()
            console.log(data.results)
            return data.results.slice(0,4)
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
        return finalGenres
    },
    getStreaming: async(movieId: string, type: string) => {
        let finalStreaming = ""
        const response = await fetch(`${getMvieData.baseUrl}${type}/${movieId}/watch/providers?api_key=${getMvieData.apiKey}`)
        const results = await response.json()
        console.log(results)

        if (results!){
            return ""
        }
        const data = await results.results.US.rent

        for (let rent of data){
            finalStreaming += rent.provider_name + ", "
        }
        console.log(finalStreaming)
        return finalStreaming
    },
    getCast: async(movieId: string, type: string) => {
        const response = await fetch(`${getMvieData.baseUrl}${type}/${movieId}/credits?api_key=${getMvieData.apiKey}&language=en-US`)
        const results = await response.json()
        return results.cast.slice(0,10)
    }
}
