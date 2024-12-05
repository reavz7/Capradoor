///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////

// Smooth scrolling animation
const allLinks = document.querySelectorAll("a:link");

if (allLinks.length > 0) { 
  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");

      // Linki prowadzące do innych plików HTML
      if (href.endsWith(".html")) {
        // Pozwalamy na domyślne przekierowanie
        // Nic nie robimy, bo przeglądarka ma obsłużyć to naturalnie
      }

      // Linki prowadzące do sekcji na tej samej stronie (smooth scroll)
      else if (href.startsWith("#")) {
        e.preventDefault(); // Blokujemy domyślne działanie
        const sectionEl = document.querySelector(href);
        
        // Jeśli element nie istnieje, scrollujemy do samej góry strony
        if (!sectionEl && href === "#") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Close mobile navigation
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    });
  });
}

// Dodatkowo, jeśli klikniesz logo, przewijamy stronę na górę
const logoLink = document.querySelector(".header a[href='#']");
if (logoLink) {
  logoLink.addEventListener("click", function (e) {
    e.preventDefault(); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Dodatkowo, jeżeli klikniesz "Strona główna"
const homeLink = document.querySelector(".main-nav-link[href='#']");
if (homeLink) {
  homeLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");
const obss = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 1.0,
    rootMargin: "700px",
  }
);

obss.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);
  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();



 // Data początkowa
 const startDate = new Date('2004-04-01');

 // Funkcja obliczająca różnicę w latach, miesiącach i dniach
 function calculateTimeDifference(startDate) {
     const today = new Date();

     let years = today.getFullYear() - startDate.getFullYear();
     let months = today.getMonth() - startDate.getMonth();
     let days = today.getDate() - startDate.getDate();

     if (days < 0) {
         months--;
         const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
         days += previousMonth.getDate();
     }

     if (months < 0) {
         years--;
         months += 12;
     }

     return { years, months, days };
 }

 // Funkcja aktualizująca tekst
 function updateDisplay() {
     const { years, months, days } = calculateTimeDifference(startDate);
     const lataElement = document.getElementById('lata');
     const czasElement = document.getElementById('czas');

     lataElement.textContent = `${years} lat ${months} miesięcy ${days} dni na rynku`;
     const now = new Date();
     czasElement.textContent = `Dziś jest ${now.toLocaleDateString()}, godzina ${now.toLocaleTimeString()}`;
 }

 // Ustaw aktualizację czasu i daty
 updateDisplay();
 setInterval(updateDisplay, 1000);