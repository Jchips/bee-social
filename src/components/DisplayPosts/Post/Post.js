import React from 'react';
import { Card } from 'react-bootstrap';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { doc, deleteDoc } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { db, ref, storage } from '../../../firebase';
import { useAuth } from '../../../contexts/AuthContext';
import './Post.scss';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const { post, user, postWidth, postMargin, setSelectedPost, setShowEditModal, setPostType } = props;
  const { currentUser } = useAuth();
  const userProfileUrl = `/user-profile/${user._id}`;

  // opens the edit post modal
  const openModal = () => {
    setSelectedPost(post);
    setShowEditModal(true);
    setPostType('imgPost');
  }

  // delete a post
  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, "files", post.id));
      const storageRef = ref(storage, `/files/${currentUser.uid}/${post.name}`);
      await deleteObject(storageRef);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Formats the date/time the post was created into nice readable text.
   * @param {Date} date - A date in UTC time (the date/time the post was created).
   * @returns {String} - The date/time the post was created.
   */
  const formatDate = (date) => {
    let timeElapsed = new Date(date);
    let formattedDate = timeElapsed.toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    let formattedTime = timeElapsed.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit" });
    return formattedDate + ' - ' + formattedTime;
  }

  return (
    <Card className='post post-card' style={{ width: postWidth, margin: postMargin }}>
      <Card.Header className='card-user-info'>
        <Link to={userProfileUrl}>
          <img src={user.photoURL} alt='user-pfp' />
          {user.displayName}
        </Link>
      </Card.Header>
      <Card.Body>
        <div className='card-head'>
          <Card.Title>{post.title ? post.title : null}</Card.Title>
          <div>
            {post.userID === currentUser.uid && <FiEdit3 className='edit-icon' onClick={() => openModal()} />}
            {post.userID === currentUser.uid && <FiTrash2 className='trash-icon' onClick={() => deletePost()} />}
          </div>
        </div>
        <div className='img-container'>
          {post.url && <img src={post.url} alt={post.caption ? post.caption : `${post.userID} image`} />}
        </div>
        <Card.Text>
          {post.caption ? post.caption : null}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{formatDate(post.createdAt ? post.createdAt.toMillis() : formatDate(Date.now()))}</Card.Footer>
    </Card>
  );
}

export default Post;
