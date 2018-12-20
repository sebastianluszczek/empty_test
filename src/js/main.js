import 'jquery';
import 'jquery-scrollify';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function () {

    let st = document.documentElement.scrollTop;
    let vh = Math.floor(window.innerHeight * 0.9);

    const job_info_modal = document.querySelector('.job-modal');
    const job_info_modal_header = document.querySelector('.job-modal #modal_header');
    const job_info_modal_text = document.querySelector('.job-modal #modal_text');

    const job_iframe = document.getElementById('jobs_iframe');
    const info_btns = job_iframe.contentDocument.childNodes[1].childNodes[2].querySelectorAll('.info');

    info_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            job_info_modal.style.display = "block";

            job_info_modal_header.innerText = btn.parentNode.parentNode.childNodes[1].innerText;
            job_info_modal_text.innerText = `${btn.parentNode.parentNode.childNodes[3].innerText}
            ${btn.parentNode.parentNode.childNodes[5].innerText}`;
            document.body.style = "overflow-y: hidden;"
        })
    });

    const what_iframe = document.getElementById('what_iframe');
    const img_modal = document.querySelector('.img-modal');
    const what_imgs = what_iframe.contentDocument.childNodes[1].childNodes[2].querySelectorAll('img');

    what_imgs.forEach((img) => {
        img.addEventListener('click', () => {
            img_modal.children[1].setAttribute("src", img.src);
            img_modal.style.display = "block";
            document.body.style = "overflow-y: hidden;"
        })
    })

    document.querySelector('.close-btn-job').addEventListener('click', () => {
        job_info_modal.style.display = "none";
        document.body.style = "overflow-y: auto;"
    });

    document.querySelector('.close-btn-img').addEventListener('click', () => {
        img_modal.style.display = "none";
        document.body.style = "overflow-y: auto;"
        img_modal.children[1].setAttribute("src", "");
    });

    $(function () {
        $.scrollify({
            section: ".section",
            sectionName: 'section',
            scrollSpeed: 1000,
            offset: -90,
            overflowScroll: false,
            scrollbars: false,
            standardScrollElements: 'iframe',
            before: function (i, panels) {
                console.log(i);
                nav_bar.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.classList.contains(panels[i][0].id)) {
                        btn.classList.add('active');
                    }
                });
                if (i === 0) {
                    header.classList.remove('is-visible'); // frame fade-in
                } else {
                    header.classList.add('is-visible');
                }
            }
        });
    });

    const nav_bar = document.querySelectorAll('.nav-btn');
    const header = document.getElementById('header');

    nav_bar.forEach(btn => {
        btn.addEventListener('click', function () {
            let looked_class = btn.classList[0];
            $.scrollify.move(`#${looked_class}_scroll`);
            nav_bar.forEach(btn => {
                btn.classList.remove('active');
                if (btn.classList.contains(looked_class)) {
                    btn.classList.add('active');
                }
            });

        })
    })
});