(function () {
    const viewed = new Set();
    const emit = (event, params = {}) => {
        const detail = {
            event,
            page_id: 'laviora_story',
            page_version: '20260921-first-esthetic-v2',
            experiment_id: 'none',
            variant: 'skin-story-v2',
            ...params,
        };
        window.dispatchEvent(new CustomEvent('laviora:measurement', { detail }));
        if (window.lavioraAnalyticsConsent === true) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(detail);
        }
    };
    const once = (name, params = {}) => {
        if (!viewed.has(name)) {
            viewed.add(name);
            emit(name, params);
        }
    };
    const pageView = () => {
        if (document.visibilityState === 'visible')
            once('ViewContent');
    };
    pageView();
    document.addEventListener('visibilitychange', pageView);
    const click = (e) => {
        const link = e.target?.closest('a[data-cta]');
        if (!link)
            return;
        const params = {
            cta_position: link.dataset.cta,
            click_id: crypto.randomUUID(),
            destination: 'official_line',
            label_id: 'service_price',
        };
        emit('cta_click', params);
        emit('line_outbound_intent', params);
    };
    document.addEventListener('click', click);
    const protectedCaseImage = (target) => target?.closest?.('.case-media');
    document.addEventListener('dragstart', (event) => {
        if (protectedCaseImage(event.target))
            event.preventDefault();
    });
    document.addEventListener('contextmenu', (event) => {
        if (protectedCaseImage(event.target))
            event.preventDefault();
    });
    const observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting))
            once('ba_reached');
    }, { threshold: 0.25 });
    const first = document.querySelector('[data-case="1"]');
    if (first)
        observer.observe(first);
    const sticky = document.getElementById('sticky-cta');
    const stickyObserver = new IntersectionObserver((entries) => {
        const e = entries[0];
        if (sticky)
            sticky.hidden = !(e.boundingClientRect.bottom < 0 && !e.isIntersecting);
    }, { threshold: 0 });
    const hero = document.getElementById('hero-cta');
    if (hero)
        stickyObserver.observe(hero);
    const disclosure = (e) => {
        const el = e.target;
        if (el.open)
            emit('disclosure_open', { disclosure_id: el.dataset.disclosure });
    };
    const details = document.querySelectorAll('details[data-disclosure]');
    details.forEach((el) => el.addEventListener('toggle', disclosure));
})();
