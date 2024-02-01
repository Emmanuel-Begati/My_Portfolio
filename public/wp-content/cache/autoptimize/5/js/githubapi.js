const git_api = document.getElementById('git_api')
 
    // Replace 'your_username' with your GitHub username
    const username = 'Emmanuel-Begati';
    const apiUrl = `https://api.github.com/users/Emmanuel-Begati/events`;
    

    // Function to fetch and display the top 10 events
    function getTop10Events() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const eventsList = document.getElementById('eventsList');

                // Clear existing content
                eventsList.innerHTML = "";

                // Take only the top 10 events
                const top10Events = data.slice(0, 7);

                top10Events.forEach(event => {
                    const eventType = event.type;
                    const repoName = event.repo.name;
                    const createdAt = new Date(event.created_at).toLocaleString();

                    // Create list item and append to the list
                    const listItem = document.createElement('li');
                    listItem.textContent = `Type: ${eventType} - Repo: ${repoName} - Created At: ${createdAt}`;
                    eventsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Call the function to fetch and display the top 10 events
    // getTop10Events();



document.addEventListener('DOMContentLoaded', function () {
    // Replace 'your_username' with your GitHub username
    const username = 'Emmanuel-Begati';
    const apiUrl = `https://api.github.com/users/Emmanuel-Begati/repos?sort=pushed`;

    // Function to fetch and display the top 3 most recent repositories
    function getTop3RecentRepositories() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(repositories => {
                const repositoriesList = document.getElementById('repositoriesList');

                // Clear existing content
                repositoriesList.innerHTML = "";

                // Take only the top 3 most recent repositories
                const top3RecentRepositories = repositories.slice(0, 4);

                top3RecentRepositories.forEach(repo => {
                    const repoName = repo.name;
                    const repoUrl = repo.html_url;

                    // Create list item with a link and append to the list
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${repoUrl}" target="_blank">${repoName}</a>`;
                    repositoriesList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Call the function to fetch and display the top 3 most recent repositories
    // getTop3RecentRepositories();

    function github_bar() {
        // Call both functions when the div is clicked
        getTop3RecentRepositories();
        getTop10Events();
    }
    git_api.onclick = github_bar;
});

