import { createContext, useReducer } from "react";

const initialState = {
    ID : "",
    animation : {
        headerActive : true,
        storyAActive : false,
        storyBActive : false,
        storyCActive : false,
        footerActive : false,
        sideBarActive : false,
        storiesActive : false,
        mintActive : false,
        refActive : false,
        showHeader : false,
        showStoryA : false,
        showStoryB : false,
        showStoryC :false,
        showSideBar : false,
        timerActive : false
    }
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const { type, payload } = action;
        switch(type) {
            case "Modify ID" :
                return {
                    ID : payload.ID,
                    ...state
                };
            case "Display/Hide Header" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        headerActive : payload.headerActive
                    }
                };
            case "Display/Hide StoryA" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        storyAActive : payload.storyAActive
                    }
                };
            case "Display/Hide StoryB" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        storyBActive : payload.storyBActive
                    }
                };
            case "Display/Hide StoryC" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        storyCActive : payload.storyCActive
                    }
                };
            case "Display/Hide Stories" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        storiesActive : payload.storiesActive
                    }
                };
            case "Display/Hide Footer" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        footerActive : payload.footerActive
                    }
                };
            case "Display/Hide SideBar" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        sideBarActive : payload.sideBarActive
                    }
                };
            case "Display/Hide Mint" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        mintActive : payload.mintActive
                    }
                };
            case "Display/Hide Ref" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        refActive : payload.refActive
                    }
                };
            case "Display/Hide Header Animation" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        showHeader : payload.showHeader
                    }
                };
            case "Display/Hide StoryA Animation" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        showStoryA : payload.showStoryA
                    }
                };
            case "Display/Hide StoryB Animation" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        showStoryB : payload.showStoryB
                    }
                };
            case "Display/Hide StoryC Animation" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        showStoryC : payload.showStoryC
                    }
                };
            case "Display/Hide SideBar Animation" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        showSideBar : payload.showSideBar
                    }
                };
            case "Display/Hide Timer" :
                return {
                    ...state,
                    animation : {
                        ...state.animation,
                        timerActive : payload.timerActive
                    }
                };
            default :
                throw new Error()
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };