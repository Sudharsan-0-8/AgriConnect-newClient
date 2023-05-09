import { useState } from "react";

import { gql, useMutation } from '@apollo/client';

import Modal from "../utils/Modal";

import { FETCH_POST_QUERY } from '../Feeds';

const EDITPOST_MUTATION = gql`
    mutation($id:ID!, $body:String!) {
        editPost(postId: $id, body: $body) {
            id
        }
    }
`

function EditPostModal({ className:classes, onClose, isOpen, post }) {
    const [body, setBody] = useState(post.body);

    const [editPostMutation, { loading, data, error }] = useMutation(EDITPOST_MUTATION, {
        refetchQueries: [
            { query: FETCH_POST_QUERY }
        ]
    });

    const handleSubmit = () => {
        editPostMutation({ variables: { id: post.id, body: body } })
            .then(() => {
                onClose()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <Modal className={`${classes}`} isOpen={isOpen} onClose={onClose} >
            <h1 className="font-bold text-xl mb-3">Edit Post</h1>
            <textarea name="" id="" rows="10" value={body} onChange={(e) => setBody(e.target.value)}
                className='border border-slate-700 border-solid rounded-md outline-none w-96 p-6 mb-3'
            ></textarea>
            <div className="text-right">
                <button className='bg-aggreen rounded-md text-white font-bold px-6 py-2' onClick={handleSubmit}>
                    Save Edit
                </button>
            </div>
            { loading ? 'loading..' : '' }
        </Modal>
    )
}

export default EditPostModal;