document.getElementById('askQuestionBtn').addEventListener('click', function() {
    alert('Hello, World!');
});

document.getElementById('submitSuggestionBtn').addEventListener('click', function() {
    const suggestionInput = document.getElementById('suggestionInput');
    const suggestionsList = document.getElementById('suggestionsList');

    if (suggestionInput.value.trim() !== "") {
        const newComment = document.createElement('section');
        newComment.classList.add('comment');
        
        const currentUserImageSrc = document.getElementById('currentUserImage').src;
        const currentUserName = "@currentUser"; // Replace this with the actual username if available
        
        newComment.innerHTML = `
            <div class="comment-header">
                <img src='${currentUserImageSrc}' alt="User" class="comment-icon"/>
                <div>
                    <div class="username">${currentUserName}</div>
                    <div class="comment-date">${new Date().toLocaleString()}</div>
                </div>
            </div>
            <p>${suggestionInput.value}</p>
        `;
        
        suggestionsList.appendChild(newComment);
        suggestionInput.value = "";
    }
});

document.getElementById('dropdownIcon').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
    }
});
