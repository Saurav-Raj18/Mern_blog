import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
const DashPosts = () => {
  const [userPost, setuserPost] = useState([]);
  //console.log(userPost);
  const currentUser = useSelector((state) => state.user)
 // console.log(currentUser);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  //console.log(currentUser.currentUser.isAdmin);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/post/getposts')
        //console.log(res.data.posts);
        setuserPost(res.data.posts);
        if (res.data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if (currentUser && currentUser.currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/post/getposts?userId=${currentUser.currentUser._id}&startIndex=${startIndex}`);
      // console.log('show mor',res);
      setuserPost((prev) => [...prev, ...res.data.posts]);
      if (res.data.posts.length < 9) {
        setShowMore(false);
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  //handle delete post
  const handleDeletePost = async () => {
    setshowModal(false);
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/post/deletepost/${postIdToDelete}/${currentUser.currentUser._id}`, { withCredentials: true });
      if(res){
         setuserPost((prev)=>prev.filter((post)=>post._id!==postIdToDelete));
      }
    }
    catch (error) {
      console.log("Error in deleting the post", error)
    }
  }

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700  dark:scrollbar-thumb-slate-500'>
      {
        currentUser && currentUser.currentUser.isAdmin ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPost && userPost.map((post) => {
                return (
                  <Table.Body className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img src={post.image} className='w-20 h-10 object-cover bg-gray-500' ></img>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <Link className=' font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                      </Table.Cell>
                      <Table.Cell>
                        {post.category}
                      </Table.Cell>
                      <Table.Cell>
                        <span className='font-medium text-red-500 cursor-pointer hover:underline' onClick={() => {
                          setshowModal(true);
                          setPostIdToDelete(post._id);
                        }}>Delete</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link className=' text-teal-500' to={`/update-post/${post._id}`}>
                          <span className='hover:underline cursor-pointer'>Edit</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )
              })}

            </Table>
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 text-sm py-7'>show more</button>
              )
            }
          </>
        ) : (
          <p>You have no post yet</p>
        )
      }

      <Modal show={showModal} onClose={() => setshowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Are You sure to you want to delete this post</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>Yes,i am sure</Button>
              <Button color='gray' onClick={() => setshowModal(false)}>No,cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashPosts