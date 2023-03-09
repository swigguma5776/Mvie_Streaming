import { createSlice } from '@reduxjs/toolkit';

interface sliceState {
    show: {
        title: string,
        type_: string,
        posterImage: string,
        genre: string,
        summary: string,
        rating: string,
        streaming: string,
        reviewScore: string | null,
        review: string | null,
        haveWatched: boolean
    },
    cast: {
        watchId: string,
        characterName: string,
        fullName: string,
        castImage: string,
        bioLink: string
    }
}

const initialState: sliceState = {
    show:  {
        title: "The Lobster",
        type_: "Movie",
        posterImage: "test_image",
        genre: "dark comedy",
        summary: "Turn into an animal if you stay single. Toxic Hetero Culture",
        rating: "PG-13",
        streaming: "",
        reviewScore: null,
        review: null,
        haveWatched : false
    },
    cast: {
        watchId: '',
        characterName: "Short Sighted Woman",
        fullName: "Rachel Weisz",
        castImage: 'test_image',
        bioLink: ""
    }
}
const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseTitle: (state, action) => { state.show.title = action.payload },
        chooseType: (state, action) => { state.show.type_ = action.payload },
        choosePosterImage: (state, action) => { state.show.posterImage = action.payload },
        chooseGenre: (state, action) => { state.show.genre = action.payload },
        chooseSummary: (state, action) => { state.show.summary = action.payload },
        chooseRating: (state, action) => { state.show.rating = action.payload },
        chooseStreaming: (state, action) => { state.show.streaming = action.payload },
        chooseReviewScore: (state, action) => { state.show.reviewScore = action.payload },
        chooseReview: (state, action) => { state.show.review = action.payload },
        choosehaveWatched: (state, action) => { state.show.haveWatched = action.payload },
        chooseWatchId: (state, action) => { state.cast.watchId = action.payload},
        chooseCharacterName: (state, action) => { state.cast.characterName = action.payload},
        chooseFullName: (state, action) => { state.cast.fullName = action.payload},
        chooseCastImage: (state, action) => { state.cast.castImage = action.payload},
        chooseBioLink: (state, action) => { state.cast.bioLink = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseTitle, chooseType, choosePosterImage, chooseGenre, chooseSummary, chooseRating, 
    chooseReviewScore, chooseReview, chooseStreaming, choosehaveWatched, chooseWatchId, chooseBioLink, chooseCastImage, 
    chooseCharacterName, chooseFullName } = rootSlice.actions;
