import { createContext, useReducer } from "react";

const initialState = {
    animation : {
        headerActive : true,
        storyAActive : false,
        storyBActive : false,
        storyCActive : false,
        footerActive : false,
        storiesActive : false,
        showHeader : false,
        showStoryA : false,
        showStoryB : false,
        showStoryC :false,
    }
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const { type, payload } = action;
        switch(type) {
            case "Display/Hide Header" :
                return {
                    animation : {
                        ...state.animation,
                        headerActive : payload.headerActive
                    }
                };
            case "Display/Hide StoryA" :
                return {
                    animation : {
                        ...state.animation,
                        storyAActive : payload.storyAActive
                    }
                };
            case "Display/Hide StoryB" :
                return {
                    animation : {
                        ...state.animation,
                        storyBActive : payload.storyBActive
                    }
                };
            case "Display/Hide StoryC" :
                return {
                    animation : {
                        ...state.animation,
                        storyCActive : payload.storyCActive
                    }
                };
            case "Display/Hide Stories" :
                return {
                    animation : {
                        ...state.animation,
                        storiesActive : payload.storiesActive
                    }
                };
            case "Display/Hide Footer" :
                return {
                    animation : {
                        ...state.animation,
                        footerActive : payload.footerActive
                    }
                };
            case "Display/Hide Header Animation" :
                return {
                    animation : {
                        ...state.animation,
                        showHeader : payload.showHeader
                    }
                };
            case "Display/Hide StoryA Animation" :
                return {
                    animation : {
                        ...state.animation,
                        showStoryA : payload.showStoryA
                    }
                };
            case "Display/Hide StoryB Animation" :
                console.log(payload)
                return {
                    animation : {
                        ...state.animation,
                        showStoryB : payload.showStoryB
                    }
                };
            case "Display/Hide StoryC Animation" :
                return {
                    animation : {
                        ...state.animation,
                        showStoryC : payload.showStoryC
                    }
                };
            default :
                throw new Error()
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };