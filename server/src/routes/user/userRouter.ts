import express ,{Router} from 'express'
import {userSignup,verifyAuth,userSignin,accountVerification,getDetails,createrRequest, profileManagement, userPage, uploadCoverImage, accountDisable, accountEnable, accountDelete, uploadPosts,removePost, editPost, likePost, commentPost, getPostComments, commentsLikes, deleteComments, getAllCreaters, searchCreaters, getUserFeeds,userFollowAndUnFollow} from '../../controller/userController'
import { verifyToken } from '../..//middleware/verifyToken'
const router : Router = express.Router()


router.post('/verify-auth',verifyAuth)
router.post('/verify',accountVerification)
router.post('/signup',userSignup)

router.post('/signin',userSignin)

router.post('/verify-token',verifyToken,getDetails)
router.post('/request',verifyToken,createrRequest)
router.patch('/manage',profileManagement)
router.get('/page',userPage)
router.patch('/upload-cover',verifyToken,uploadCoverImage)
router.patch('/disable',verifyToken,accountDisable)
router.patch('/enable',verifyToken,accountEnable)
router.post('/terminate',verifyToken,accountDelete)

router.patch('/follow',verifyToken,userFollowAndUnFollow)
router.post('/upload-post',verifyToken,uploadPosts)
router.get('/posts',verifyToken,getUserFeeds)
router.delete('/delete-post',removePost)
router.patch('/edit-post',editPost)
router.patch('/like-post',verifyToken,likePost)
router.post('/comment-post',verifyToken,commentPost)
router.get('/comments',getPostComments)
router.patch('/comments-likes',verifyToken,commentsLikes)
router.delete('/delete-comments',deleteComments)
router.get('/creaters',getAllCreaters)
router.get('/search',searchCreaters)

export default router

