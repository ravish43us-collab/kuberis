
const menuBtn = document.querySelector('.mobile-btn');
if(menuBtn){
  menuBtn.addEventListener('click',()=>{
    const links = document.querySelector('.nav-links');
    if(!links) return;
    const open = links.dataset.open === 'true';
    links.dataset.open = (!open).toString();
    links.style.display = open ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '86px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '24px';
    links.style.background = '#f7f3ef';
    links.style.flexDirection = 'column';
    links.style.borderBottom = '1px solid #d8cec7';
  });
}
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
