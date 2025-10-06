// Facilities Section Interactive Functionality
document.addEventListener('DOMContentLoaded', function () {
    const facilityButtons = document.querySelectorAll('.facility-btn');
    const facilityTitle = document.querySelector('.facility-content-title');
    const facilityDescriptionText = document.querySelector('.facility-description-text');

    // Facility data based on actual Golo Loni Village amenities
    const facilityData = {
        'infrastruktur-jalan': {
            title: 'infrastruktur jalan',
            items: [
                'Kondisi jalan yang baik menuju desa',
                'Akses jalan dalam desa sudah memadai',
                'Memudahkan transportasi wisatawan',
                'Dapat dilalui kendaraan roda dua dan empat',
                'Pemeliharaan jalan dilakukan secara berkala',
                'Akses mudah ke berbagai lokasi wisata',
                'Mendukung mobilitas masyarakat dan wisatawan'
            ]
        },
        'food-beverages': {
            title: 'Makanan dan Minuman',
            description: [
                'Warung sembako dan kedai bakso tersedia',
                'Kedai kopi dikelola oleh Pokdarwis',
                'Kripik Pegagan sebagai oleh-oleh khas',
                'Makanan lokal dengan cita rasa autentik',
                'Harga terjangkau untuk wisatawan',
                'Produk lokal berkualitas',
                'Pengalaman kuliner tradisional Manggarai'
            ]
        },
        'accommodation': {
            title: 'Akomodasi',
            description: [
                '10 unit homestay tersedia',
                'Kapasitas sekitar 50 tamu',
                'Suasana tradisional dan nyaman',
                'Dikelola oleh masyarakat lokal',
                'Pengalaman menginap autentik',
                'Fasilitas dasar yang memadai',
                'Interaksi langsung dengan budaya lokal'
            ]
        },
        'tourism-info': {
            title: 'Informasi Wisata',
            description: [
                'Dikelola oleh Pokdarwis (Kelompok Sadar Wisata)',
                'Sistem SIMPONI sedang dikembangkan',
                'Pusat Informasi Wisata Golo Loni',
                'Panduan wisata dan informasi atraksi',
                'Koordinasi dengan pemandu lokal',
                'Layanan informasi untuk wisatawan',
                'Pengembangan berkelanjutan'
            ]
        },
        'education': {
            title: 'Fasilitas Pendidikan',
            description: [
                'Sekolah Dasar (SD) tersedia',
                'Sekolah Menengah Pertama (SMP)',
                'Sekolah Menengah Atas (SMA)',
                'Mendukung pendidikan masyarakat lokal',
                'Fasilitas pembelajaran yang memadai',
                'Akses pendidikan untuk semua usia',
                'Kontribusi terhadap pengembangan SDM'
            ]
        },
        'healthcare': {
            title: 'Fasilitas Kesehatan',
            description: [
                'Puskesmas dan klinik kesehatan',
                'Apotek untuk kebutuhan obat-obatan',
                'Pelayanan kesehatan dasar',
                'Tenaga medis yang kompeten',
                'Akses mudah untuk masyarakat dan wisatawan',
                'Layanan kesehatan preventif dan kuratif',
                'Mendukung kesehatan masyarakat'
            ]
        },
        'religious': {
            title: 'Fasilitas Keagamaan',
            description: [
                'Gereja dan tempat ibadah lainnya',
                'Mendukung kegiatan keagamaan masyarakat',
                'Arsitektur tradisional yang menarik',
                'Pusat kegiatan spiritual komunitas',
                'Terbuka untuk wisatawan yang ingin berkunjung',
                'Bagian dari warisan budaya lokal',
                'Harmoni keberagaman dalam masyarakat'
            ]
        },
        'spot-foto-selfie': {
            title: 'Spot Foto & Selfie',
            description: [
                'Berbagai lokasi foto dengan pemandangan indah',
                'Spot selfie instagramable dengan latar alam',
                'Background pemandangan gunung dan lembah',
                'Dekorasi tradisional yang menarik',
                'Lighting alami yang sempurna',
                'Cocok untuk foto keluarga dan grup',
                'Spot sunrise dan sunset terbaik'
            ]
        },
        'area-parkir': {
            title: 'Area Parkir',
            description: [
                'Area parkir yang memadai untuk wisatawan',
                'Dapat menampung kendaraan roda dua dan empat',
                'Lokasi strategis dekat area wisata',
                'Permukaan yang rata dan aman',
                'Akses mudah ke berbagai fasilitas',
                'Gratis untuk pengunjung',
                'Dikelola dengan baik oleh masyarakat'
            ]
        },
        'outbound': {
            title: 'Outbound',
            description: [
                'Area permainan dan aktivitas outbound',
                'Cocok untuk team building dan gathering',
                'Berbagai permainan tradisional tersedia',
                'Aktivitas outdoor di alam terbuka',
                'Dipandu oleh instruktur berpengalaman',
                'Peralatan keamanan tersedia',
                'Pengalaman seru untuk semua usia'
            ]
        },
        'kamar-mandi-umum': {
            title: 'Kamar Mandi Umum',
            description: [
                'Fasilitas sanitasi bersih dan terawat',
                'Tersedia di beberapa lokasi strategis',
                'Air bersih mengalir lancar',
                'Terpisah untuk pria dan wanita',
                'Dibersihkan secara rutin',
                'Akses mudah untuk wisatawan',
                'Fasilitas dasar yang memadai'
            ]
        },
    };

    // Function to update facility content
    function updateFacilityContent(facilityKey) {
        const facility = facilityData[facilityKey];

        if (facility) {
            // HANYA update title dan deskripsi
            facilityTitle.textContent = facility.title.toLowerCase();

            facilityDescriptionText.innerHTML = '';
            (facility.description || facility.items).forEach(desc => {
                const p = document.createElement('p');
                p.textContent = desc;
                facilityDescriptionText.appendChild(p);
            });
        }
    }

    // Add click event listeners to facility buttons
    facilityButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            facilityButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get facility data and update content
            const facilityKey = this.getAttribute('data-facility');
            updateFacilityContent(facilityKey);

            // Update dropdown to match selected button (for consistency)
            const dropdown = document.getElementById('facilities-dropdown');
            if (dropdown) {
                dropdown.value = facilityKey;
            }
        });
    });

    // Add change event listener to dropdown
    const facilitiesDropdown = document.getElementById('facilities-dropdown');
    if (facilitiesDropdown) {
        facilitiesDropdown.addEventListener('change', function () {
            const facilityKey = this.value;
            updateFacilityContent(facilityKey);

            // Update button active state to match dropdown selection (for consistency)
            facilityButtons.forEach(btn => btn.classList.remove('active'));
            const matchingButton = document.querySelector(`[data-facility="${facilityKey}"]`);
            if (matchingButton) {
                matchingButton.classList.add('active');
            }
        });
    }

    // Initialize with first facility
    const initialFacility = 'road-infrastructure';
    updateFacilityContent(initialFacility);

    // Set initial active states
    const firstButton = document.querySelector(`[data-facility="${initialFacility}"]`);
    if (firstButton) {
        firstButton.classList.add('active');
    }

    if (facilitiesDropdown) {
        facilitiesDropdown.value = initialFacility;
    }
});
