import Modal from "../utils/Modal";

import { gql, useMutation } from '@apollo/client';

import { FETCH_POST_QUERY } from '../Feeds';

const DELETEPOST_MUTATION = gql`
    mutation($id:ID!) {
        deletePost(postId: $id) {
            id
        }
    }
`

function DeletePostModal({ className:classes, postId, onClose, isOpen=false, navigateTo=null }) {
    const [deletePostMutation, { loading, data, error }] = useMutation(DELETEPOST_MUTATION, {
        refetchQueries: [
            { query: FETCH_POST_QUERY }
        ]
    });

    const handleDelete = () => {
        deletePostMutation({ variables: { id: postId } })
            .then(() => {
                onClose()
                if(navigateTo != null)navigateTo()
            })
            .catch((err) => console.log(err))
    }

    return (
        <Modal className={`${classes} `} onClose={onClose} isOpen={isOpen}>
            <h1 className="font-bold text-xl">Do you want to delete this post?</h1>
            <div className="mt-6 text-right">
                <button className="bg-warningRed font-bold text-lg text-white px-4 pb rounded-md" onClick={handleDelete}>yes</button>
            </div>
            { loading ? 'loading...' : '' }
        </Modal>
    )
}

export default DeletePostModal;