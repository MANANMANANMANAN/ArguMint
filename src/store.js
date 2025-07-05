import { configureStore } from "@reduxjs/toolkit";
import { userReducer , allUsersReducer , allDebatesReducer} from "./Reducers/User";
import { pointReducer , likeReducer , myPostsReducer} from "./Reducers/Debate";
const store = configureStore({
    reducer: {
      user: userReducer,
    //   postOfFollowing: postOfFollowingReducer,
      allUsers: allUsersReducer,
      allDebates : allDebatesReducer,
      pointDebates : pointReducer,
      like: likeReducer,
      myPosts: myPostsReducer,
    //   userProfile: userProfileReducer,
    //   userPosts: userPostsReducer,
    },
  });
export default store;