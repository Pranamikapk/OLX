import { createContext, useState } from "react";

function Post({children}){
    const [postDetails,setPostDetails] = useState()
    return(
        <postContext.Provider value={{ postDetails , setPostDetails }}>
            {children}
        </postContext.Provider>
    )
}
export const postContext = createContext()

export default Post