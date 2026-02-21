// cookies.js - Gestión de consentimiento de cookies y carga de Google Analytics
(function() {
    const GA_MEASUREMENT_ID = 'G-80WCM4B3E6';

    function cargarGoogleAnalytics() {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
        `;
        document.head.appendChild(script2);
    }

    function inicializarBannerCookies() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');

        if (!banner || !acceptBtn) return;

        if (localStorage.getItem('cookiesAccepted') === 'true') {
            banner.style.display = 'none';
            cargarGoogleAnalytics();
        } else {
            banner.style.display = 'block';
        }

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            banner.style.display = 'none';
            cargarGoogleAnalytics();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarBannerCookies);
    } else {
        inicializarBannerCookies();
    }
})();
