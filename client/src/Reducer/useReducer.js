export const initialState = {
    user : null,
    isLoading :false,
    isError : false
};

export const reducer = (state,action) => {
    switch(action.type){
        case "LOGIN_START":
            return{
                user:null,
                isLoading:true,
                isError:false
            };
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isLoading:false,
                isError:false
            };
        case "LOGIN_FAILED":
            return {
                user:null,
                isLoading:false,
                isError:action.payload
            }
        default:
            return state;
    }
}