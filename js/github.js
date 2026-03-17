async function loadDashboard() {

    const res = await fetch("http://localhost:8080/api/github/dashboard");
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

    const max = Math.max(...Object.values(data.top_languages));

    for (const [lang, count] of Object.entries(data.top_languages)) {

        const wrapper = document.createElement("div");
        wrapper.className = "language-bar";

        const name = document.createElement("div");
        name.className = "language-name";
        name.textContent = lang;

        const graph = document.createElement("div");
        graph.className = "language-graph";

        const fill = document.createElement("div");
        fill.className = "language-fill";
        fill.style.width = `${(count / max) * 100}%`;

        graph.appendChild(fill);

        const number = document.createElement("span");
        number.textContent = count;

        wrapper.appendChild(name);
        wrapper.appendChild(graph);
        wrapper.appendChild(number);

        langList.appendChild(wrapper);
    }


    data.top_repos.forEach(repo => {

        const li = document.createElement("li");
        li.textContent = `${repo.name} ⭐${repo.stargazers_count}`;

        repoList.appendChild(li);

    });
}

loadDashboard();

// refresh every 60 seconds
setInterval(loadDashboard, 60000);