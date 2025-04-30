
  let currentSection = '';
  let currentImages = [];

  function openPopup(section) {
    const images = {
      'post-test': [
        { src: 'Quizzes and postest/pt1.jpg', title: 'Post-Test 1' },
        { src: 'Quizzes and postest/pt2.jpg', title: 'Post-Test 2' },
        { src: 'Quizzes and postest/pt3.jpg', title: 'Post-Test 3' },
        { src: 'Quizzes and postest/pretest2.png', title: 'Pre-Test 2' },
        { src: 'Quizzes and postest/pretest3.png', title: 'Pre-Test 3' },
        { src: 'Quizzes and postest/pretest4.png', title: 'Pre-Test 4' }
      ],
      'quizzes': [
        { src: 'Quizzes and postest/q1.jpg', title: 'Quiz 1' },
        { src: 'Quizzes and postest/q2.jpg', title: 'Quiz 2' },
        { src: 'Quizzes and postest/lq.jpg', title: 'Long Quiz' }
      ],
      'test': [
        { src: 'test/test.jpg', title: 'Mid Term Exam' }
      ],
      'activities': [
        { src: 'activities/act1.jpg', title: 'Activity 1' },
        { src: 'activities/act2.jpg', title: 'Activity 2' }
      ]
    };

    if (images[section]) {
      currentSection = section;
      currentImages = images[section];

      let popupContent = `
        <h2 style="color:white; margin-bottom:15px;">${capitalize(section)}</h2>
        <div class="image-grid">
      `;

      currentImages.forEach((img, index) => {
        popupContent += `
          <div onclick="openBigImage(${index})" style="cursor:pointer;">
            <img src="${img.src}" alt="${img.title}">
            <p style="margin-top:5px; color:white;">${img.title}</p>
          </div>
        `;
      });

      popupContent += `
        </div>
        <button onclick="closePopup()">Close</button>
      `;

      const popup = document.getElementById('popup');
      popup.innerHTML = popupContent;
      popup.style.display = 'block';
    }
  }

  function openBigImage(index) {
    const img = currentImages[index];
    const popup = document.getElementById('popup');
    popup.innerHTML = `
      <img src="${img.src}" alt="${img.title}" style="width: 60%; height: auto; max-height: 70vh; border: 2px solid white; border-radius: 10px;">
      <p style="margin-top:10px; font-size:18px; color:white;">${img.title}</p>
      <button onclick="reloadPopup()">Back</button>
    `;
    popup.style.display = 'block';
  }

  function closePopup() {
    document.getElementById('popup').style.display = 'none';
  }

  function reloadPopup() {
    openPopup(currentSection);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).replace('-', ' ');
  }

  function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
  document.body.classList.toggle('sidebar-open');
}

function closeMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('active');
  document.body.classList.remove('sidebar-open');
}


  // Scroll active link highlighting
  window.addEventListener('scroll', () => {
    const sections = [
      document.getElementById('landing'),
      document.getElementById('about'),
      document.getElementById('projects'),
      document.getElementById('features'),
      document.getElementById('contact')
    ];
    const navLinks = document.querySelectorAll('nav a');
    let scrollY = window.pageYOffset;
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      currentSectionId = 'contact';
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
      const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // allow re-animation
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });

    });
  });
