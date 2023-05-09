import { useNavigate } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

import Post from './Post.jsx';

export const FETCH_POST_QUERY = gql`
    {
        posts: allPosts {
            id
            body
            userId
            commentsCount
            likesCount
            createdAt
            user {
                username
            }
            likes {
                user {
                    username
                }
            }
        }
    }
`

function Feeds({ className: classes }) {
    const { data, loading, error } = useQuery(FETCH_POST_QUERY);

    const navigate = useNavigate();

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

    console.log(data)

    return (
        <div className={`${classes} container mx-auto md:max-w-[768px] max-w-[480px] mt-10 flex flex-col justify-center`}> 
            <button className='flex items-center bg-aggreen rounded-md text-white px-6 py-2 h-8 w-40 space-x-2 font-bold mb-8' onClick={()=>navigate('/addPost')} >
                <span class="material-symbols-outlined">
                    add_circle
                </span>
                <p>Add Post</p>
            </button>
            
                {
                    data.posts.map((post) => {
                        return <>
                            <Post post={post} />
                            <hr className='bg-black shadow-md'/>
                        </>
                    })
                }    
                    
        </div>
    )
}

// export const { FETCH_POST_QUERY };

export default Feeds;