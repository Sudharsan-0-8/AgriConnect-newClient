import { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FETCH_POST_QUERY } from './Feeds';

import farmer_avatar from '../assets/farmer_avatar.png';

const ADDPOST_MUTATION = gql`
    mutation($body: String!) {
        addPost(body: $body) {
            id
            user { 
                username
            }
            body
        }
    }
`

function AddPost({ className: classes }) {
    const postRef = useRef();
    const navigate = useNavigate();

    const { value: { username:currUser } } = useSelector((state)=>state.user);

    const [addPostMutation, { data, loading, error }] = useMutation(ADDPOST_MUTATION, {
        refetchQueries: [
            { query: FETCH_POST_QUERY }
        ]
    });

    const handleSubmit = () => {
        addPostMutation({ variables : { body: postRef.current.value } })
            .then(() => {
                navigate('/feeds');
            })
    }

    if(loading) {
        return (
            <>loading...</>
        )
    }

    return (
        <div className={`${classes} container mx-auto mt-10 max-w-screen-md p-4 space-y-3`}>
            <div className="flex flex-row">
                <div className="flex-1 flex flex-row space-x-5 items-center">
                    <img src={farmer_avatar} alt='display_picture' 
                        className="h-12 w-12 md:h-14 md:w-14"
                    />
                    <p className="md:text-2xl text-xl font-bold text-black space-y-1">
                        { currUser }
                        <p className="text-sm font-normal text-slate-600">
                            farmer
                        </p>
                    </p>
                </div>
                <div className="pt-3">
                    { `${new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}` }
                </div>
            </div>
            <div>
                <textarea name="" id="" rows="10" ref={postRef}
                    className='border border-slate-700 border-solid rounded-md outline-none w-full p-6'
                ></textarea>
            </div>
            <div className="flex flex-row justify-end">
                <button className='bg-aggreen rounded-md text-white font-bold px-6 py-2' onClick={handleSubmit}>
                    Publish Post
                </button>
            </div>
        </div>
    );
}

export default AddPost;
        // <div className={`${classes}`}>
        //     <input type="text" 
        //         ref={postRef}
        //         className='h-40 border-b-2 border-black border-solid outline-none'
        //     />
        //     <button onClick={handleSubmit}>
        //         add
        //     </button>
        // </div>