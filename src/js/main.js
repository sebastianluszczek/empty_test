import 'jquery';
import 'jquery-scrollify';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function () {

    let st = document.documentElement.scrollTop;
    let vh = Math.floor(window.innerHeight * 0.9);

    // job modal

    const job_info_modal = document.querySelector('.job-modal');
    const job_info_modal_header = document.querySelector('.job-modal #modal_header');
    const job_info_modal_text = document.querySelector('.job-modal #modal_text');

    const info_btns = document.querySelectorAll('.box-btns .info');

    info_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            job_info_modal.style.display = "block";

            job_info_modal_header.innerText = btn.parentNode.parentNode.childNodes[1].innerText;
            job_info_modal_text.innerHTML = `${btn.parentNode.parentNode.childNodes[3].innerHTML}`;
        })
    });

    // document.querySelector('.close-btn-job').addEventListener('click', () => {
    //     job_info_modal.style.display = "none";
    // });

    // scrollify

    $(function () {
        $.scrollify({
            section: ".section",
            sectionName: 'section',
            scrollSpeed: 1000,
            overflowScroll: true,
            scrollbars: false,
            // easing: 'linear',
            before: function (i, panels) {
                nav_bar.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.classList.contains(panels[i][0].dataset.section)) {
                        btn.classList.add('active');
                    }
                });

                nav_bar_inn.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.classList.contains(panels[i][0].dataset.section)) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    });

    const nav_bar = document.querySelectorAll('.nav-btn');
    const nav_bar_inn = document.querySelectorAll('.nav-btn-inn');

    nav_bar.forEach(btn => {
        btn.addEventListener('click', function () {
            let looked_class = btn.classList[0];
            $.scrollify.move(`#${looked_class}`);
            nav_bar.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains(looked_class)) {
                    btn.classList.add('active');
                }
                side_nav.classList.remove('active');
                side_nav_icon.classList.remove('active');
            });

        })
    });

    nav_bar_inn.forEach(btn => {
        btn.addEventListener('click', function () {
            let looked_class = btn.classList[0];
            $.scrollify.move(`#${looked_class}`);
            nav_bar.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains(looked_class)) {
                    btn.classList.add('active');
                }
            });

        })
    });

    if (document.URL.indexOf('what') == -1) {
        document.querySelector('#contact_btn').addEventListener('click', () => {
            $.scrollify.move(`#cont`);
        })
    };

    document.querySelector('.nav-logo').addEventListener('click', () => {
        $.scrollify.move(`#who`);
    })

    document.querySelectorAll('.next_section').forEach(btn => {
        btn.addEventListener('click', () => {
            $.scrollify.next();
        });
    });

    document.querySelectorAll('.prev_section').forEach(btn => {
        btn.addEventListener('click', () => {
            $.scrollify.previous();
        });
    });

    // side nav on mobile
    const side_nav = document.querySelector('.side_nav');
    const side_nav_icon = document.querySelector('.side_nav_icon');
    side_nav_icon.addEventListener('click', sideNavToggle);

    function sideNavToggle() {
        this.classList.toggle('active');
        if (side_nav.classList.contains('active')) {
            side_nav.classList.remove('active');
        } else {
            side_nav.classList.add('active');
        }
    };
});
document.querySelector('.res-monitor').innerText = `Width: ${window.innerWidth}px, height: ${window.innerHeight}px.`;
window.addEventListener('resize', () => {
    document.querySelector('.res-monitor').innerText = `Width: ${window.innerWidth}px, height: ${window.innerHeight}px.`;
})