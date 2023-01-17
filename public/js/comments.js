const commentFormHandler = async (event) => {
  event.preventDefault();
  const body = document
    .querySelector('input[name="comment-body"]')
    .value.trim();

  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log("router", window.location);
  console.log("event", event);

  console.log("comments_payload", {
    body,
    blog_id,
  });
  if (body) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ body, blog_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
