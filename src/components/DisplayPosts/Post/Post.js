import React from 'react';
import { Card } from 'react-bootstrap';
import { FiTrash2, FiEdit3 } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import './Post.scss';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const { post, user, postWidth, deletePost, setSelectedPost, setShowEditModal, postMargin, setPostType } = props;
  const { currentUser } = useAuth();
  const userProfileUrl = `/user-profile/${user._id}`;

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

  /**
   * Opens the edit modal.
   * @param {Object} post - The post to be edited. Not sure I even need this parameter tbh.
   */
  const openModal = (post) => {
    setSelectedPost(post);
    setShowEditModal(true);
    setPostType('textPost');
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
          <Card.Title>{post.title}</Card.Title>
          <div>
            {post.uid === currentUser.uid && <FiEdit3 className='edit-icon' onClick={() => openModal(post)} />}
            {post.uid === currentUser.uid && <FiTrash2 className='trash-icon' onClick={() => deletePost(post)} />}
          </div>
        </div>
        <Card.Text>
          {post.text}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{formatDate(post.dateCreated)}</Card.Footer>
    </Card>
  );
}

export default Post;
