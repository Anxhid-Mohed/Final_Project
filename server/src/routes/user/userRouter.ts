import express, { Router } from "express";
import {
  userSignup,
  verifyAuth,
  userSignin,
  accountVerification,
  getDetails,
  createrRequest,
  profileManagement,
  userPage,
  uploadCoverImage,
  accountDisable,
  accountEnable,
  accountDelete,
  uploadPosts,
  removePost,
  editPost,
  likePost,
  commentPost,
  getPostComments,
  commentsLikes,
  deleteComments,
  getAllCreaters,
  searchCreaters,
  getUserFeeds,
  userFollowAndUnFollow,
  integrateBankAcc,
  getUserBankInfo,
  editUserBankInfo,
  getAllFeeds,
  ApproveDonation,
  getUserWallet,
  reportPost,
  resendEmail,
  getUserDatas,
  getPayouts,
} from "../../controller/userController";
import { userNotification } from "../../controller/notificationController";
import { verifyToken } from "../..//middleware/verifyToken";
const router: Router = express.Router();

router.post("/verify-auth", verifyAuth);
router.post("/verify", accountVerification);
router.post('/resend',resendEmail)
router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.post("/verify-token", verifyToken, getDetails);
router.post("/request", verifyToken, createrRequest);
router.patch("/manage",verifyToken, profileManagement);
router.get("/page",userPage);
router.patch("/upload-cover", verifyToken, uploadCoverImage);
router.patch("/disable", verifyToken, accountDisable);
router.patch("/enable", verifyToken, accountEnable);
router.post("/terminate", verifyToken, accountDelete);

router.patch("/follow", verifyToken, userFollowAndUnFollow);
router.post("/upload-post", verifyToken, uploadPosts);
router.get("/posts", verifyToken, getUserFeeds);
router.delete("/delete-post",verifyToken, removePost);
router.patch("/edit-post",verifyToken, editPost);
router.patch("/like-post", verifyToken, likePost);
router.post('/report',verifyToken,reportPost)
router.get('/feeds',verifyToken,getAllFeeds)
router.post("/comment-post", verifyToken, commentPost);
router.get("/comments",verifyToken, getPostComments);
router.patch("/comments-likes", verifyToken, commentsLikes);
router.delete("/delete-comments",verifyToken, deleteComments);
router.get("/creaters",verifyToken, getAllCreaters);
router.post("/integrate", verifyToken, integrateBankAcc);
router.get("/integrate", verifyToken, getUserBankInfo);
router.patch("/edit-bankInfo", verifyToken, editUserBankInfo);
router.post('/donate',verifyToken,ApproveDonation)
router.get('/wallet',verifyToken,getUserWallet)
router.get("/search", searchCreaters);
router.get('/payouts',getPayouts)
router.post('/notification',userNotification)
router.get('/user-data',getUserDatas)

export default router;
