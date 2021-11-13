import React from "react";

const CommentsList = ({comments}) => {
  const renderComments =comments.map((comment) => {
    let content;
    switch (comment.status){
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;
      case 'rejected':
        content = 'This comment has been rejected';  
    }

    return (
      <li key={comment.id}>{content}</li>
    );
  });

  return <ul>{renderComments}</ul>;
};

export default CommentsList;
