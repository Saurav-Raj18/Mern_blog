import axios from 'axios';
import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

const PostPage = () => {
    const { postSlug } = useParams();
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setloading(true);
                const res = await axios.get(`http://localhost:4000/api/v1/post/getposts?slug=${postSlug}`)
               // console.log(res);
                if (res.status != 200) {

                }
                else {
                    setPost(res.data.posts[0]);
                    setloading(false);
                    seterror(false);
                }


            } catch (error) {
                console.log(error);
                seterror(true);
                setloading(false);
            }

        }
        fetchPost();
    }, [postSlug]);

    if(loading) return (
        <div className='flex justify-center items-center min-h-screen'>
           <Spinner size='xl'/>
        </div>
    )
    return (
        <main className='p-3 flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link classname='self-center mt-5 mx-auto'to={`/search?category=${post && post.category}`}>
              <Button color='gray' pill size='xs'>{post && post.category}</Button>
            </Link>
            <img  src={post && post.image} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
            <div className='flex justify-between p-3 border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>
             <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
             <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full post-content'  dangerouslySetInnerHTML={{__html:post && post.content}}>
            
            </div>
            <div className='max-w-4xl mx-auto w-full'>
              <CallToAction/>
            </div>
            <CommentSection postId={post._id}/>
        </main>
    )
}

export default PostPage