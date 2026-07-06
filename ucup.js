function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/* =========================
   DETEKSI NEGARA DARI IP
========================= */
async function getCountryFromIP() {

    try {

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        },3000);

        const response = await fetch("https://ipapi.co/json/",{
            signal:controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        return data.country_code || null;

    } catch(e){

        return null;

    }

}

/* =========================
   FALLBACK BAHASA
========================= */

function getCountryFromLanguage(){

    const lang = navigator.language || "en-US";

    const parts = lang.split("-");

    if(parts.length>1){

        return parts[1].toUpperCase();

    }

    switch(parts[0]){

        case "id":

            return "ID";

        case "en":

            return "US";

        default:

            return null;

    }

}

/* =========================
   AMBIL LINK DARI CONFIG.JSON
========================= */

async function getMobileLink(){

    try{

        const res = await fetch("/config.json");

        const data = await res.json();

        // contoh:
        // /file1/
        // /file2/index.html

        const folder = location.pathname.split("/")[1];

        return data[folder] || data.default;

    }catch(e){

        return "https://facebook.com/default";

    }

}

/* =========================
   REDIRECT
========================= */

async function redirectUser(){

    let country = await getCountryFromIP();

    if(!country){

        country = getCountryFromLanguage();

    }

    const mobile = isMobile();

    console.log(country);

    console.log(location.pathname);

    if(country==="ID"){

        if(mobile){

            const mobileLink = await getMobileLink();

            window.location.replace(mobileLink);

        }else{

            window.location.replace(
                "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
            );

        }

    }else if(country==="US"){

        window.location.replace(
            "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
        );

    }else{

        window.location.replace(
            "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
        );

    }

}

redirectUser();
