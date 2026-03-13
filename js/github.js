async function loadDashboard() {

    const res = await fetch("http://localhost:8080/api/github/dashboard");
    const data = await res.json();

    document.getElementById("repos").textContent = data.repos;
    document.getElementById("followers").textContent = data.followers;

    const langList = document.getElementById("languages");

    for (const [lang, count] of Object.entries(data.top_languages)) {

        const li = document.createElement("li");

        if (count === 1){
            li.textContent = `${lang} (${count} repo)`;
        } else {
            li.textContent = `${lang} (${count} repos)`;
        }

        langList.appendChild(li);
    }

    const repoList = document.getElementById("reposList");

    data.top_repos.forEach(repo => {

        const li = document.createElement("li");
        li.textContent = `${repo.name} ⭐${repo.stargazers_count}`;

        repoList.appendChild(li);

    });
}

loadDashboard();

