const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const blog_id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  document
  .querySelector('.startButton2 delete-blog-btn')
  .addEventListener('click', delButtonHandler);
