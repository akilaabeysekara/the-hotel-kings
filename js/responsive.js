const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar-header");
const closeBtn = document.getElementById("closebtn");

burger.addEventListener("click", () => {
  sidebar.classList.add("show");
  document.body.style.overflow = "hidden"; 
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
  document.body.style.overflow = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sidebar.classList.remove("show");
    document.body.style.overflow = "";
  }
});
