const API_POSTS = "https://jsonplaceholder.typicode.com/posts";
const API_COMMENTS = "https://jsonplaceholder.typicode.com/posts";

const postList = document.querySelector("#post-list");
const postForm = document.querySelector("#post-form");
const postTitle = document.querySelector("#post-title");
const postBody = document.querySelector("#post-body");
const successMessage = document.querySelector("#success-message");


function loadPosts() {
    fetch(`${API_POSTS}?_limit=10`)
        .then(res => res.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = createPostElement(post);
                postList.appendChild(postElement);
            });
        })
        .catch(err => console.log("Ошибка загрузки постов: ", err));
}

function createPostElement(post) {
    const div = document.createElement("div");
    div.classList.add("post");
    div.dataset.id = post.id;

    div.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <button class="load-comments">Завантаження комментів</button>
    <div class="comments"></div>
  `;

    return div;
}

postList.addEventListener("click", (e) => {
    if (e.target.classList.contains("load-comments")) {
        const postDiv = e.target.closest(".post");
        const postId = postDiv.dataset.id;
        const commentsContainer = postDiv.querySelector(".comments");
        if (commentsContainer.childElementCount > 0)
            return;

        fetch(`${API_COMMENTS}/${postId}/comments?_limit=2`)
            .then(res => res.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentEl = document.createElement("div");
                    commentEl.classList.add("comment");
                    commentEl.innerHTML = `
            <strong>${comment.name}</strong> <em>(${comment.email})</em>
            <p>${comment.body}</p>
          `;
                    commentsContainer.appendChild(commentEl);
                });
            })
            .catch(err => console.log("Помилка при завантаженні коментарієв: ", err));
    }
});

postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = postTitle.value.trim();
    const body = postBody.value.trim();

    if (!title || !body) return;

    fetch(API_POSTS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId: 1
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Помилка!");
            return res.json();
        })
        .then(newPost => {
            const newPostEl = createPostElement(newPost);
            postList.prepend(newPostEl);
            successMessage.textContent = "Пост зроблено успішно";
            postForm.reset();

            setTimeout(() => (successMessage.textContent = ""), 0);
        })
        .catch(err => console.log("Помилка POST: ", err));
});

//main
loadPosts();
