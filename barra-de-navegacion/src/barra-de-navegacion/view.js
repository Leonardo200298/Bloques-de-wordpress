document.addEventListener('click', (e) => {
  if (!e.target.closest) return;
  const hb = e.target.closest('.hamburger');
  if (hb) {
    const header = hb.closest('.barra-de-navegacion');
    if (header) header.classList.toggle('open');
  }
});
