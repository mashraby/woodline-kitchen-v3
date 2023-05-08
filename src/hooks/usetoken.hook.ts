import { useContext } from "react";
import { TokenContext } from "../context/token.context";

function useToken() {
    const { token, setToken } = useContext(TokenContext)

    return [token, setToken]
}

export default useToken