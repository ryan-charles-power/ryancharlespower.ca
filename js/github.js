async function loadDashboard() {

    const res = await fetch("https://ryan-github-api.onrender.com/api/github/dashboard");
    const data = await res.json();

    document.getElementById("repos").textContent = data.repos;
    document.getElementById("followers").textContent = data.followers;
    document.getElementById("avatar").src = data.avatar;
    document.getElementById("username").textContent = data.username;
    document.getElementById("bio").textContent = data.bio;
    document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    const langList = document.getElementById("languages");
    const repoList = document.getElementById("reposList");

    langList.innerHTML = "";
    repoList.innerHTML = "";

    const sortedLangs = Object.entries(data.top_languages)
        .sort((a, b) => b[1] - a[1]);

    for (const [lang, percentage] of sortedLangs) {
        const wrapper = document.createElement("div");
        wrapper.className = "language-bar";

        const name = document.createElement("div");
        name.className = "language-name";
        name.textContent = lang;

        const graph = document.createElement("div");
        graph.className = "language-graph";

        const fill = document.createElement("div");
        fill.className = "language-fill";
        fill.style.width = `${percentage}%`;

        graph.appendChild(fill);

        const number = document.createElement("span");
        number.className = "language-number"; 
        number.textContent = `${percentage.toFixed(1)}%`;

        wrapper.appendChild(name);
        wrapper.appendChild(graph);
        wrapper.appendChild(number);

        langList.appendChild(wrapper);
    }

    data.top_repos.forEach(repo => {

        const li = document.createElement("li");
        li.textContent = `${repo.name} 📦 ${formatBytes(repo.size)}`;

        repoList.appendChild(li);

    });
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

loadDashboard();

// refresh every 60 seconds
setInterval(loadDashboard, 60000);