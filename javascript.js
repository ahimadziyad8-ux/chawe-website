const navlinks = document.querySelectorAll("header nav a");
const logolink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

const header = document.querySelector("header");

menuIcon.addEventListener("click", () => {
  // Toggle the menu icon (X/Hamburger) and the visibility of the mobile navigation bar
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

const activepage = () => {
  // This function is for cleanup, ensuring all previous 'active' states are removed.
  header.classList.remove("active");

  navlinks.forEach((link) => {
    link.classList.remove("active");
  });

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

navlinks.forEach((link, idx) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    if (!link.classList.contains("active")) {
      // Manually handle the class changes to prevent section flicker
      const currentActiveLink = document.querySelector("header nav a.active");
      const currentActiveSection = document.querySelector("section.active");

      // 1. Remove active class from old elements
      if (currentActiveLink) currentActiveLink.classList.remove("active");
      if (currentActiveSection) currentActiveSection.classList.remove("active");

      // 2. Set the new active link and section instantly
      link.classList.add("active");
      let sectionIndexToActivate = idx;
      sections[sectionIndexToActivate].classList.add("active");

      // Also close the mobile menu instantly on click
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");

      const targetSection = sections[sectionIndexToActivate];
      if (targetSection) {
        // Scroll to the top of the selected section for a smooth transition
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

logolink.addEventListener("click", (e) => {
  e.preventDefault();
  // Simulate a click on the Home link when the logo is clicked
  const homeLink = navlinks[0];
  if (homeLink) {
    homeLink.click();
  }
});

// Logic for the About section tabs (Experience and Education)
const aboutBtns = document.querySelectorAll(".about-btn");
aboutBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    // Get all content boxes for tab switching
    const aboutDetails = document.querySelectorAll(".about-detail-box");

    // Remove 'active' from all buttons and content boxes
    aboutBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    aboutDetails.forEach((detail) => {
      detail.classList.remove("active");
    });

    // Activate the corresponding detail box based on the button's index
    if (idx < aboutDetails.length) {
      aboutDetails[idx].classList.add("active");
    }
  });
});

function initializePage() {
  // 1. Ensure the header slides down correctly after loading
  header.classList.add("active");

  // 2. Set the default active section to Home
  // (Assuming Home is the first link and section)
  if (navlinks.length > 0 && sections.length > 0) {
    navlinks[0].classList.add("active");
    sections[0].classList.add("active");
  }

  // 3. Trigger the default active tab (Experience) in the About section
  const defaultAboutButton = document.querySelector(".about-btn.active");
  if (defaultAboutButton) {
    // Use .click() to ensure the corresponding content box is activated
    defaultAboutButton.click();
  }
}

// Start the initialization process once the entire page content is loaded
window.addEventListener("load", initializePage);
