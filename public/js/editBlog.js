const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('input[name="blog-title"]').value.trim();
    const body = document.querySelector('input[name="blog-body"]').value.trim();
    const blog_id = event.target.getAttribute('data-id');
     
  
    if (title && body) {
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, body }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit blog');
      }
    }
  };
  
  document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);