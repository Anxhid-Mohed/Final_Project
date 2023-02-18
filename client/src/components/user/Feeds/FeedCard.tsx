import React, { useEffect } from "react";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Box, Menu, MenuItem, Modal, Button, TextField, Fade, ListItem, CssBaseline, List, ListItemAvatar, ListItemText } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {AiOutlineEdit,AiOutlineInfoCircle} from 'react-icons/ai'
import {MdDeleteOutline, MdFavoriteBorder} from 'react-icons/md'
import { commentPost, commentsLikes, deleteComments, editPost, getPostComments, likePost, removePost } from "@/Apis/userApi/userPageRequests";
import { setSuccessMsg, setErrMsg } from "@/pages/posts";
import { useSelector } from "react-redux";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:355,sm:400,md:400},
    bgcolor: 'background.paper',
    borderRadius:'12px',
    boxShadow: 24,
    p: 4,
};

const commentModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:{xs:350,sm:450,md:450},
    height:500,
    bgcolor: 'background.paper',
    borderRadius:'12px',
    boxShadow: 24,
    p: 4,
};

const FeedCard = ({data,setUpload,upload}:any) => {

    const {user} = useSelector((state:any)=>state.userInfo)
    const [editOpen, setEditOpen] = React.useState(false)
    const [ comment, setComment] = React.useState('')
    const [commentsData, setCommentsData] = React.useState([])
    const [commentOpen, setCommentOpen] = React.useState(false)
    const [isLiked, setIsLiked] = React.useState(data?.like?.some((el: any) => el.userId === user.userId))
    const [changes, setChanges] = React.useState(data?.caption)
    const [ update , setUpdate] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };

    useEffect(()=>{
        (
            async()=>{
                const response = await getPostComments(data?._id);
                console.log(response.data)
                setCommentsData(response?.data)
            }
        )()
    },[commentOpen,update])

    const handleDelete = async () => {
        const response = await removePost(data._id)
        if(response.status === true){
            setAnchorEl(null);
            setSuccessMsg(response.message)
            setUpload(!upload)
        }else{
            setAnchorEl(null);
            setErrMsg(response.message)
            setUpload(!upload)
        }
    }

    const handleEdit = async () => {
        try {
            const postId = data._id;
            const response = await editPost(postId,changes)
            if(response.status === true){
                setSuccessMsg(response.message)
                setEditOpen(false)
                setUpload(!upload)
            }else{
                setErrMsg(response.message)
                setEditOpen(false)
                setUpload(!upload)
            }
        } catch (error:any) {
            setErrMsg(error?.message)
        }
    }

    const handleLike = async () => {
        try {
            let token = localStorage.getItem('userToken') as string
            const postId = data._id;
            const response = await likePost(postId,token)
            if(response.action == 'liked'){
                setIsLiked(true)
                setUpload(!upload)
            }else{
                setIsLiked(false)
                setUpload(!upload)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async () => {
        try {
            if(comment != null){
                let token = localStorage.getItem('userToken') as string
                const postId = data._id;
                const response = await commentPost(comment,postId,token)
                if(response.status === true){
                    setUpdate(!update)
                }else{
                    setErrMsg(response.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCommentsLike = async (commentId:string) => {
        try {
            let token = localStorage.getItem('userToken') as string
            const postId = data._id
            const response = await commentsLikes(postId,commentId,token)
            if(response.action === 'liked'){
                setUpdate(!update)
            }else{
                setUpdate(!update)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteComment = async (commentId:string) => {
        try {
            const response = await deleteComments(commentId)
            if(response.status === true){
                setUpdate(!update)
            }else{
                setErrMsg(response.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const styles = {marginRight:'6px'}
    return ( 
        
        <> 
           <Card  sx={{ maxWidth:540,boxShadow:4,mt:2,ml:.5,borderRadius:'8px'}}>
                <CardHeader
                    avatar={
                        <Avatar alt="Travis Howard" src={ data ? data.userId.profile :'DP'}/>
                    }
                    action={
                    <>
                        <IconButton 
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            { data?.userId._id === user?.userId &&
                                <>
                                    <MenuItem onClick={() => { setEditOpen(true); setAnchorEl(null); } }><AiOutlineEdit style={styles} />Edit</MenuItem>
                                    <MenuItem onClick={handleDelete}><MdDeleteOutline style={styles} />Delete</MenuItem>
                                </>
                            }
                            <MenuItem onClick={handleClose}><AiOutlineInfoCircle style={styles}/>Report</MenuItem>
                        </Menu>
                    </>
                    }
                    title={ data ? data.userId.name :''}
                    subheader={data ? data.createdAt  :''}
                />
              
                    {
                        data.post && data.caption ? 
                        ( <>
                            <Box p={3}>
                                <CardMedia sx={{ height: '-webkit-fill-available', borderRadius: '8px' }}
                                    component="img"
                                    image={data ? data.post : ''}
                                    alt='' />
                            </Box>
                            <CardContent>
                                <Typography sx={{ ml: 1 }} variant="body2" color="text.secondary">
                                    {data?.caption}
                                </Typography>
                            </CardContent>
                          </>
                        ):(
                            <Box p={3}>
                                <CardMedia sx={{height: '-webkit-fill-available',borderRadius:'8px'}}>
                                    <Typography sx={{lineBreak:'auto',fontSize:'16px'}} letterSpacing={1}>
                                        {data?.caption}
                                    </Typography>
                                </CardMedia>
                            </Box>
                        )
                    }

                <CardActions  disableSpacing sx={{justifyContent:'space-between',p:2}} >
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites"
                    >
                        {isLiked ? <FavoriteIcon style={{color:'#f73f31'}}/> : <FavoriteIcon/>}
                    </IconButton>
                  
                    <IconButton 
                        onClick={()=>setCommentOpen(true)}
                        aria-label="comment"
                    >
                        <TextsmsIcon/>
                    </IconButton>

                    <IconButton aria-label="share">
                    <ShareIcon/>
                    </IconButton>
                </CardActions>
                <CardActions  disableSpacing sx={{justifyContent:'space-between',p:3.8,marginTop:'-40px'}} >
                    <span>{data?.like?.length}</span>
                    <span>{commentsData ? commentsData.length :''}</span>
                    <span>-</span>
                </CardActions>
        
            </Card>
            {/* Post-Edit-modal */}

            <Modal
                open={editOpen}
                onClose={()=>setEditOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >   
                <Fade in={editOpen}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit your post description 
                        </Typography>
                        <Box mt={2}>
                            <TextField
                                required
                                fullWidth
                                name="description"
                                label="description"
                                value={changes}
                                onChange={(e)=>setChanges(e.target.value)}
                                type="text"
                                id="description"
                                autoComplete="new-description"
                                sx={{
                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius: 3}}
                                }}
                            />
                            <Button
                                onClick={handleEdit}
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    borderRadius: "15px",
                                    height: "42px",
                                    backgroundColor: "#eb1e44",
                                    "&:hover": { backgroundColor: "#eb1e44"},
                                    textTransform: "none",
                                }}
                                >
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {/* comments-modal */}
            <Modal
                open={commentOpen}
                onClose={()=>setCommentOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={commentOpen}>
                    <Box sx={commentModalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" letterSpacing={1}>
                             comments
                        </Typography>
                        <Box mt={2} sx={{display:'flex',}}>
                            <TextField
                                required
                                fullWidth
                                name="comments"
                                label="comments"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                type="text"
                                id="comments"
                                autoComplete="new-comments"
                                sx={{
                                    height:'10px',
                                    "& .MuiInputLabel-root.Mui-focused": {color: '#4f4e4e'},
                                    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#f22c50"}},
                                    '& .MuiOutlinedInput-root': {'& fieldset': {borderRadius:3}}
                                }}
                            />
                            <Button
                                onClick={handleComment}
                                type="submit"
                                variant="contained"
                                sx={{
                                    ml:0.5,
                                    mt:.1,
                                    height:'53px',
                                    borderRadius: "10px",
                                    // height: "42px",
                                    backgroundColor: "#eb1e44",
                                    "&:hover": { backgroundColor: "#eb1e44"},
                                    textTransform: "none",
                                }}
                            >
                            Continue
                            </Button>
                        </Box>
                        <Box mt={2} sx={{overflowY:'scroll',overflowX:'hidden'}}>
                            <Box sx={{ pb: 3,height: "340px" }} >
                                <CssBaseline />
                                {
                                    commentsData.map((comments:any)=>{
                                        return (
                                            <List key={comments?._id} sx={{borderBottom:'1px solid #d6d6d6'}} >
                                                <ListItem button >
                                                    <ListItemAvatar>
                                                      <Avatar alt="Profile Picture" src={comments ? comments.userId.profile:''} />
                                                    </ListItemAvatar>
                                                    <ListItemText sx={{lineBreak:'auto'}} primary={comments?.userId.username} secondary={comments?.comment} />
                                                    <IconButton
                                                         onClick={()=>handleCommentsLike(comments._id)}
                                                    >
                                                    { comments.likes.some((el:any)=>el.userId === user.userId ) ? <FavoriteIcon style={{color:'#f73f31',fontSize:'17px',}}/>:<FavoriteBorderRoundedIcon style={{color:'gray',fontSize:'17px',}}/> }   
                                                    </IconButton>
                                                    <span style={{color:'gray',fontSize:'15px',marginRight:'10px'}}>{comments ? comments.likes.length:''}</span>

                                                   <IconButton
                                                         onClick={()=>handleDeleteComment(comments._id)}
                                                    >
                                                        <ClearRoundedIcon style={{color:'gray',fontSize:'18px'}}/>
                                                    </IconButton>
                                                </ListItem>
                                            </List>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
 
export default FeedCard;