if (document.readyState === "complete") {
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const body = document.querySelector("#blog-body").value.trim();

    if (title && body) {
      const response = await fetch(`/api/blogs`, {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create blog");
      }
    }
  };
  document
    .querySelector(".new-blog-form")
    .addEventListener("submit", newFormHandler);
}
