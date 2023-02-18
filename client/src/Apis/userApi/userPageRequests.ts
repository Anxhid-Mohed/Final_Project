import { userApi } from "@/utils/apis";

import { AxiosError } from "axios";


export const userPages = async (username:string) => {
    try {
        const {data} = await userApi.get(`/page?username=${username}`)
        return data
    } catch (error) {
        console.log(error);
        
    }
}

export const uploadCoverImage = async (img:string,token:string) => {
    try {
        const {data} = await userApi.patch('/upload-cover',{'image':img},{headers:{'accesstoken':token}})
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const userFollow = async (createrId:string, token:string) => {
    try {
        const {data} = await userApi.patch('/follow',{'createrId':createrId},{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        
    }
}

export const uploadPost = async (formData:any,token:string) =>{
    try {
        const {data} = await userApi.post('/upload-post',formData,{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}


export const getUserFeeds = async (username:string,token:string) => {
    try {
        const {data} = await userApi.get(`/posts?username=${username}`,{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const removePost = async (id:string) => {
    try {
        const {data} = await userApi.delete(`/delete-post?id=${id}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const editPost = async (id:string,changes:string) => {
    try {
        const {data} = await userApi.patch('/edit-post',{'id':id,'changes':changes})
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (id:string,token:string) => {
    try {
        const {data} = await userApi.patch('/like-post',{'postId':id},{headers:{'accesstoken':token}})
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = async (comment:string,id:string,token:string) => {
    try {
        const {data} = await userApi.post('/comment-post',{'comment':comment,'postId':id},{headers:{'accesstoken':token}})
        return data ;
    } catch (error) {
        console.log(error)
    }
}

export const getPostComments = async (postId:string) => {
    try {
        const {data} = await userApi.get(`/comments?id=${postId}`)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const commentsLikes = async (postId:string,commentId:string,token:string) => {
    try {
        const {data} = await userApi.patch('/comments-likes',{'postId':postId,'commentId':commentId},{headers: {'accesstoken':token}});
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteComments = async (commentId:string) => {
    try {
        const {data} = await userApi.delete(`/delete-comments?commentId=${commentId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCreaters = async () => {
    try {
        const {data} = await userApi.get('/creaters');
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const searchCreaters = async (search:string) => {
    try {
        const {data} = await userApi.get(`/search?explore=${search}`)
        return data;
    } catch (error) {
        console.log(error);
    }
}