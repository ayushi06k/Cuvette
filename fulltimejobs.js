document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            menuItems.forEach(i => {
                i.classList.remove('menu-item-active');
                i.classList.add('menu-item-inactive');
            });

            this.classList.add('menu-item-active');
            this.classList.remove('menu-item-inactive');

            const menuText = this.textContent.trim();

            if (menuText.includes('Fulltime Jobs')) {
                showJobs('fulltime');
                fetchFullTimeJobs();
            } else if (menuText.includes('Other Jobs')) {
                showJobs('other');
                fetchOtherJobs();
            } else if (menuText.includes('Applied')) {
                showJobs('applied');
                fetchAppliedJobs();
            }
        });
    });

   
    fetchFullTimeJobs();
});

function showJobs(type) {
    const mainContainer = document.querySelector('.main');
    const jobsContainer = document.getElementById('jobs');

    jobsContainer.innerHTML = '';

    const heading = mainContainer.querySelector('h1');
    if (type === 'fulltime') {
        heading.textContent = 'Fulltime Job Listings';
    } else if (type === 'other') {
        heading.textContent = 'Other Job Listings';
    } else if (type === 'applied') {
        heading.textContent = 'Applied Jobs';
    }
}


function fetchFullTimeJobs() {
    fetch("http://localhost:8000/api/jobs")
        .then(response => response.json())
        .then(data => {
            console.log("Full-time Jobs:", data);
            const jobContainer = document.getElementById("jobs");
            jobContainer.innerHTML = data.map(job => `
                <div class="job-card">
                    <div class="job-header">
                        <img src="https://media.licdn.com/dms/image/v2/D560BAQGyrX_NTRK3tA/company-logo_200_200/company-logo_200_200/0/1723487993653/chennaireact_logo?e=1750291200&v=beta&t=5Jgs3oUG-07pP6fU3HKCuf8GJ0-XPXGu80cSUcWGrCk" class="company-logo" alt="Company Logo">
                        <div>
                            <h3 class="job-title">${job.title}</h3>
                            <p class="company-name">${job.company} | ${job.location}</p>
                        </div>
                        <span class="job-type">In-Office</span>
                    </div>
                    <div class="skills">
                        <span>Python</span>
                        <span>PostgreSQL</span>
                        <span>AWS</span>
                    </div>
                    <div class="job-info">
                        <p>Salary: <strong>₹${job.salary}</strong></p>
                        <p> Start Date: Immediate</p>
                        <p> Openings: 2</p>
                        <p> Experience: 0-3 years</p>
                    </div>
                    <div class="job-footer">
                        <button class="view-details">View Details</button>
                        <button class="apply-now" data-link="${job.linkedin_url}">Apply Now</button>
                    </div>
                </div>
            `).join('');

            
            attachApplyButtonListeners();
        })
        .catch(error => {
            console.error("Error fetching full-time jobs:", error);
            document.getElementById("jobs").innerHTML = `
                <div class="error-message">
                    <p>Could not load job listings. Please try again later.</p>
                </div>
            `;
        });
}


function fetchOtherJobs() {
    fetch("http://localhost:8000/api/other_jobs")
        .then(response => response.json())
        .then(data => {
            console.log("Other Jobs:", data);
            const jobContainer = document.getElementById("jobs");
            jobContainer.innerHTML = data.map(job => `
                <div class="job-card">
                    <div class="job-header">
                        <img src="https://media.licdn.com/dms/image/v2/C4D0BAQGjIZfYnvVbCw/company-logo_200_200/company-logo_200_200/0/1657305138797/cloudx_software_development_logo?e=2147483647&v=beta&t=iOFht6vcahQhzPG7jUwFfXW5_F6xRzdvF7Gfnvh4n6o" class="company-logo" alt="Company Logo">
                        <div>
                            <h3 class="job-title">${job.title}</h3>
                            <p class="company-name">${job.company} | ${job.location}</p>
                        </div>
                        <span class="job-type">Remote</span>
                    </div>
                    <div class="skills">
                        <span>JavaScript</span>
                        <span>React</span>
                        <span>Node.js</span>
                    </div>
                    <div class="job-info">
                        <p> Salary: <strong>₹${job.salary}</strong></p>
                        <p> Start Date: Immediate</p>
                        <p> Openings: 2</p>
                        <p> Experience: 0-3 years</p>
                    </div>
                    <div class="job-footer">
                        <button class="view-details">View Details</button>
                        <button class="apply-now" data-link="${job.linkedin_url}">Apply Now</button>
                    </div>
                </div>
            `).join('');

           
            attachApplyButtonListeners();
        })
        .catch(error => {
            console.error("Error fetching other jobs:", error);
            document.getElementById("jobs").innerHTML = `
                <div class="error-message">
                    <p>Could not load other job listings. Please try again later.</p>
                </div>
            `;
        });
}


function attachApplyButtonListeners() {
    document.querySelectorAll(".apply-now").forEach(button => {
        button.addEventListener("click", (event) => {
            const jobLink = event.target.getAttribute("data-link");
            if (jobLink) {
                console.log("Opening LinkedIn link:", jobLink);
                window.open(jobLink, "_blank"); // Open in a new tab
            } else {
                alert("No LinkedIn link available for this job.");
            }
        });
    });
}


function fetchAppliedJobs() {
    document.getElementById("jobs").innerHTML = `
        <div class="info-message">
            <p>Your applied jobs will appear here.</p>
        </div>
    `;
}

  