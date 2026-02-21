    document.getElementById("year").textContent = new Date().getFullYear();

    const LINKS = {
      linktreeOrApps: "https://linktr.ee/hschneemann",
      github: "https://github.com/DEIN-USERNAME",
      linkedin: "https://www.linkedin.com/in/DEIN-PROFIL/"
    };

    const appsLink = document.getElementById("appsLink");
    const githubLink = document.getElementById("githubLink");
    const linkedinLink = document.getElementById("linkedinLink");

    if (LINKS.linktreeOrApps) appsLink.href = LINKS.linktreeOrApps;
    if (LINKS.github) githubLink.href = LINKS.github;
    if (LINKS.linkedin) linkedinLink.href = LINKS.linkedin;
