const page = document.body.dataset.page;

for (const link of document.querySelectorAll(".nav-links a")) {
  if (link.dataset.page === page) {
    link.classList.add("active");
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.2 }
);

for (const element of document.querySelectorAll(".fade-in")) {
  observer.observe(element);
}
