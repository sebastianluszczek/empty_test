import 'jquery';
import 'jquery-scrollify';
import '../scss/main.scss';

document.addEventListener('DOMContentLoaded', function () {

    // google reCAPTCHA
    (function () {
        var CFG = '___grecaptcha_cfg';
        if (!window[CFG]) {
            window[CFG] = {};
        }
        var GR = 'grecaptcha';
        if (!window[GR]) {
            window[GR] = {};
        }
        window[GR].ready = window[GR].ready || function (f) {
            (window[CFG]['fns'] = window[CFG]['fns'] || []).push(f);
        };
        (window[CFG]['render'] = window[CFG]['render'] || []).push('onload');
        window['__google_recaptcha_client'] = true;
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://www.gstatic.com/recaptcha/api2/v1545073489967/recaptcha__en.js';
        var elem = document.querySelector('script[nonce]');
        var n = elem && (elem['nonce'] || elem.getAttribute('nonce'));
        if (n) {
            po.setAttribute('nonce', n);
        }
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();

    let st = document.documentElement.scrollTop;
    let vh = Math.floor(window.innerHeight * 0.9);

    const job_info_modal = document.querySelector('.job-modal');
    const job_info_modal_header = document.querySelector('.job-modal #modal_header');
    const job_info_modal_text = document.querySelector('.job-modal #modal_text');

    const info_btns = document.querySelectorAll('.box-btns .info');

    info_btns.forEach(btn => {
        btn.addEventListener('click', () => {
            job_info_modal.style.display = "block";

            job_info_modal_header.innerText = btn.parentNode.parentNode.childNodes[1].innerText;
            job_info_modal_text.innerHTML = `${btn.parentNode.parentNode.childNodes[3].innerHTML}`;
            console.log(job_info_modal_text);
        })
    });

    const img_modal = document.querySelector('.img-modal');
    const what_imgs = document.querySelectorAll('#what_content img');

    what_imgs.forEach((img) => {
        img.addEventListener('click', () => {
            img_modal.children[1].setAttribute("src", img.src);
            img_modal.style.display = "block";
        })
    });

    document.querySelector('.close-btn-job').addEventListener('click', () => {
        job_info_modal.style.display = "none";
    });

    document.querySelector('.close-btn-img').addEventListener('click', () => {
        img_modal.style.display = "none";
        img_modal.children[1].setAttribute("src", "");
    });

    $(function () {
        $.scrollify({
            section: ".section",
            sectionName: 'section',
            scrollSpeed: 1000,
            overflowScroll: true,
            scrollbars: false,
            standardScrollElements: '.normal_scroll',
            before: function (i, panels) {
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
                side_nav.classList.remove('active');
                side_nav_icon.classList.remove('active');
            });

        })
    });

    document.querySelector('.btn-down').addEventListener('click', () => {
        $.scrollify.next();
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

    // TODO: POST method serverside!
    document.getElementById('contact_form').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        const f_name = document.querySelector('#f_name').value;
        const s_name = document.querySelector('#s_name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        const captcha = document.querySelector('#g-recaptcha-response').value;
        console.log(document.querySelector('#g-recaptcha-response').value);

        fetch('/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    f_name: f_name,
                    s_name: s_name,
                    email: email,
                    message: message,
                    captcha: captcha
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            });
        document.querySelector('#f_name').value = '';
        document.querySelector('#s_name').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#message').value = '';
        document.querySelector('#g-recaptcha-response').value = '';
    };


});