const whatsappNumber = "201211188849";
const whatsappMessage = "موافقة";

const screens = {
  intro: document.getElementById("intro"),
  proposal: document.getElementById("proposal"),
  yes: document.getElementById("yesResult"),
  no: document.getElementById("noResult"),
};

const showProposalButton = document.getElementById("showProposal");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const whatsappLink = document.getElementById("whatsappLink");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function revealItems(screen, initialDelay = 250, interval = 310) {
  const items = [...screen.querySelectorAll(".reveal-line")];

  items.forEach((item, index) => {
    const delay = reducedMotion ? 0 : initialDelay + index * interval;
    window.setTimeout(() => item.classList.add("is-visible"), delay);
  });
}

function switchScreen(from, to, revealDelay = 280, revealInterval = 260) {
  from.classList.add("is-leaving");
  from.classList.remove("is-active");

  const transitionTime = reducedMotion ? 0 : 620;
  window.setTimeout(() => {
    from.hidden = true;
    from.classList.remove("is-leaving");
    to.hidden = false;

    // Force layout so Safari consistently plays the entrance transition.
    void to.offsetWidth;
    to.classList.add("is-active");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    revealItems(to, revealDelay, revealInterval);
  }, transitionTime);
}

function buildWhatsAppLink() {
  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  whatsappLink.href = whatsappUrl;
}

showProposalButton.addEventListener("click", () => {
  switchScreen(screens.intro, screens.proposal, 220, 215);
});

yesButton.addEventListener("click", () => {
  buildWhatsAppLink();
  switchScreen(screens.proposal, screens.yes, 350, 330);
});

noButton.addEventListener("click", () => {
  switchScreen(screens.proposal, screens.no, 320, 380);
});

// Let the opening light appear first, then reveal the message calmly.
revealItems(screens.intro, 1450, 540);
