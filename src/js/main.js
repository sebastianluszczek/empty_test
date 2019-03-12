import "jquery";
import "jquery-scrollify";
import "../scss/main.scss";
import jobs from './jobs';

document.addEventListener("DOMContentLoaded", function () {
    let st = document.documentElement.scrollTop;
    let vh = Math.floor(window.innerHeight * 0.9);

    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const job_btns = document.querySelectorAll(".job_btn");
    job_btns.forEach((btn, index) => {
        let ul = document.createElement('ul');
        jobs[index].requirements.forEach(job => {
            let li = document.createElement('li');
            li.textContent = job;
            ul.appendChild(li);
        })

        btn.addEventListener("click", () => {
            modal.style.display = "block";
            modal.children[0].children[1].textContent = jobs[index].position;
            modal.children[0].children[2].textContent = jobs[index].description;
            modal.children[0].appendChild(ul);
        });
    });

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        while (modal.children[0].children[3]) {
            modal.children[0].removeChild(modal.children[0].children[3])
        }
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    const job_boxes = document.querySelectorAll('.box');
    job_boxes.forEach((box, index) => {
        box.children[0].textContent = jobs[index].position;
        box.children[1].textContent = jobs[index].description.slice(0, 40) + '...';
    })

    // scrollify

    $(function () {
        $.scrollify({
            section: ".section",
            sectionName: "section",
            scrollSpeed: 1000,
            overflowScroll: true,
            scrollbars: false,
            // easing: 'linear',
            before: function (i, panels) {
                nav_bar.forEach(btn => {
                    btn.classList.remove("active");
                    if (btn.classList.contains(panels[i][0].dataset.section)) {
                        btn.classList.add("active");
                    }
                });

                nav_bar_inn.forEach(btn => {
                    btn.classList.remove("active");
                    if (btn.classList.contains(panels[i][0].dataset.section)) {
                        btn.classList.add("active");
                    }
                });
            }
        });
    });

    const nav_bar = document.querySelectorAll(".nav-btn");
    const nav_bar_inn = document.querySelectorAll(".nav-btn-inn");

    nav_bar.forEach(btn => {
        btn.addEventListener("click", function () {
            let looked_class = btn.classList[0];
            $.scrollify.move(`#${looked_class}`);
            nav_bar.forEach(btn => {
                btn.classList.remove("active");
                if (btn.classList.contains(looked_class)) {
                    btn.classList.add("active");
                }
                side_nav.classList.remove("active");
                side_nav_icon.classList.remove("active");
            });
        });
    });

    nav_bar_inn.forEach(btn => {
        btn.addEventListener("click", function () {
            let looked_class = btn.classList[0];
            $.scrollify.move(`#${looked_class}`);
            nav_bar.forEach(btn => {
                btn.classList.remove("active");
                if (btn.classList.contains(looked_class)) {
                    btn.classList.add("active");
                }
            });
        });
    });

    if (document.URL.indexOf("what") == -1) {
        document.querySelector("#contact_btn").addEventListener("click", () => {
            $.scrollify.move(`#cont`);
        });
    }

    document.querySelector(".nav-logo").addEventListener("click", () => {
        $.scrollify.move(`#who`);
    });

    document.querySelectorAll(".next_section").forEach(btn => {
        btn.addEventListener("click", () => {
            $.scrollify.next();
        });
    });

    document.querySelectorAll(".prev_section").forEach(btn => {
        btn.addEventListener("click", () => {
            $.scrollify.previous();
        });
    });

    // side nav on mobile
    const side_nav = document.querySelector(".side_nav");
    const side_nav_icon = document.querySelector(".side_nav_icon");
    side_nav_icon.addEventListener("click", sideNavToggle);

    function sideNavToggle() {
        this.classList.toggle("active");
        if (side_nav.classList.contains("active")) {
            side_nav.classList.remove("active");
        } else {
            side_nav.classList.add("active");
        }
    }
});
document.querySelector(".res-monitor").innerText = `Width: ${
  window.innerWidth
}px, height: ${window.innerHeight}px.`;
window.addEventListener("resize", () => {
    document.querySelector(".res-monitor").innerText = `Width: ${
    window.innerWidth
  }px, height: ${window.innerHeight}px.`;
});