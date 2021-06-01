import { useState } from 'react';
import axios from "axios";

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {
        const response = await axios.post(`http://localhost:3000/api/comment/${eventId}`, {
            email: commentData.email,
            name: commentData.name,
            text: commentData.text
        });

    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList />}
        </section>
    );
}

export default Comments;