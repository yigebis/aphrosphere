function showGroup(groupName){
    window.location.href = `groupDetails.html?groupName=${groupName}`;
}
function showGroupInfo(){
    let displayed = document.getElementById("group-info");
    displayed.classList.toggle('show');
}
function answer(name, message){
    let replyContianer = document.getElementById('reply-container');
    let repliedMessage = document.createElement('p');
    let repliedFor = document.createElement('p');

    repliedMessage.textContent = message;
    repliedFor.textContent = name;

    replyContianer.innerHTML = "";
    replyContianer.appendChild(repliedFor);
    replyContianer.appendChild(repliedMessage);
    replyContianer.style = "padding : 5px;";
}

function send(){
    let replyContianer = document.getElementById('reply-container');

    let messageInputEl = document.querySelector('.message-input');
    let messageEmptyError = document.getElementById('message-empty');
    
    if (messageInputEl.value === ""){
        messageEmptyError.style.display = 'block';
    }
    else{
        messageInputEl.value = "";
        messageEmptyError.style.display = 'none';
        replyContianer.innerHTML = "";
        replyContianer.style = "padding : 0;";

        
    }
}