import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

function PostsList() {
	const [posts, setPosts] = useState([]);
	const [, setLoading] = useState(true);
	const [, setError] = useState(null);
	// fetch post
	useEffect(() => {
		async function loadPosts() {
			try {
				const response = await fetch(`${API_URL}`);
				if (response.ok) {
					const json = await response.json();
					setPosts(json);
				} else {
					throw response;
				}
			} catch (e) {
				setError("An error occurred...");
				console.log("An error occurred:", e);
			} finally {
				setLoading(false);
			}
		}
		loadPosts();
	}, []);

	return (
		<div>
			{posts.map((post) => (
				<div key={post.id} className="post-container">
					<h2>
						<Link to={`/posts/${post.id}`}>{post.title}</Link>
						<p>{post.body}</p>
					</h2>
				</div>
			))}
		</div>
	);
}
export default PostsList;
