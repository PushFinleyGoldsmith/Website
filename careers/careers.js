const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1462898569685237994/VqFLn5Zcy073kfBj4S8nuGFNsxvOOHKefwxKnxdjl9IRLtCAPJWgo1LVrn5qy0ivAXPv";

const jobs = [
  {
    id: 1,
    title: "Customer Support Team",
    desc: "Help our community succeed by providing fast, friendly support and ensuring users get the most out of Push.",
    tag: "Customer Service",
    resp: [
      "Respond to customer inquiries via support tickets, and live chat.",
      "Resolve user issues quickly and efficiently.",
      "Maintain a high standard of customer satisfaction."
    ],
    req: [
      "Strong communication skills and empathy.",
      "Experience in customer support or customer success.",
      "Ability to troubleshoot and solve problems quickly."
    ]
  },
  {
    id: 2,
    title: "Marketing Team",
    desc: "Drive brand growth through creative campaigns, engaging content, and strategic marketing initiatives.",
    tag: "Marketing",
    resp: [
      "Develop and execute marketing campaigns.",
      "Create engaging content for social media and blogs.",
      "Manage influencer partnerships and collaborations."
    ],
    req: [
      "Experience in digital marketing or content creation.",
      "Strong writing and communication skills.",
      "Knowledge of social media trends and tools."
    ]
  },
  {
    id: 3,
    title: "Frontend Developer",
    desc: "Build and maintain Push’s core product features, ensuring a smooth, high-performance experience for users.",
    tag: "Development",
    resp: [
      "Build and maintain the Push app features.",
      "Write clean, scalable code and follow best practices.",
      "Collaborate with designers and product managers."
    ],
    req: [
      "Experience with React Native & React",
      "Strong knowledge of JavaScript & TypeScript",
      "Ability to work independently and in a team."
    ]
  }
];

const jobsGrid = document.getElementById("jobsGrid");
jobs.forEach(job => {
  const card = document.createElement("div");
  card.classList.add("job-card");
  card.innerHTML = `
    <h3>${job.title}</h3>
    <p>${job.desc}</p>
    <span class="job-tag">${job.tag}</span>
  `;
  card.addEventListener("click", () => openJob(job));
  jobsGrid.appendChild(card);
});

const modal = document.getElementById("jobModal");
const modalClose = document.getElementById("modalClose");
const jobTitle = document.getElementById("jobTitle");
const jobDesc = document.getElementById("jobDesc");
const jobResp = document.getElementById("jobResp");
const jobReq = document.getElementById("jobReq");

function openJob(job) {
  jobTitle.textContent = job.title;
  jobDesc.textContent = job.desc;

  jobResp.innerHTML = "";
  jobReq.innerHTML = "";

  job.resp.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    jobResp.appendChild(li);
  });

  job.req.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    jobReq.appendChild(li);
  });

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeJob() {
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeJob);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeJob();
});

document.getElementById("applyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const submitBtn = e.target.querySelector("button");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  showModernNotification();

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "Application",
            fields: [
              { name: "Role", value: jobTitle.textContent },
              { name: "Name", value: formData.get("name"), inline: true },
              { name: "Email", value: formData.get("email"), inline: true },
              { name: "Discord", value: formData.get("discord"), inline: true },
              { name: "Message", value: formData.get("message") || "—" }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      })
    });

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";

  } catch (err) {
    alert("Failed to submit application.");
    console.error(err);
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Application";
  }
});


function showModernNotification() {
  const modalOverlay = document.getElementById("jobModal");
  const modalContent = document.querySelector(".modal");

  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `
    <div class="notification-icon">✓</div>
    <h3>Application submitted</h3>
    <p>Thanks for applying — we’ll be in touch soon.</p>
  `;

  modalContent.appendChild(notification);

  modalContent.classList.add("notification-mode");
  notification.classList.add("show");

  setTimeout(() => {
    modalOverlay.classList.add("closing");

    setTimeout(() => {
      notification.remove();
      modalContent.classList.remove("notification-mode");
      modalOverlay.classList.remove("closing");

      document.getElementById("applyForm").reset();
      closeJob();
    }, 600);

  }, 1800);
}




const openJobsBtn = document.getElementById("openJobsBtn");
if (openJobsBtn) {
  openJobsBtn.addEventListener("click", () => {
    document.getElementById("jobsSection")
      .scrollIntoView({ behavior: "smooth" });
  });
}


const scrollElements = document.querySelectorAll(
  ".jobs-section, .jobs-grid, .job-card"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

scrollElements.forEach(el => el.classList.add("scroll-reveal"));
scrollElements.forEach(el => observer.observe(el));

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".careers-hero").classList.add("active");
});
