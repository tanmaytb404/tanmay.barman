$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Developer", "Full Stack Developer", "Enthusiastic Learner", "Computer Science Student"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Software Developer", "Full Stack Developer", "Enthusiastic Learner"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});


// GitHub API call to fetch repositories and populate projects section
fetch('https://api.github.com/users/tanmaytb404/repos')
  .then(response => response.json())
  .then(repos => {
    const projectsSection = document.querySelector('.projects-grid');
    if (projectsSection) {
      // Filter out forked repositories and sort by stars/updated date
      const filteredRepos = repos
        .filter(repo => !repo.fork && repo.name !== 'tanmaytb404') // Exclude forks and username repo
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
        .slice(0, 12); // Limit to 12 projects
      
      filteredRepos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Get language color
        const languageColors = {
          'JavaScript': '#f1e05a',
          'Python': '#3572A5',
          'Java': '#b07219',
          'HTML': '#e34c26',
          'CSS': '#563d7c',
          'TypeScript': '#2b7489',
          'C++': '#f34b7d',
          'C': '#555555',
          'PHP': '#4F5D95',
          'Ruby': '#701516',
          'Go': '#00ADD8',
          'Rust': '#dea584',
          'Swift': '#ffac45',
          'Kotlin': '#F18E33',
          'Scala': '#c22d40',
          'R': '#198ce7',
          'MATLAB': '#e16737',
          'Shell': '#89e051',
          'PowerShell': '#012456',
          'Vue': '#2c3e50',
          'React': '#61dafb',
          'Angular': '#dd0031',
          'Node.js': '#339933'
        };
        
        const languageColor = languageColors[repo.language] || '#586069';
        
        projectCard.innerHTML = `
          <div class="project-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 0 1.53.92 1.53.92c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
              <div class="project-stats">
                <span class="stars">
                  <i class="fas fa-star"></i>
                  ${repo.stargazers_count || 0}
                </span>
                <span class="forks">
                  <i class="fas fa-code-branch"></i>
                  ${repo.forks_count || 0}
                </span>
              </div>
            </div>
            <p class="project-description">${repo.description || 'A project showcasing my development skills and expertise.'}</p>
            <div class="project-details">
              <div class="project-language">
                <span class="language-dot" style="background-color: ${languageColor}"></span>
                <span>${repo.language || 'Other'}</span>
              </div>
              <div class="project-updated">
                <i class="fas fa-clock"></i>
                <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="project-badge">
              <span>${repo.private ? 'Private' : 'Public'}</span>
            </div>
          </div>
        `;
        
        // Add click event to open repository
        projectCard.addEventListener('click', () => {
          window.open(repo.html_url, '_blank');
        });
        
        projectsSection.appendChild(projectCard);
      });
      
      // Add auto-scroll functionality for projects
      if (filteredRepos.length > 3) {
        const projectsGrid = $('.projects-grid');
        
        function autoScrollProjects(container, scrollAmount = 400) {
          if (container.length) {
            const scrollWidth = container[0].scrollWidth;
            const clientWidth = container[0].clientWidth;
            const currentScroll = container.scrollLeft();
            
            if (currentScroll >= scrollWidth - clientWidth - 10) {
              container.animate({ scrollLeft: 0 }, 1000);
            } else {
              container.animate({ scrollLeft: currentScroll + scrollAmount }, 1000);
            }
          }
        }
        
        // Start auto-scroll for projects (every 6 seconds)
        setInterval(function() {
          autoScrollProjects(projectsGrid, 420);
        }, 6000);
        
        // Pause auto-scroll on hover
        projectsGrid.hover(
          function() {
            $(this).stop(true, true);
          },
          function() {
            // Resume auto-scroll after hover ends
          }
        );
        
        // Manual scroll with mouse wheel
        projectsGrid.on('wheel', function(e) {
          e.preventDefault();
          const delta = e.originalEvent.deltaY;
          const scrollAmount = delta > 0 ? 400 : -400;
          $(this).animate({ scrollLeft: $(this).scrollLeft() + scrollAmount }, 500);
        });
      }
    }
  })
  .catch(error => {
    console.error('Error fetching GitHub repositories:', error);
    // Fallback content if API fails
    const projectsSection = document.querySelector('.projects-grid');
    if (projectsSection) {
      projectsSection.innerHTML = `
        <div class="project-card">
          <div class="project-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 0 1.53.92 1.53.92c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3>GitHub Projects</h3>
              <div class="project-stats">
                <span class="stars">
                  <i class="fas fa-star"></i>
                  0
                </span>
                <span class="forks">
                  <i class="fas fa-code-branch"></i>
                  0
                </span>
              </div>
            </div>
            <p class="project-description">Check out my GitHub profile to see all my projects and contributions.</p>
            <div class="project-details">
              <div class="project-language">
                <span class="language-dot" style="background-color: #586069"></span>
                <span>Various</span>
              </div>
              <div class="project-updated">
                <i class="fas fa-clock"></i>
                <span>Updated recently</span>
              </div>
            </div>
            <div class="project-badge">
              <span>Public</span>
            </div>
          </div>
        </div>
      `;
    }
  });

