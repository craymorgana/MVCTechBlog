const createBlogHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector("#title-create").value.trim();
	const content = document.querySelector("#content-create").value.trim();

	if (title && content) {
		const response = await fetch(`/api/blogs`, {
			method: "POST",
			body: JSON.stringify({ title, content }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			// If successful, redirect the browser to the profile page
			document.location.replace("/profile");
		} else {
			alert("Failed to create project");
		}
	}
};

document
	.querySelector(".create-form")
	.addEventListener("submit", createBlogHandler);
