document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const skills = document.querySelectorAll(".skill");
const projects = document.querySelectorAll(".project");
let activeSkill = null;

skills.forEach((skill) => {
  skill.addEventListener("click", () => {
    const skillName = skill.getAttribute("data-skill");

    if (activeSkill === skillName) {
      skill.classList.remove("active");
      activeSkill = null;
    } else {
      if (activeSkill) {
        document
          .querySelector(`.skill[data-skill="${activeSkill}"]`)
          .classList.remove("active");
      }

      skill.classList.add("active");
      activeSkill = skillName;
    }

    filterProjects();
  });
});

function filterProjects() {
  projects.forEach((project) => {
    const projectTags = project.getAttribute("data-tags").split(",");
    if (!activeSkill || projectTags.includes(activeSkill)) {
      project.classList.remove("hidden");
      project.style.opacity = "0";
      setTimeout(() => {
        project.style.opacity = "1";
      }, 300);
    } else {
      project.classList.add("hidden");
    }
  });
}
const sections = document.querySelectorAll(".section");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});



