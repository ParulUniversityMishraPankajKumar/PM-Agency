document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.testimonials-section');
  if (!section) return;

  const columns = Array.from(section.querySelectorAll('.row > [class*="col-"]'));
  const dotsRoot = section.querySelector('.testimonial-dots');
  let itemsPerPage = window.innerWidth >= 992 ? 2 : 1;
  let currentPage = 0;

  // Generate dots based on testimonials count
  function buildDots() {
    dotsRoot.innerHTML = '';
    const totalPages = Math.ceil(columns.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot-nav' + (i === 0 ? ' active' : '');
      dot.dataset.page = i;
      dotsRoot.appendChild(dot);
    }
  }

  // Show testimonials for the current page
  function showPage(page) {
    columns.forEach((col, index) => {
      col.style.display =
        index >= page * itemsPerPage && index < (page + 1) * itemsPerPage
          ? ''
          : 'none';
    });

    dotsRoot.querySelectorAll('.dot-nav').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === page);
    });
  }

  // Listen for dot clicks
  dotsRoot.addEventListener('click', (e) => {
    const clickedDot = e.target.closest('.dot-nav');
    if (!clickedDot) return;
    currentPage = parseInt(clickedDot.dataset.page, 10);
    showPage(currentPage);
  });

  // Adjust items per page on window resize
  window.addEventListener('resize', () => {
    const newItemsPerPage = window.innerWidth >= 992 ? 2 : 1;
    if (newItemsPerPage !== itemsPerPage) {
      itemsPerPage = newItemsPerPage;
      currentPage = 0;
      buildDots();
      showPage(currentPage);
    }
  });

  // Initialize
  buildDots();
  showPage(currentPage);
});
