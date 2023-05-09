import { useEffect, useState } from 'react';

import { gql, useQuery, useMutation } from '@apollo/client';

import { useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom'; 

import farmer_avatar from '../assets/farmer_avatar.png';
import { FETCH_POST_QUERY } from './Feeds';
import { ADDLIKE_MUTATION, DISLIKE_MUTATION } from './Post';
import DeletePostModal from './customUtils/DeletePostModal';
import EditPostModal from './customUtils/EditPostModal';

export const FETCHPOST_QUERY = gql`
    query($id:ID!) {
        post(id:$id) {
            id
            body
            user {
                username
            }
            commentsCount
            likesCount
            likes {
                user {
                    username
                }
            }
            comments {
                body
                createdAt
                user {
                    username
                }
            }
        }
    }
`

function PostPage({ className:classes }) {
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(false);
    const [editModalVisibility, setEditModalVisibility] = useState(false);
    
    const { id:postId } = useParams();
    const navigate = useNavigate();

    const { value: { username: currUser } } = useSelector((state)=>state.user);

    const { data, error, loading } = useQuery(FETCHPOST_QUERY, { variables: { id: postId } } );

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

    const isUserLiked = () => {
        if(data) {
            let bool = false;
            data.post.likes.length>0 && data.post.likes.forEach((like) => {
                bool = bool || ( like.user.username === currUser );
            });
            return bool;
        } else {
            return false;
        }
    }

    const [isLiked, setLikedState] = useState(isUserLiked());

    useEffect(() => {
        if(data) {
            let bool = false;
            data.post.likes.length>0 && data.post.likes.forEach((like) => {
                bool = bool || ( like.user.username === currUser );
            });
            setLikedState(bool);
        } else {
            setLikedState(false);
        }
    }, [data])

    
    const closeDeleteModal = ()=>{ setDeleteModalVisibility(false) };
    const closeEditModal = ()=>{ setEditModalVisibility(false) };

    if(error) {
        console.log(error);
        return (
            <>
                error
            </>
        )
    }

    if(loading) {
        return (
            <>
                loading...
            </>
        )
    }


    if(data) {
        
        const { post: { id, body, commentsCount, likesCount,user: { username } } } = data;

        const isOwnPost = (username === currUser);

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

        return (
            <div className={`${classes} container mx-auto mt-10 md:max-w-screen-md max-w-[480px] p-4 space-y-3`}>
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

                <div>
                    <div>
                        
                    </div>
                </div>
                
                <DeletePostModal isOpen={deleteModalVisibility} onClose={closeDeleteModal} postId={id} navigateTo={()=>navigate('/feeds')}/>
                <EditPostModal isOpen={editModalVisibility} onClose={closeEditModal} post={data.post} />

            </div>
        )
    }
}

export default PostPage;