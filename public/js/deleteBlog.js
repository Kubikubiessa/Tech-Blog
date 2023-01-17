if (document.readyState === "complete") {
  const delButtonHandler = async (event) => {
     
      const blog_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];

      const response = await fetch(`/api/blogs/${blog_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete blog");
      }
    
  };
  document
    .querySelector(".startButton2 delete-blog-btn")
    .addEventListener("click", delButtonHandler);
}
