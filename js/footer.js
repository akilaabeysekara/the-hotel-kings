const burger = document.getElementById("burger");
        const sidebar = document.getElementById("sidebar-header");
        const closeBtn = document.getElementById("closebtn");

        burger.addEventListener("click", () => {
            sidebar.classList.add("show");
        });

        closeBtn.addEventListener("click", () => {
            sidebar.classList.remove("show");
        });