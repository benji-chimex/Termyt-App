import { createContext, useReducer } from "react";

const initialState = {
    animation : {
        headerActive : true,
        storyAActive : false,
        storyBActive : false,
        storyCActive : false,
        footerActive : false,
        sideBarActive : false,
        storiesActive : false,
        mintActive : false,
        showHeader : false,
        showStoryA : false,
        showStoryB : false,
        showStoryC :false,
        showSideBar : false
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
            case "Display/Hide SideBar" :
                return {
                    animation : {
                        ...state.animation,
                        sideBarActive : payload.sideBarActive
                    }
                };
            case "Display/Hide Mint" :
                return {
                    animation : {
                        ...state.animation,
                        mintActive : payload.mintActive
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
            case "Display/Hide SideBar Animation" :
                return {
                    animation : {
                        ...state.animation,
                        showSideBar : payload.showSideBar
                    }
                };
            
            default :
                throw new Error()
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };