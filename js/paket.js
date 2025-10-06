const packages = {
    halfDay: {
        title: "Paket 1/2 Day",
        price: "IDR 500.000",
        activities: [
            "Treking ke sawah",
            "Air Terjun Cunca Caru",
            "Flying Fox"
        ]
    },
    camping: {
        title: "Paket 1D2N",
        price: "IDR 2.000.000",
        activities: [
            "Welcoming drink homestay",
            "Menganyam Tikar",
            "Visitasi ke Tradisional House",
            "Visitasi Screen House Of Modern / green House",
            "Petik Kopi",
            "Mata Air Kramat",
            "Flying Fox",
            "Treking ke sawah",
            "Air Terjun Cunca Caru",
            "Mancing"
        ]
    },
    twoDay: {
        title: "Paket 2D3N",
        price: "IDR 3.500.000",
        activities: [
            "Farmstay Wae Kempo",
            "Pante Tuak / Lolu Tuak",
            "Petik kopi",
            "Menganyam tikar",
            "Mata Air Keramat",
            "Visitasi Screen House Of Modern / green House",
            "Visitasi ke Tradisional House",
            "Flying Fox",
            "Penelusuran gua Watu Tahang",
            "Treking ke sawah",
            "Air Terjun Cunca Caru",
            "River Tubing (min. 5 orang )",
            "Petik kopi",
            "Proses Memasak Moke",
            "Mancing",
            "Visitasi ke Rumah UMKM ( Tenun kain Adat, olahan kripik pegagan,olahan kopi khas Golo Loni, dll )"
        ]
    }
};

function openModal(packageType) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const activityList = document.getElementById('activityList');

    const packageData = packages[packageType];

    // Clear existing content
    modalTitle.innerHTML = `${packageData.title} <span class="modal-price">${packageData.price}</span>`;
    activityList.innerHTML = '';

    // Populate activities
    packageData.activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.className = 'activity-item';
        li.innerHTML = `
                    <div class="activity-number">${index + 1}</div>
                    <div class="activity-text">${activity}</div>
                `;
        activityList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

