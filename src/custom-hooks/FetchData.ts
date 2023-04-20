import React, { useState, useEffect } from 'react'; 
import { serverCalls, getMvieData } from '../api'; 

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

export const useGetUserHubData = () => {
    const [userHubData, setData] = useState<any>([])

    async function handleDataFetch(){
        const result = await serverCalls.getUserHub()
        console.log(result)
        setData(result)
    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {userHubData, getUserData:handleDataFetch}
}

export const useGetHubData = () => {
    const [hubData, setData] = useState<any>([])

    async function handleDataFetch(){
        const result = await serverCalls.getHub(localStorage.getItem('hubname'))
        console.log(result)
        setData(result)

    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {hubData, getHubData:handleDataFetch}
}

export const useGetPopularData = () => {
    const [popularData, setData] = useState<any>([])

    async function handleDataFetch(){
        const result = await getMvieData.getPopular()
        console.log(result)
        setData(result)

    }

    useEffect( () => {
        handleDataFetch()
    }, [])

    return {popularData, getPopularData:handleDataFetch}
}

