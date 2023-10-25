document.addEventListener("DOMContentLoaded", function() {
    const postsList = document.getElementById("posts-list");
    const postTitleInput = document.getElementById("post-title");
    const postContentInput = document.getElementById("post-content");
    const savePostButton = document.getElementById("save-post");
    let editingIndex = -1;

    
    function saveOrUpdatePost(title, content) {
        const currentDate = new Date().toLocaleString();
        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        if (editingIndex === -1) {
            const post = { title, content, createdAt: currentDate, updatedAt: currentDate };
            posts.push(post);
        } else {
            const post = posts[editingIndex];
            post.title = title;
            post.content = content;
            post.updatedAt = currentDate;
            editingIndex = -1;
            savePostButton.textContent = "Сохранить";
        }

        localStorage.setItem("posts", JSON.stringify(posts));
    }


    function displayPosts() {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];

        postsList.innerHTML = "";

        posts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p><strong>Дата создания:</strong> ${post.createdAt}</p>
                <p><strong>Дата редактирования:</strong> ${post.updatedAt}</p>
                <button onclick="viewPost(${index})">Просмотреть</button>
                <button onclick="editPost(${index})">Редактировать</button>
                <button onclick="deletePost(${index})">Удалить</button>
            `;
            postsList.appendChild(postElement);
        });
    }

  
    window.editPost = function(index) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = posts[index];

        if (post) {
            postTitleInput.value = post.title;
            postContentInput.value = post.content;
            editingIndex = index;
            savePostButton.textContent = "Сохранить изменения";
        }
    };

  
    window.deletePost = function(index) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        if (confirm("Вы уверены, что хотите удалить этот пост?")) {
            posts.splice(index, 1);
            localStorage.setItem("posts", JSON.stringify(posts));
            displayPosts();
        }
    };

    window.viewPost = function(index) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = posts[index];

        if (post) {
            alert(`Заголовок: ${post.title}\nТекст: ${post.content}\nДата создания: ${post.createdAt}\nДата редактирования: ${post.updatedAt}`);
        }
    };

    savePostButton.addEventListener("click", function() {
        const title = postTitleInput.value.trim();
        const content = postContentInput.value.trim();

        if (title && content) {
            saveOrUpdatePost(title, content);
            postTitleInput.value = "";
            postContentInput.value = "";
            displayPosts();
        }
    });

    displayPosts();
});
