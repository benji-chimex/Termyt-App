import { createContext, useReducer } from "react";

const initialState = {
    ID : null,
    animation : {
        sideBarActive : false,
        mintActive : false,
        refActive : false,
        showSideBar : false,
        timerActive : true
    }
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        const { type, payload } = action;
        switch(type) {
            case "Modify ID" :
                console.log(payload.ID)
                return {
                    ID : payload.ID,
                    ...state
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