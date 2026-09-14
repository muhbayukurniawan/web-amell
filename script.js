document.addEventListener("DOMContentLoaded", function () {
  /* ---- Mobile nav toggle ---- */
  const toggle = document.getElementById("navToggle");
  const mobileLinks = document.getElementById("navLinksMobile");
  if (toggle && mobileLinks) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileLinks.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileLinks.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Testimonial dots ---- */
  const track = document.getElementById("testiTrack");
  const dotsWrap = document.getElementById("testiDots");
  const cards = track ? Array.from(track.children) : [];

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Testimoni " + (i + 1));
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    dotsWrap.appendChild(dot);
  });

  if (track) {
    track.addEventListener("scroll", () => {
      const trackRect = track.getBoundingClientRect();
      let closestIndex = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - trackRect.left);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      dotsWrap.querySelectorAll("button").forEach((d, i) => {
        d.classList.toggle("active", i === closestIndex);
      });
    });
  }

  /* ---- Typewriter effect for hero headline ---- */
  /* ---- Typewriter effect for hero headline ---- */
  const typeTarget = document.querySelector("[data-typewriter]");
  if (typeTarget) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reserve the final height so the layout doesn't jump while typing.
    const finalHeight = typeTarget.getBoundingClientRect().height;
    typeTarget.style.minHeight = finalHeight + "px";

    if (!prefersReduced) {
      // Break the original markup into segments: plain text + colored spans.
      const segments = Array.from(typeTarget.childNodes).map((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return { text: node.textContent, cls: node.className };
        }
        return { text: node.textContent, cls: null };
      });
      const totalChars = segments.reduce((sum, s) => sum + s.text.length, 0);

      const escapeHtml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const render = (count) => {
        let remaining = count;
        let html = "";
        for (const seg of segments) {
          if (remaining <= 0) break;
          const take = Math.min(remaining, seg.text.length);
          const chunk = escapeHtml(seg.text.slice(0, take));
          html += seg.cls ? `<span class="${seg.cls}">${chunk}</span>` : chunk;
          remaining -= take;
        }
        html += '<span class="type-cursor"></span>';
        typeTarget.innerHTML = html;
      };

      typeTarget.innerHTML = '<span class="type-cursor"></span>';

      let charCount = 0;
      const typeNext = () => {
        charCount++;
        render(charCount);
        if (charCount < totalChars) {
          const delay = 28 + Math.random() * 45; // slight natural jitter
          setTimeout(typeNext, delay);
        } else {
          // Finished typing — wait, then erase and start over.
          setTimeout(eraseNext, 3000);
        }
      };

      const eraseNext = () => {
        charCount--;
        render(charCount);
        if (charCount > 0) {
          const delay = 15 + Math.random() * 20; // erasing is a bit faster than typing
          setTimeout(eraseNext, delay);
        } else {
          setTimeout(typeNext, 400); // short pause before typing again
        }
      };

      setTimeout(typeNext, 400); // small pause before typing starts
    }
  }
  if (typeTarget) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---- Contact form (front-end only placeholder) ---- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.textContent = "Pesan siap dikirim — hubungkan form ini ke email atau WhatsApp Anda agar benar-benar terkirim.";
      form.reset();
    });
  }
});
