const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const savedTheme = localStorage.getItem("portfolioTheme");
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}
function updateThemeButton() {
    if (!themeToggle) return;
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
}
updateThemeButton();
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");
        const currentTheme = document.body.classList.contains("dark-theme")
            ? "dark"
            : "light";
        localStorage.setItem("portfolioTheme", currentTheme);
        updateThemeButton();
    });
}
if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a").forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    }
});
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });
        button.classList.add("active");
        projectCards.forEach(function (card) {
            const category = card.dataset.category;
            card.hidden = filter !== "all" && category !== filter;
        });
    });
});
const projectDetails = document.getElementById("projectDetails");
const detailsTitle = document.getElementById("detailsTitle");
const detailsText = document.getElementById("detailsText");
const closeDetails = document.getElementById("closeDetails");
const projectInfo = {
    slider: {
        title: "Image Slider",
        text: "An image slider built using HTML, CSS, and JavaScript. It allows users to move between images using Next and Previous buttons."
    },
    clock: {
        title: "Digital Clock",
        text: "A digital clock built using JavaScript Date and setInterval to display the current time and update every second."
    },
    clinic: {
        title: "Clinic Appointment Booking",
        text: "A clinic appointment booking interface where users can enter their details, choose a doctor, and select an appointment date and time."
    }
};
document.querySelectorAll("[data-demo]").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const project = projectInfo[button.dataset.demo];
        if (!project || !projectDetails || !detailsTitle || !detailsText) {
            return;
        }
        detailsTitle.textContent = project.title;
        detailsText.textContent = project.text;
        projectDetails.hidden = false;
        projectDetails.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

if (closeDetails && projectDetails) {
    closeDetails.addEventListener("click", function () {
        projectDetails.hidden = true;
    });
}
