import { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer";
import Cookies from "universal-cookie";
const INITIAL_STATE = {
    token: JSON.parse(localStorage.getItem("token")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [role, setRole] = useState(null);
    const [group, setGroup] = useState(null);
    const [status, setStatus] = useState(null);
    const [profile, setProfile] = useState(null)
    const [pin_reset_required, setPinResetRequired] = useState(null);
    const [password_reset_required, setPasswordResetRequired] = useState(null);
    const cookies = new Cookies();

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(state.token));
        // sessionStorage.setItem("token", JSON.stringify(state.token));
        // cookies.set("token", JSON.stringify(state.token))
        if (state.token) {
            setRole(state.token.user.role);
            setGroup(state.token.user.group);
            setStatus(state.token.user.status);
            setPinResetRequired(state.token.user.pin_reset_required);
            setPasswordResetRequired(state.token.user.password_reset_required);
            setProfile(state.token.user.profile);
        }
    }, [state.token]);

    // return ( <
    //     AuthContext.Provider value = {
    //         {
    //             token: state.token.token,
    //             role: role,
    //             group: group,
    //             status,
    //             profile,
    //             pin_reset_required,
    //             password_reset_required,
    //             dispatch,
    //         }
    //     } > { children } </AuthContext.Provider>
    // );
    return (
        <AuthContext.Provider
          value={{
            token: state.token,
            role: role,
            group: group,
            status,
            profile,
            pin_reset_required,
            password_reset_required,
            dispatch,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
};