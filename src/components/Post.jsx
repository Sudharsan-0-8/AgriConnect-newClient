import { useEffect, useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { useSelector } from 'react-redux'; 

import { useNavigate } from 'react-router-dom';

import farmer_avatar from '../assets/farmer_avatar.png';

import { FETCH_POST_QUERY } from './Feeds';

import DeletePostModal from "./customUtils/DeletePostModal";
import EditPostModal from "./customUtils/EditPostModal";

export const ADDLIKE_MUTATION = gql`
    mutation($id: ID!) {
        addLike(postId: $id) {
            user {
                username
            }
        }
    }
`

export const DISLIKE_MUTATION = gql`
    mutation($id: ID!) {
        removeLike(postId: $id) {
            id
        }
    }
`

function Post({ className: classes, post }) {
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);
    const [postData, setPostData] = useState(post);
    const navigate = useNavigate();
    const { value: { username:currUser } } = useSelector((state)=>state.user);

    useEffect(() => {
        setPostData(post);
    }, [post])

    const isUserLiked = () => {
        let bool = false;
        post.likes.length>0 && post.likes.forEach((like) => {
            if(post.id == '64566c6eeadc026157fba807')console.log(like.user.username)
            bool = bool || ( like.user.username === currUser );
        });
        return bool;
    }

    const [isLiked, setLikedState] = useState(isUserLiked());

    const [addLikeMutation, { data: addLikeData, loading: addLikeLoading  }] = useMutation(ADDLIKE_MUTATION, {
        refetchQueries: [
            { query: FETCH_POST_QUERY }
        ]
    });
    const [removeLikeMutation, { data: removeLikeData,loading: removeLikeLoading  }] = useMutation(DISLIKE_MUTATION, {
        refetchQueries: [
            { query: FETCH_POST_QUERY }
        ]
    });
    
    const { id, body, user: { username }, likesCount, commentsCount, createdAt } = post;
    const date = new Date(createdAt);
    const isOwnPost = (post.user.username === currUser);

    const handleLike = () => {
        addLikeMutation({ variables: { id } })
            .then(() => {
                setLikedState(true);
            })
            .catch(() => {
                setLikedState(false);
            })
    }

    const handleRemoveLike = () => {
        removeLikeMutation({ variables: { id } })
            .then(() => {
                setLikedState(false);
            })
            .catch(() => {
                setLikedState(true);
            })
    }

    const closeDeleteModal = ()=>{ setDeleteModalVisibility(false) };
    const closeEditModal = ()=>{ setEditModalVisibility(false) };

    const getPostData = () => postData;
    const getPostId = () => postData.id;

    return ( 
        <div className={`${classes} mx-auto w-full max-w-[768px] p-4 space-y-3`}>
            <div className="flex flex-row">
                <div className="flex-1 flex flex-row space-x-5 items-center">
                    <img src={farmer_avatar} alt='display_picture' 
                        className="h-12 w-12 md:h-14 md:w-14"
                    />
                    <p className="md:text-2xl text-xl font-bold text-black space-y-1">
                        { username===currUser ? 'You' : username }
                        <p className="text-sm font-normal text-slate-600">
                            farmer
                        </p>
                    </p>
                </div>
                <div className="pt-3">
                    { `${date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}` }
                </div>
            </div>
            <div>
                { body }
            </div>
            <div className="flex flex-row justify-between">
                <div>
                    { isOwnPost ? (
                        <>
                            <button className="h-9 w-9 text-center rounded-md pt-1" onClick={() => setEditModalVisibility(true)} >
                                <span class="material-symbols-outlined text-aggreen">
                                    edit
                                </span>
                            </button>
                            <button className="h-9 w-9 text-center rounded-md pt-1" onClick={() => setDeleteModalVisibility(true)} >
                                <span class="material-symbols-outlined text-aggreen">
                                    delete
                                </span>
                            </button>
                        </>
                    ) : <></> }
                    
                </div>
                <div className="flex items-center">
                    <button className="h-9 w-9 text-center rounded-md pt-1"
                        onClick={() => navigate(`/post/${id}`)}
                    >
                        <span class="material-symbols-outlined text-aggreen">
                            comment
                        </span>
                    </button>
                    <span>{ commentsCount }</span>
                    { !isLiked ? (
                        <>
                            <button className="h-9 w-9 text-center rounded-md pt-1" onClick={handleLike}>
                                <span class="material-symbols-outlined text-aggreen">
                                    thumb_up
                                </span>
                            </button>
                            <span>{ likesCount }</span>
                        </>
                    ) : (
                        <>
                            <button className="h-9 w-9 text-center rounded-md pt-1" onClick={handleRemoveLike}>
                                <span class="material-symbols-rounded text-aggreen">
                                    thumb_up
                                </span>
                            </button>
                            <span>{ likesCount }</span>
                        </>
                    ) }

                </div>
            </div>

            <DeletePostModal isOpen={deleteModalVisibility} onClose={closeDeleteModal} postId={getPostId()} />
            <EditPostModal isOpen={editModalVisibility} onClose={closeEditModal} post={getPostData()} />
        </div>
    );
}

export default Post;