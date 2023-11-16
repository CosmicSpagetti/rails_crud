import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPost, updatePost } from "../../services/postService";

function PostEditForm() {
	const [post, setPost] = useState(null);
	const { id } = useParams();
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCurrentPost = async () => {
			try {
				const json = await fetchPost(id);
				setPost(json);
			} catch (e) {
				console.log("An error occured:", e);
				setError(e);
			} finally {
				setLoading(false);
			}
		};
		fetchCurrentPost();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const updatedPost = {
			title: post.title,
			body: post.body,
		};

		try {
			const response = await updatePost(id, updatedPost);
			navigate(`/posts/${response.id}`);
		} catch (e) {
			console.error("Failed to update post: ", e);
		}
	};

	if (!post) return <h2>Loading...</h2>;

	return (
		<div>
			<h2>Edit Post</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="post-title">Title</label>
					<br />

					<input
						type="text"
						id="post-title"
						value={post.title}
						onChange={(e) => setPost({ ...post, title: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor="post-body">Body</label>
					<br />
					<textarea
						id="post-body"
						value={post.body}
						onChange={(e) => setPost({ ...post, body: e.target.value })}
					/>
				</div>
				<div>
					<button type="submit">Save</button>
				</div>
			</form>
		</div>
	);
}

export default PostEditForm;
