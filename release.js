// Fill the release values once the links are approved and tested.
const release = {
  windowsZip: "https://github.com/John-putian/JollibeeHorror-TheLastBirthday/releases/download/v1.0/JollibeeHorror_TheLastBirthday_Windows.zip",
  youtubeId: "",
  contactEmail: "",
  feedbackUrl: "",
};
if (/^[\w-]{11}$/.test(release.youtubeId)) {
  for (const slot of document.querySelectorAll("[data-trailer]")) {
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + release.youtubeId;
    frame.title = "The Last Birthday official trailer";
    frame.loading = "lazy";
    frame.allowFullscreen = true;
    slot.replaceChildren(frame);
  }
} else {
  // Until the trailer is on YouTube, play the local file media/trailer.mp4 when it exists.
  fetch("media/trailer.mp4", { method: "HEAD" }).then((r) => {
    if (!r.ok) return;
    for (const slot of document.querySelectorAll("[data-trailer]")) {
      const v = document.createElement("video");
      v.src = "media/trailer.mp4"; v.controls = true; v.preload = "metadata"; v.poster = "media/g8_rooftop.webp";
      slot.replaceChildren(v);
    }
  }).catch(() => {});
}
function approvedUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
const windows = approvedUrl(release.windowsZip);
if (windows) {
  const button = document.querySelector("#build-link");
  button.href = windows;
  button.hidden = false;
  document.querySelector("#build-pending").hidden = true;
}
const contact = document.querySelector("#contact-links");
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(release.contactEmail)
  ? "mailto:" + release.contactEmail : null;
for (const [label, href] of [["Email the team", email], ["Report a bug or give feedback", approvedUrl(release.feedbackUrl)]]) {
  if (!href) continue;
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = href;
  a.textContent = label;
  li.append(a);
  contact.append(li);
}
if (contact.childElementCount) {
  contact.hidden = false;
  document.querySelector("#contact-pending").hidden = true;
}
