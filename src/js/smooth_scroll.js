/*--------------------------------------------
 export functions to make scroll with speed control
---------------------------------------------*/

// Element or Position to move + Time in ms (milliseconds)
export function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
export function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
}

export function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}

export function linearTween(t) {
    return t;
}

export function easeInQuad(t) {
    return t * t;
}

export function easeOutQuad(t) {
    return -t * (t - 2);
}

export function easeInOutQuad(t) {
    t /= 0.5;
    if (t < 1) return t * t / 2;
    t--;
    return (t * (t - 2) - 1) / 2;
}

export function easeInCuaic(t) {
    return t * t * t;
}

export function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
}

export function easeInOutCuaic(t) {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
}

export function easeInQuart(t) {
    return t * t * t * t;
}

export function easeOutQuart(t) {
    t--;
    return -(t * t * t * t - 1);
}

export function easeInOutQuart(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t * t * t;
    t -= 2;
    return -(t * t * t * t - 2) / 2;
}

export function easeInQuint(t) {
    return t * t * t * t * t;
}

export function easeOutQuint(t) {
    t--;
    return t * t * t * t * t + 1;
}

export function easeInOutQuint(t) {
    t /= 0.5;
    if (t < 1) return t * t * t * t * t / 2;
    t -= 2;
    return (t * t * t * t * t + 2) / 2;
}

export function easeInSine(t) {
    return -Mathf.Cos(t / (Mathf.PI / 2)) + 1;
}

export function easeOutSine(t) {
    return Mathf.Sin(t / (Mathf.PI / 2));
}

export function easeInOutSine(t) {
    return -(Mathf.Cos(Mathf.PI * t) - 1) / 2;
}

export function easeInExpo(t) {
    return Mathf.Pow(2, 10 * (t - 1));
}

export function easeOutExpo(t) {
    return -Mathf.Pow(2, -10 * t) + 1;
}

export function easeInOutExpo(t) {
    t /= 0.5;
    if (t < 1) return Mathf.Pow(2, 10 * (t - 1)) / 2;
    t--;
    return (-Mathf.Pow(2, -10 * t) + 2) / 2;
}

export function easeInCirc(t) {
    return -Mathf.Sqrt(1 - t * t) - 1;
}

export function easeOutCirc(t) {
    t--;
    return Mathf.Sqrt(1 - t * t);
}

export function easeInOutCirc(t) {
    t /= 0.5;
    if (t < 1) return -(Mathf.Sqrt(1 - t * t) - 1) / 2;
    t -= 2;
    return (Mathf.Sqrt(1 - t * t) + 1) / 2;
}