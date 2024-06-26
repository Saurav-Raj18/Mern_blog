import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
//import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import Comment from './Comment';

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate=useNavigate();
  console.log(comments);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await axios.post("http://localhost:4000/api/v1/comment/create", { content: comment, postId: postId, userId: currentUser._id }, { withCredentials: true })
      // console.log('post',res.data)
      if (res.data) {
        setComment('');
        setCommentError(null);
        //setComments([res.data, ...comments])
      }

    }
    catch (err) {
      console.log(err);
      setCommentError(err.message)
    }
    // console.log(res.data);


  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/comment/getpostcomment/${postId}`);
        //console.log(res.data);
        setComments(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await axios.put(`http://localhost:4000/api/v1/comment/likeComment/${commentId}`,{withCredentials:true});
      console.log('likes',res)
      if (res.data) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.likes,
                  numberOfLikes: res.data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img src={currentUser.profilePicture} className='h-5 w-5 object-cover rounded-full' alt='Profile'></img>
          <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link className='text-blue-500 hover:underline' to="/sign-in"> sign in</Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
          {commentError &&
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          }
        </form>

      )}
      {comments.length > 0 ? (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>

          {
            comments.map((comment)=>{
              return <Comment key={comment._id} comment={comment} onLike={handleLike}/>
            })
          }

        </>

      ) : (
        <p className='text-sm my-5'>No Comments Yet!</p>
      )}
    </div>
  );
};

export default CommentSection;
