function addTopic() {
    const topicDropdown = document.getElementById('new-topic-dropdown');
    const selectedTopic = topicDropdown.value;

    if (selectedTopic) {
        const topicCards = document.getElementById('topic-cards');
        const newCard = document.createElement('div');
        newCard.className = 'topic-card';
        newCard.innerHTML = `
            <h3>${selectedTopic}</h3>
            <p>Join a group of ${selectedTopic} enthusiasts and start learning together.</p>
            <button class="join_btn">Join Waiting List</button>
        `;
        topicCards.appendChild(newCard);
        topicDropdown.value = '';
    } else {
        alert('Please select a topic.');
    }
}