// Enhanced contact form functionality
$(document).ready(function() {
    const contactForm = $('.contact-form');
    const submitBtn = $('.submit-btn');
    
    // Form submission handling
    contactForm.on('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        submitBtn.addClass('loading');
        submitBtn.find('span').text('Sending...');
        
        // Get form data
        const formData = new FormData(this);
        
        // Submit form using fetch
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success state
                submitBtn.removeClass('loading');
                submitBtn.find('span').text('Message Sent!');
                submitBtn.css('background', 'linear-gradient(135deg, #00C851, #00E676) !important');
                
                // Reset form
                contactForm[0].reset();
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.find('span').text('Send message');
                    submitBtn.css('background', 'linear-gradient(135deg, #0085CA, #1fb5d1) !important');
                }, 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            // Error state
            submitBtn.removeClass('loading');
            submitBtn.find('span').text('Send message');
            showNotification('Failed to send message. Please try again.', 'error');
            console.error('Error:', error);
        });
    });
    
    // Form validation feedback
    contactForm.find('input, textarea').on('input', function() {
        const field = $(this);
        const isValid = this.checkValidity();
        
        if (isValid) {
            field.css('border-color', '#00C851');
        } else {
            field.css('border-color', '#ff4444');
        }
    });
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        $('.notification').remove();
        
        const notification = $(`
            <div class="notification ${type}">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 5000);
        
        // Close button functionality
        notification.find('.close-notification').on('click', function() {
            notification.fadeOut(() => notification.remove());
        });
    }
});

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.notification.success {
    background: linear-gradient(135deg, #00C851, #00E676);
}

.notification.error {
    background: linear-gradient(135deg, #ff4444, #ff6666);
}

.close-notification {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.close-notification:hover {
    background: rgba(255,255,255,0.2);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
`;

$('head').append(notificationStyles);

// Auto-scroll functionality for achievements and education sections
$(document).ready(function() {
    // Auto-scroll for achievements section
    const achievementsGrid = $('.achievements-grid');
    const educationGrid = $('.education-grid');
    
    function autoScroll(container, scrollAmount = 300) {
        if (container.length) {
            const scrollWidth = container[0].scrollWidth;
            const clientWidth = container[0].clientWidth;
            const currentScroll = container.scrollLeft();
            
            // If we've reached the end, scroll back to start
            if (currentScroll >= scrollWidth - clientWidth - 10) {
                container.animate({ scrollLeft: 0 }, 1000);
            } else {
                // Scroll to next position
                container.animate({ scrollLeft: currentScroll + scrollAmount }, 1000);
            }
        }
    }
    
    // Start auto-scroll for achievements (every 4 seconds)
    if (achievementsGrid.length) {
        setInterval(function() {
            autoScroll(achievementsGrid, 320); // Card width + gap
        }, 4000);
    }
    
    // Start auto-scroll for education (every 5 seconds)
    if (educationGrid.length) {
        setInterval(function() {
            autoScroll(educationGrid, 380); // Card width + gap
        }, 5000);
    }
    
    // Pause auto-scroll on hover
    achievementsGrid.hover(
        function() {
            $(this).stop(true, true);
        },
        function() {
            // Resume auto-scroll after hover ends
        }
    );
    
    educationGrid.hover(
        function() {
            $(this).stop(true, true);
        },
        function() {
            // Resume auto-scroll after hover ends
        }
    );
    
    // Manual scroll with mouse wheel
    achievementsGrid.on('wheel', function(e) {
        e.preventDefault();
        const delta = e.originalEvent.deltaY;
        const scrollAmount = delta > 0 ? 300 : -300;
        $(this).animate({ scrollLeft: $(this).scrollLeft() + scrollAmount }, 500);
    });
    
    educationGrid.on('wheel', function(e) {
        e.preventDefault();
        const delta = e.originalEvent.deltaY;
        const scrollAmount = delta > 0 ? 300 : -300;
        $(this).animate({ scrollLeft: $(this).scrollLeft() + scrollAmount }, 500);
    });
    
    // Touch/swipe support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    function handleMouseDown(e) {
        isDown = true;
        $(this).addClass('active');
        startX = e.pageX - $(this).offset().left;
        scrollLeft = $(this).scrollLeft();
    }
    
    function handleMouseLeave() {
        isDown = false;
        $(this).removeClass('active');
    }
    
    function handleMouseUp() {
        isDown = false;
        $(this).removeClass('active');
    }
    
    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - $(this).offset().left;
        const walk = (x - startX) * 2;
        $(this).scrollLeft(scrollLeft - walk);
    }
    
    // Add mouse events for desktop
    achievementsGrid.on('mousedown', handleMouseDown);
    achievementsGrid.on('mouseleave', handleMouseLeave);
    achievementsGrid.on('mouseup', handleMouseUp);
    achievementsGrid.on('mousemove', handleMouseMove);
    
    educationGrid.on('mousedown', handleMouseDown);
    educationGrid.on('mouseleave', handleMouseLeave);
    educationGrid.on('mouseup', handleMouseUp);
    educationGrid.on('mousemove', handleMouseMove);
});

