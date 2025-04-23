document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const darkToggle = document.getElementById('darkToggle');
  
    menuBtn.onclick = () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    };
    closeBtn.onclick = () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    };
    overlay.onclick = () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    };
  
    // Dark Mode
    darkToggle.onclick = () => {
      document.body.classList.toggle('dark');
      const icon = darkToggle.querySelector('i');
      icon.classList.toggle('uil-moon');
      icon.classList.toggle('uil-sun');
    };
  });

