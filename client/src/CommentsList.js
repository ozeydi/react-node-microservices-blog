import React from "react";

const CommentsList = ({comments}) => {
  const renderComments =comments.map((comment) => {
    return (
      <li key={comment.id}>{comment.content}</li>
    );
  });

  return <ul>{renderComments}</ul>;
};

export default CommentsList;
