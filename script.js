// Get DOM elements
const addPostBtn = document.getElementById('post-add');
const postFeed = document.getElementById('post-feed');
const addPostModal = document.getElementById('add-post-modal');
const closeBtn = addPostModal.querySelector('.close');
const postImageInput = document.getElementById('post-image');
const postNameInput = document.getElementById('post-name');
const postCaption = document.getElementById('post-caption');
const postSubmitBtn = document.getElementById('post-submit');

// Create an array to store posts
const posts = [];

// Function to display posts
function displayPosts() {
    postFeed.innerHTML = ''; // Clear the post feed

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        
       
<div class="post">
        <div class="info">

                <div class="user">
                <div class="profile-pic"><img src="photos/profile.jpeg"></div>
                    
                    <p class="post-name">${post.name}</p>
                </div>

                <button class="delete-btn" data-index="${index}">Delete</button>

            </div>

        <img src="${post.image}" alt="Post Image" class="post-images" />

       
        <div class="reaction-wrapper">
                    <img src="photos/like.PNG" class="icon" alt="">
                    <img src="photos/comment.PNG" class="icon" alt="">
                    <img src="photos/send.PNG" class="icon" alt="">
                    <img src="photos/save.PNG" class="save icon" alt="">
                </div>

                <p class="likes">89 likes <span class="post-caption">${post.caption}</span></p>
                
                <div class="comment-wrapper">
                <img src="assets/img/smile.PNG" class="icon" alt="">
                <input type="text" class="comment-box" placeholder="Add a comment">
                <button class="comment-btn">Post</button>
            </div>
            </div>
            
        `
        postFeed.appendChild(postElement);
    });

    // Attach delete event listeners to each delete button
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', deletePost);
    });
}

// Function to add a post
function addPost() {
    const image = postImageInput.files[0];
    const name = postNameInput.value;
    const caption = postCaption.value;

    if (image && name && caption) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            posts.unshift({ image: imageUrl, name, caption });
            displayPosts();
            postImageInput.value = ''; // Clear the input
            postNameInput.value = ''; // Clear the input
            postCaption.value = '';   // Clear the input
            closeAddPostModal();
        };
        reader.readAsDataURL(image);
    }
}

// Function to delete a post
function deletePost(event) {
    const index = event.target.getAttribute('data-index');
    if (index !== null) {
        posts.splice(index, 1);
        displayPosts();
    }
}

// Function to open the add post modal
function openAddPostModal() {
    addPostModal.style.display = 'block';
}

// Function to close the add post modal
function closeAddPostModal() {
    addPostModal.style.display = 'none';
}

// Attach event listeners
addPostBtn.addEventListener('click', openAddPostModal);
closeBtn.addEventListener('click', closeAddPostModal);
postSubmitBtn.addEventListener('click', addPost);

// Display initial posts
displayPosts();

// Close the modal by default
closeAddPostModal();





