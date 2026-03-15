// ── OFFER BAR CLOSE ──
var offerClose = document.getElementById("offer-close");
if (offerClose) {
    offerClose.onclick = function () {
        document.querySelector(".offer-bar").style.display = "none";
    };
}

// ── HAMBURGER MENU ──
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
    hamburger.onclick = function () {
        mobileMenu.classList.toggle("open");
    };
}

// ── HERO SLIDER ──
var slider = document.querySelector(".slider-image-container");
var index = 0;

var rightBtn = document.getElementById("slider-right-activate");
var leftBtn  = document.getElementById("slider-left-activate");

if (rightBtn) {
    rightBtn.onclick = function () {
        index++;
        if (index > 2) index = 0;
        slider.style.transform = "translateX(-" + index * 100 + "vw)";
    };
}

if (leftBtn) {
    leftBtn.onclick = function () {
        index--;
        if (index < 0) index = 2;
        slider.style.transform = "translateX(-" + index * 100 + "vw)";
    };
}

// Auto slide every 4 seconds
if (slider) {
    setInterval(function () {
        index++;
        if (index > 2) index = 0;
        slider.style.transform = "translateX(-" + index * 100 + "vw)";
    }, 4000);
}

// ── TOAST ──
function showToast(msg) {
    var toast = document.getElementById("cartToast");
    if (!toast) return;
    toast.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#4caf50"></i> ' + msg;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}

// ── SHOP NOW BUTTONS ──
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("shop-btn")) {
        if (!e.target.getAttribute("onclick")) {
            showToast("Added to cart!");
        }
    }
});

// ── COLLECTIONS: SEARCH & FILTER ──
var searchInput = document.getElementById("searchInput");
var clearBtn    = document.getElementById("clearSearch");
var filterBtns  = document.querySelectorAll(".filter-btn");
var sortSelect  = document.getElementById("sortSelect");
var grid        = document.getElementById("collectionsGrid");
var noResults   = document.getElementById("noResults");
var resultCount = document.getElementById("resultCount");
var resetBtn    = document.getElementById("resetFilters");

var activeFilter = "all";
var searchQuery  = "";

function runFilter() {
    var cards = document.querySelectorAll("#collectionsGrid .product");
    var count = 0;

    cards.forEach(function (card) {
        var category = card.dataset.category || "";
        var name     = (card.dataset.name || "").toLowerCase();

        var matchFilter = activeFilter === "all" || category.includes(activeFilter);
        var matchSearch = searchQuery === "" || name.includes(searchQuery);

        if (matchFilter && matchSearch) {
            card.style.display = "";
            count++;
        } else {
            card.style.display = "none";
        }
    });

    if (resultCount) resultCount.textContent = count + " Products";
    if (noResults)   noResults.style.display = count === 0 ? "block" : "none";
}

if (searchInput) {
    searchInput.oninput = function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = searchQuery ? "inline" : "none";
        runFilter();
    };
}

if (clearBtn) {
    clearBtn.onclick = function () {
        searchInput.value = "";
        searchQuery = "";
        clearBtn.style.display = "none";
        runFilter();
    };
}

filterBtns.forEach(function (btn) {
    btn.onclick = function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeFilter = btn.dataset.filter;
        runFilter();
    };
});

if (sortSelect) {
    sortSelect.onchange = function () {
        var cards   = Array.from(document.querySelectorAll("#collectionsGrid .product"));
        var visible = cards.filter(function (c) { return c.style.display !== "none"; });

        visible.sort(function (a, b) {
            var val = sortSelect.value;
            if (val === "price-low")  return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            if (val === "price-high") return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            if (val === "name")       return (a.dataset.name || "").localeCompare(b.dataset.name || "");
            return 0;
        });

        visible.forEach(function (card) { grid.appendChild(card); });
    };
}

if (resetBtn) {
    resetBtn.onclick = function () {
        activeFilter = "all";
        searchQuery  = "";
        if (searchInput) searchInput.value = "";
        if (clearBtn)    clearBtn.style.display = "none";
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        var allBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allBtn) allBtn.classList.add("active");
        runFilter();
    };
}

// URL param — from index.html category buttons
var urlParams = new URLSearchParams(window.location.search);
var urlFilter = urlParams.get("filter");
if (urlFilter && grid) {
    var matchBtn = document.querySelector('.filter-btn[data-filter="' + urlFilter + '"]');
    if (matchBtn) {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        matchBtn.classList.add("active");
        activeFilter = urlFilter;
        runFilter();
    }
}

// ── CONTACT FORM ──
var contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent successfully!");
        this.reset();
    });
}

// ── FAQ ACCORDION ──
document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.onclick = function () {
        var item   = btn.closest(".faq-item");
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(function (el) {
            el.classList.remove("open");
        });
        if (!isOpen) item.classList.add("open");
    };
});
