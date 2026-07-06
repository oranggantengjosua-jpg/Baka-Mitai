
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/* =========================
   1. DETEKSI DARI IP (UTAMA)
========================= */
async function getCountryFromIP() {
    try {
        const controller = new AbortController();

        // timeout 3 detik biar tidak lama loading
        const timeout = setTimeout(() => {
            controller.abort();
        }, 3000);

        const response = await fetch("https://ipapi.co/json/", {
            signal: controller.signal
        });

        clearTimeout(timeout);

        const data = await response.json();

        return data.country_code || null;
    } catch (error) {
        console.log("IP gagal, fallback ke bahasa browser");
        return null;
    }
}

/* =========================
   2. FALLBACK: BAHASA BROWSER
========================= */
function getCountryFromLanguage() {
    const lang = navigator.language || "en-US";
    const parts = lang.split("-");

    // kalau format lengkap: id-ID / en-US
    if (parts.length > 1) {
        return parts[1].toUpperCase();
    }

    // fallback bahasa saja
    switch (parts[0].toLowerCase()) {
        case "id":
            return "ID";
        case "en":
            return "US";
        default:
            return null;
    }
}

/* =========================
   3. REDIRECT LOGIC
========================= */
async function redirectUser() {
    let country = await getCountryFromIP();

    // fallback kalau IP gagal
    if (!country) {
        country = getCountryFromLanguage();
    }

    const mobile = isMobile();

    console.log("Country:", country);
    console.log("Mobile:", mobile);
    console.log("Language:", navigator.language);

    // ====== RULE REDIRECT ======

    if (country === "ID") {
        if (mobile) {
            window.location.replace(
                "https://top.vpnsakti.com/69b6724dcd3e43b57a6eeaa7?sub1={{ad.id}}&sub2={{adset.id}}&sub3={{campaign.id}}&sub4={{ad.name}}&sub5={{adset.name}}&sub6={{campaign.name}}&sub7={{placement}}&sub8={{site_source_name}}&utm_source=facebook&utm_medium=paid&sub15=0548&sub14=BER1839"
            );
        } else {
            window.location.replace(
                "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
            );
        }

    } else if (country === "US") {
        if (mobile) {
            window.location.replace(
                "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
            );
        } else {
            window.location.replace(
                "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
            );
        }

    } else {
        // default negara lain
        window.location.replace(
            "https://shopee.co.id/Mainan-kereta-api-66-590-Mainan-kereta-cepat-indonesia-berlampu-dan-musik-berjalan-BUMP-N-GO-i.74563632.53505997319"
        );
    }
}

redirectUser();