// Fetch local data and update achievements section
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    updateAchievementsSection(data.achievements);
    updateSkillsSection(data.skills);
    updateStatsSection(data.stats);
  })
  .catch(error => {
    console.error('Error fetching local data:', error);
  });

function updateAchievementsSection(achievements) {
  const achievementsGrid = document.querySelector('.achievements-grid');
  if (!achievementsGrid) return;

  // Clear existing content
  achievementsGrid.innerHTML = '';

  // Add LeetCode achievement
  if (achievements.leetcode) {
    const leetcodeCard = createAchievementCard(
      'LeetCode Master',
      `${achievements.leetcode.totalSolved}+`,
      `Solved ${achievements.leetcode.totalSolved} problems with ${achievements.leetcode.streak} day streak`,
      'Problem Solving',
      'fas fa-code'
    );
    achievementsGrid.appendChild(leetcodeCard);
  }

  // Add GeeksforGeeks achievement
  if (achievements.geeksforgeeks) {
    const gfgCard = createAchievementCard(
      'GeeksforGeeks Expert',
      `${achievements.geeksforgeeks.totalSolved}+`,
      `Coding score: ${achievements.geeksforgeeks.codingScore} with ${achievements.geeksforgeeks.ranking} ranking`,
      'Advanced DSA',
      'fas fa-laptop-code'
    );
    achievementsGrid.appendChild(gfgCard);
  }

  // Add HackerRank achievement
  if (achievements.hackerrank) {
    const hackerrankCard = createAchievementCard(
      'HackerRank Certified',
      `${achievements.hackerrank.totalSolved}+`,
      `${achievements.hackerrank.certificates} certificates earned with ${achievements.hackerrank.ranking} ranking`,
      'Certifications',
      'fas fa-certificate'
    );
    achievementsGrid.appendChild(hackerrankCard);
  }

  // Add certifications
  if (achievements.certifications) {
    achievements.certifications.forEach(cert => {
      const certCard = createAchievementCard(
        cert.name,
        cert.issuer,
        `Certified in ${cert.date} with ID: ${cert.id}`,
        'Professional',
        'fas fa-shield-alt'
      );
      achievementsGrid.appendChild(certCard);
    });
  }
}

