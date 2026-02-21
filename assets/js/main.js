const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const LINKS = {
  linktreeOrApps: "https://linktr.ee/hschneemann",
  github: "https://github.com/DEIN-USERNAME",
  linkedin: "https://www.linkedin.com/in/DEIN-PROFIL/"
};

function isValidExternalLink(url) {
  if (!url || typeof url !== "string") {
    return false;
  }

  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") {
    return false;
  }

  if (trimmed.includes("DEIN-") || trimmed.includes("DEIN_")) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function wireOptionalLink(elementId, url) {
  const linkNode = document.getElementById(elementId);
  if (!linkNode) {
    return;
  }

  if (!isValidExternalLink(url)) {
    linkNode.hidden = true;
    linkNode.setAttribute("aria-hidden", "true");
    return;
  }

  linkNode.href = url;
  linkNode.target = "_blank";
  linkNode.rel = "noopener noreferrer";
}

wireOptionalLink("appsLink", LINKS.linktreeOrApps);
wireOptionalLink("githubLink", LINKS.github);
wireOptionalLink("linkedinLink", LINKS.linkedin);
