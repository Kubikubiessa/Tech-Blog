const commentFormHandler = async (event) => {
    event.preventDefault();
  
    
    const body = document.querySelector('input[name="comment-body"]').value.trim();
    const blog_id = event.target.getAttribute('data-id');
     
     
  
    if (body) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ body, blog_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create comment');
      }
    }
  };
  document
  .querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);
   