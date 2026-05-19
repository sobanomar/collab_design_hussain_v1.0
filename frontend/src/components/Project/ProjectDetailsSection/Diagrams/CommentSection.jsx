import PropTypes from "prop-types";

const CommentSection = ({ comments = [], handleResolve }) => {
  if (!comments.length) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet</p>
    );
  }

  return (
    <ul className="space-y-3 max-h-48 overflow-y-auto">
      {comments.map((comment, index) => (
        <li
          key={comment._id || index}
          className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800"
        >
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {comment.content}
          </p>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              {comment.author?.name || "User"}
              {comment.time ? ` · ${comment.time}` : ""}
            </span>
            {handleResolve && comment._id && (
              <button
                type="button"
                onClick={() => handleResolve(comment._id)}
                className="text-primary hover:underline"
              >
                Resolve
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

CommentSection.propTypes = {
  comments: PropTypes.array,
  handleResolve: PropTypes.func,
};

export default CommentSection;
