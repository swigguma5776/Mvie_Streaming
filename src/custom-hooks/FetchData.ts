import React, { useState, useEffect } from 'react'; 
import { serverCalls } from '../api'; 

export const useGetData = () => {
    const [browseData, setData] = useState<any>([])

    async function handleDataFetch(){
        const result = await serverCalls.getShow()
        console.log(result)
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {browseData, getData:handleDataFetch}
}