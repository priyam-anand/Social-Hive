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
        case "INITAL_DATA":
            return{
                user:action.payload,
                isLoading:false,
                isError:false
            }
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
        case "FOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following:[...state.user.following,action.payload]
                }
            }
        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    following:state.user.following.filter(follow => follow!==action.payload)
                }
            }
        default:
            return state;
    }
}