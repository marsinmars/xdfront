const axios = require('axios');
export const registerApi=(phone,pwd,name)=>axios.post("/api/v1/pri/user/register",{
    phone,pwd,name
})

//login interface
export const loginApi=(phone,pwd)=>axios.post("/api/v1/pri/user/login",{
    phone,pwd
})

//carousel interface
export const getBanner=()=>axios.get('/api/v1/pub/video_banner/list_banner')

//video list interface
export const getVideoList=()=>axios.get('/api/v1/pub/video/list')

//video detail interface
export const getVideoDetail=(vid)=>axios.get('/api/v1/pub/video/find_detail_by_id',{
    params:{
        video_id:vid
    }
})

//place order interface
export const saveOrder=(token,vid)=>axios.post('/api/v1/pri/order/save',{
    "video_id":vid,
},{
    headers:{
        "token":token
    }
})


//order list interface
export const getOrderList=(token)=>axios.get('/api/v1/pri/order/list',{
    params:{
        "token":token
    }
})

//user info interface
export const getUserInfo=(token)=>axios.get("/api/v1/pri/user/find_by_token",{
    params:{
        "token":token
    }
})