function createAchievementCard(title, number, description, badge, iconClass) {
        const card = document.createElement('div');
  card.className = 'achievement-card';
  
        card.innerHTML = `
    <div class="achievement-icon">
      <i class="${iconClass}"></i>
    </div>
    <div class="achievement-content">
      <h3>${title}</h3>
      <p class="achievement-number">${number}</p>
      <p class="achievement-description">${description}</p>
      <div class="achievement-badge">
        <span>${badge}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Remove SkillsManager class and related functions - using static skills instead

function updateSkillsSection(skills) {
  // Update skills section with dynamic data
  if (skills.programming) {
    const skillsDisplay = document.querySelector('.skills-display');
    if (skillsDisplay) {
      skillsDisplay.innerHTML = '';
      
      skills.programming.forEach(skill => {
        const skillProgress = document.createElement('div');
        skillProgress.className = 'skill-progress';
        
        const percentageClass = getPercentageClass(skill.level);
        const colorClass = getColorClass(skill.name);
        
        skillProgress.innerHTML = `
          <div class="${percentageClass} ${colorClass}">
            <div class="skill-name">
              <span>${skill.name} (${skill.years} years)</span>
            </div>
          </div>
        `;
        
        skillsDisplay.appendChild(skillProgress);
      });
    }
  }
}

function getPercentageClass(level) {
  if (level >= 90) return 'ninety-percent';
  if (level >= 85) return 'eighty-five-percent';
  if (level >= 80) return 'eighty-percent';
  if (level >= 75) return 'seventy-five-percent';
  return 'seventy-percent';
}

function getColorClass(skillName) {
  const colors = {
    'Java': 'mb-blue',
    'Python': 'mb-orange',
    'JavaScript': 'mb-light-purple',
    'C++': 'mb-teal',
    'React': 'mb-blue',
    'Spring Boot': 'mb-orange',
    'MySQL': 'mb-teal',
    'Docker': 'mb-light-purple'
  };
  return colors[skillName] || 'mb-blue';
}

function updateStatsSection(stats) {
  // Update any stats displays
  if (stats.github) {
    // Update GitHub stats if you have a stats section
    console.log('GitHub Stats:', stats.github);
  }
  
  if (stats.leetcode) {
    // Update LeetCode stats
    console.log('LeetCode Stats:', stats.leetcode);
  }
}

// Skills slider functionality
function initSkillsSlider() {
    const skillsContainer = document.querySelector('.skills-categories');
    if (!skillsContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    skillsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        skillsContainer.classList.add('active');
        startX = e.pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
    });

    skillsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        skillsContainer.classList.remove('active');
    });

    skillsContainer.addEventListener('mouseup', () => {
        isDown = false;
        skillsContainer.classList.remove('active');
    });

    skillsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - skillsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        skillsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    skillsContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        skillsContainer.classList.add('active');
        startX = e.touches[0].pageX - skillsContainer.offsetLeft;
        scrollLeft = skillsContainer.scrollLeft;
    });

    skillsContainer.addEventListener('touchend', () => {
        isDown = false;
        skillsContainer.classList.remove('active');
    });

    skillsContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - skillsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        skillsContainer.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll on hover (optional)
    let autoScrollInterval;
    
    skillsContainer.addEventListener('mouseenter', () => {
        autoScrollInterval = setInterval(() => {
            if (!isDown) {
                skillsContainer.scrollLeft += 1;
            }
        }, 30);
    });

    skillsContainer.addEventListener('mouseleave', () => {
        clearInterval(autoScrollInterval);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.skills-categories')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                skillsContainer.scrollLeft -= 300;
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                skillsContainer.scrollLeft += 300;
            }
        }
    });
}

// Initialize skills slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSkillsSlider();
    
    // Re-initialize if skills section is dynamically loaded
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const skillsContainer = document.querySelector('.skills-categories');
                if (skillsContainer && !skillsContainer.hasAttribute('data-slider-initialized')) {
                    skillsContainer.setAttribute('data-slider-initialized', 'true');
                    initSkillsSlider();
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
  });