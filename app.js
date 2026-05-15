const accountModal = document.querySelector("#accountModal");
const profilePromptModal = document.querySelector("#profilePromptModal");
const profileModal = document.querySelector("#profileModal");
const bizmatchModal = document.querySelector("#bizmatchModal");
const goalModal = document.querySelector("#goalModal");
const accountForm = document.querySelector("#accountForm");
const profileForm = document.querySelector("#profileForm");
const manualFields = document.querySelector("#manualFields");
const profilePreview = document.querySelector("#profilePreview");
const guestActions = document.querySelector("#guestActions");
const signedInChip = document.querySelector("#signedInChip");
const signedInEmail = document.querySelector("#signedInEmail");
const quizContent = document.querySelector("#quizContent");
const quizProgress = document.querySelector("#quizProgress");
const internshipForm = document.querySelector("#internshipForm");
const academicForm = document.querySelector("#academicForm");
const internshipResults = document.querySelector("#internshipResults");
const academicResults = document.querySelector("#academicResults");

const state = {
  accountMode: "create",
  currentUser: JSON.parse(localStorage.getItem("careerlift.currentUser") || "null"),
  quizStep: 0,
  quizAnswers: {},
};

const quizQuestions = [
  {
    key: "entry",
    title: "Start simple.",
    helper: "Pick a starting point.",
    type: "choice",
    options: ["Popular category", "Build from scratch"],
  },
  {
    key: "category",
    title: "Choose a lane.",
    helper: "What feels closest?",
    type: "choice",
    options: ["Dropshipping", "Clothing brand", "Reselling", "Web services", "Local services"],
    show: answers => answers.entry === "Popular category",
  },
  {
    key: "model",
    title: "What are you making?",
    helper: "Keep it broad.",
    type: "choice",
    options: ["Product", "Service", "Digital/App"],
    show: answers => answers.entry === "Build from scratch",
  },
  {
    key: "format",
    title: "Pick the format.",
    helper: "This narrows the idea.",
    type: "choice",
    options: ["Physical good", "Reselling", "Digital download", "Local", "Remote", "SaaS", "Content", "Marketplace"],
    show: answers => answers.entry === "Build from scratch",
  },
  {
    key: "budget",
    title: "Starting budget?",
    helper: "Be realistic.",
    type: "choice",
    options: ["Under $500", "$500-$2k", "$2k-$5k", "$5k-$10k", "$10k+"],
  },
  {
    key: "hours",
    title: "Hours each week?",
    helper: "Your time matters.",
    type: "choice",
    options: ["Under 10", "10-20", "20-30", "30-40", "Full-time"],
  },
  {
    key: "team",
    title: "Solo or team?",
    helper: "Who is building?",
    type: "choice",
    options: ["Solo", "Small team", "Co-founder", "Still unsure"],
  },
  {
    key: "place",
    title: "Where do you work?",
    helper: "Online, nearby, or both.",
    type: "choice",
    options: ["Online", "In-person", "Both"],
  },
  {
    key: "strength",
    title: "Biggest strength?",
    helper: "Choose your edge.",
    type: "choice",
    options: ["Sales", "Creative", "Tech", "Operations", "People"],
  },
  {
    key: "risk",
    title: "Risk comfort?",
    helper: "Slide your comfort level.",
    type: "range",
    min: 1,
    max: 5,
  },
  {
    key: "network",
    title: "Existing audience?",
    helper: "Any network helps.",
    type: "choice",
    options: ["Large", "Small", "Starting from zero"],
  },
  {
    key: "priority",
    title: "What matters most?",
    helper: "Pick the top priority.",
    type: "choice",
    options: ["Income ASAP", "Long-term brand", "Flexibility", "Impact"],
  },
  {
    key: "passions",
    title: "Favorite niches?",
    helper: "List hobbies or interests.",
    type: "text",
    placeholder: "Fitness, fashion, gaming, tutoring...",
  },
  {
    key: "avoid",
    title: "Avoid anything?",
    helper: "Tell us what not to suggest.",
    type: "text",
    placeholder: "No cold calling, no inventory...",
  },
  {
    key: "followup",
    title: "One more detail.",
    helper: "What do friends ask you for?",
    type: "text",
    placeholder: "Advice, designs, edits, planning...",
  },
];

const internships = [
  {
    company: "Irvine Startup Lab",
    industry: "Technology",
    specialty: "Product research",
    location: "Irvine",
    hours: 12,
    dates: "June-August",
    source: "LinkedIn",
  },
  {
    company: "Pacific Brand Studio",
    industry: "Marketing",
    specialty: "Social media",
    location: "Costa Mesa",
    hours: 15,
    dates: "Flexible summer",
    source: "Indeed",
  },
  {
    company: "Hoag Student Pathways",
    industry: "Healthcare",
    specialty: "Patient experience",
    location: "Newport Beach",
    hours: 10,
    dates: "July-September",
    source: "Hospital careers page",
  },
  {
    company: "OC Education Partners",
    industry: "Education",
    specialty: "Program support",
    location: "Santa Ana",
    hours: 8,
    dates: "Fall semester",
    source: "ZipRecruiter",
  },
  {
    company: "North OC Robotics",
    industry: "Engineering",
    specialty: "Prototype testing",
    location: "Fullerton",
    hours: 20,
    dates: "June-August",
    source: "Indeed",
  },
  {
    company: "Harbor Wealth Group",
    industry: "Finance",
    specialty: "Client analysis",
    location: "Newport Beach",
    hours: 16,
    dates: "Summer cohort",
    source: "LinkedIn",
  },
  {
    company: "Civic Youth Legal Clinic",
    industry: "Law",
    specialty: "Case intake",
    location: "Orange",
    hours: 10,
    dates: "Rolling",
    source: "Organization website",
  },
  {
    company: "Anaheim Growth Collective",
    industry: "Sales",
    specialty: "Partnership outreach",
    location: "Anaheim",
    hours: 18,
    dates: "June-September",
    source: "ZipRecruiter",
  },
  {
    company: "Coastline Creative",
    industry: "Design",
    specialty: "Visual design",
    location: "Huntington Beach",
    hours: 14,
    dates: "Flexible",
    source: "LinkedIn",
  },
  {
    company: "OC Community Builders",
    industry: "Nonprofit",
    specialty: "Volunteer programs",
    location: "Santa Ana",
    hours: 12,
    dates: "Fall semester",
    source: "Idealist",
  },
];

const academicPrograms = [
  {
    name: "UCI Division of Continuing Education Summer Program",
    specialty: "Business",
    location: "Irvine",
    format: "In person",
    hours: 12,
    source: "UCI program directory",
    prestige: 92,
  },
  {
    name: "UCI Undergraduate Research Opportunities",
    specialty: "Research",
    location: "Irvine",
    format: "In person",
    hours: 8,
    source: "UCI research office",
    prestige: 95,
  },
  {
    name: "Stanford Pre-Collegiate Online",
    specialty: "Computer Science",
    location: "Online",
    format: "Online",
    hours: 10,
    source: "Stanford online programs",
    prestige: 98,
  },
  {
    name: "Harvard Summer School Online",
    specialty: "Public Policy",
    location: "Online",
    format: "Online",
    hours: 15,
    source: "Harvard Summer School",
    prestige: 99,
  },
  {
    name: "MIT Beaver Works Summer Institute",
    specialty: "Engineering",
    location: "Online",
    format: "Online",
    hours: 20,
    source: "MIT program site",
    prestige: 99,
  },
  {
    name: "CHOC Health Scholars Track",
    specialty: "Medicine",
    location: "Orange",
    format: "In person",
    hours: 10,
    source: "CHOC opportunities page",
    prestige: 90,
  },
  {
    name: "Chapman Pre-Law Exploration",
    specialty: "Law",
    location: "Orange",
    format: "In person",
    hours: 6,
    source: "Chapman events directory",
    prestige: 82,
  },
  {
    name: "ArtCenter Extension Online",
    specialty: "Design",
    location: "Online",
    format: "Online",
    hours: 8,
    source: "ArtCenter Extension",
    prestige: 86,
  },
];

function getVisibleQuestions() {
  return quizQuestions.filter(question => !question.show || question.show(state.quizAnswers));
}

function saveCurrentUser(user) {
  state.currentUser = user;
  localStorage.setItem("careerlift.currentUser", JSON.stringify(user));
  updateAccountUi();
  updateProfilePreview();
}

function updateAccountUi() {
  if (state.currentUser) {
    guestActions.classList.add("hidden");
    signedInChip.classList.remove("hidden");
    signedInEmail.textContent = state.currentUser.email;
    return;
  }
  guestActions.classList.remove("hidden");
  signedInChip.classList.add("hidden");
}

function updateProfilePreview() {
  if (!state.currentUser?.profile) {
    profilePreview.innerHTML = `
      <h3>Your saved profile</h3>
      <p>No profile saved yet.</p>
      <button class="solid-button" type="button" data-open-profile>Add information</button>
    `;
    wireProfileButtons();
    return;
  }

  const profile = state.currentUser.profile;
  const rows = [
    ["Grade", profile.grade],
    ["GPA", profile.gpa],
    ["Work", profile.work],
    ["Internships", profile.internships],
    ["Activities", profile.activities],
  ].filter(([, value]) => value);

  profilePreview.innerHTML = `
    <h3>Your saved profile</h3>
    <div class="profile-list">
      ${rows.map(([label, value]) => `<span><strong>${label}:</strong> ${value}</span>`).join("") || "<span>Resume uploaded.</span>"}
    </div>
    <button class="solid-button" type="button" data-open-profile>Edit information</button>
  `;
  wireProfileButtons();
}

function openAccount(mode) {
  state.accountMode = mode;
  document.querySelector("#accountModeLabel").textContent = mode === "create" ? "Create account" : "Welcome back";
  document.querySelector("#accountTitle").textContent = mode === "create" ? "Start your profile." : "Log in.";
  document.querySelector("#accountSubmit").textContent = mode === "create" ? "Create account" : "Log in";
  document.querySelector("#toggleAccountMode").textContent = mode === "create" ? "Already have one? Log in" : "Need an account? Create one";
  if (!accountModal.open) accountModal.showModal();
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
}

function wireProfileButtons() {
  document.querySelectorAll("[data-open-profile]").forEach(button => {
    button.addEventListener("click", () => {
      closeDialog(profilePromptModal);
      profileModal.showModal();
    });
  });
}

function renderQuiz() {
  const questions = getVisibleQuestions();
  const question = questions[state.quizStep];
  const progress = Math.round((state.quizStep / questions.length) * 100);
  quizProgress.style.width = `${Math.max(6, progress)}%`;

  if (!question) {
    renderResults();
    return;
  }

  const body = question.type === "choice"
    ? `<div class="choice-grid">${question.options.map(option => `<button type="button" data-answer="${option}">${option}</button>`).join("")}</div>`
    : question.type === "range"
      ? `
        <div class="range-wrap">
          <input type="range" min="${question.min}" max="${question.max}" value="3" id="riskRange" />
          <div class="range-labels"><span>Safe</span><span>Medium</span><span>Risky</span></div>
          <button class="solid-button" type="button" data-save-range>Continue</button>
        </div>
      `
      : `
        <textarea class="quiz-textarea" id="textAnswer" placeholder="${question.placeholder || ""}"></textarea>
        <button class="solid-button" type="button" data-save-text>Continue</button>
      `;

  quizContent.innerHTML = `
    <p class="eyebrow">${question.helper}</p>
    <h2 class="question-title">${question.title}</h2>
    ${body}
  `;

  quizContent.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => nextQuestion(question.key, button.dataset.answer));
  });

  quizContent.querySelector("[data-save-range]")?.addEventListener("click", () => {
    nextQuestion(question.key, document.querySelector("#riskRange").value);
  });

  quizContent.querySelector("[data-save-text]")?.addEventListener("click", () => {
    nextQuestion(question.key, document.querySelector("#textAnswer").value.trim() || "No preference");
  });
}

function nextQuestion(key, value) {
  state.quizAnswers[key] = value;
  state.quizStep += 1;
  renderQuiz();
}

function renderResults() {
  quizProgress.style.width = "100%";
  const answers = state.quizAnswers;
  const ideas = buildBusinessIdeas(answers);

  quizContent.innerHTML = `
    <p class="eyebrow">Your BizMatch results</p>
    <h2 class="question-title">Three ideas to test.</h2>
    <div class="results-grid">
      ${ideas.map((idea, index) => `
        <article class="result-card">
          <div class="result-topline">
            <span>Match ${index + 1}</span>
            <strong>${idea.difficulty}</strong>
          </div>
          <h3>${idea.title}</h3>
          <p>${idea.summary}</p>
          <div class="fit-note">${idea.fit}</div>
          <dl class="idea-metrics">
            <div><dt>Cost</dt><dd>${idea.cost}</dd></div>
            <div><dt>First customer</dt><dd>${idea.firstCustomer}</dd></div>
            <div><dt>Channel</dt><dd>${idea.channel}</dd></div>
          </dl>
          <div class="action-steps">
            <strong>First 3 steps</strong>
            <ol>${idea.steps.map(step => `<li>${step}</li>`).join("")}</ol>
          </div>
          <p><strong>Monetization:</strong> ${idea.monetization}</p>
          <div class="timeline-ui">
            <div><span>Week 1</span><p>${idea.roadmap.week}</p></div>
            <div><span>Month 1</span><p>${idea.roadmap.monthOne}</p></div>
            <div><span>Month 3</span><p>${idea.roadmap.monthThree}</p></div>
          </div>
          <button class="ghost-button" type="button" data-elaborate="${idea.title}">Elaborate</button>
        </article>
      `).join("")}
    </div>
    <div class="idea-box">
      <p><strong>Not satisfied with the results?</strong></p>
      <div class="button-row">
        <button class="solid-button" type="button" data-reset-quiz>Redo questionnaire</button>
        <button class="ghost-button" type="button" data-own-idea>Enter my idea</button>
      </div>
    </div>
  `;

  quizContent.querySelectorAll("[data-elaborate]").forEach(button => {
    button.addEventListener("click", () => renderBizChat(button.dataset.elaborate));
  });

  quizContent.querySelector("[data-reset-quiz]").addEventListener("click", startBizMatch);
  quizContent.querySelector("[data-own-idea]").addEventListener("click", () => {
    quizContent.innerHTML = `
      <p class="eyebrow">Your idea</p>
      <h2 class="question-title">Tell us the draft.</h2>
      <textarea class="quiz-textarea" placeholder="Write your idea here."></textarea>
      <button class="solid-button" type="button" data-save-own-idea>Save idea</button>
    `;
    quizContent.querySelector("[data-save-own-idea]").addEventListener("click", () => {
      closeDialog(bizmatchModal);
    });
  });
}

function renderBizChat(ideaTitle) {
  quizContent.innerHTML = `
    <p class="eyebrow">AI mentor simulation</p>
    <h2 class="question-title">${ideaTitle}</h2>
    <div class="chat-box" id="bizChat">
      <div class="chat-message ai">I can help you turn this into a first test.</div>
    </div>
    <div class="prompt-row">
      <button class="ghost-button" type="button" data-chat-prompt="What should I do first?">First move</button>
      <button class="ghost-button" type="button" data-chat-prompt="How could I get customers?">Customers</button>
      <button class="ghost-button" type="button" data-chat-prompt="What skills do I need?">Skills</button>
      <button class="ghost-button" type="button" data-chat-prompt="What mistakes should I avoid?">Mistakes</button>
      <button class="ghost-button" type="button" data-chat-prompt="Could this work while in school?">In school</button>
    </div>
    <form class="chat-form" id="bizChatForm">
      <input name="question" placeholder="Ask a follow-up..." autocomplete="off" />
      <button class="solid-button" type="submit">Ask</button>
    </form>
    <button class="link-button" type="button" data-back-results>Back to results</button>
  `;

  quizContent.querySelectorAll("[data-chat-prompt]").forEach(button => {
    button.addEventListener("click", () => addChatReply(ideaTitle, button.dataset.chatPrompt));
  });

  quizContent.querySelector("#bizChatForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = event.currentTarget.elements.question;
    const question = input.value.trim();
    if (!question) return;
    addChatReply(ideaTitle, question);
    input.value = "";
  });

  quizContent.querySelector("[data-back-results]").addEventListener("click", renderResults);
}

function addChatReply(ideaTitle, question) {
  const chat = quizContent.querySelector("#bizChat");
  chat.insertAdjacentHTML("beforeend", `
    <div class="chat-message user">${question}</div>
    <div class="chat-message ai typing-message"><span></span><span></span><span></span></div>
  `);
  chat.scrollTop = chat.scrollHeight;
  window.setTimeout(() => {
    const typing = chat.querySelector(".typing-message");
    if (!typing) return;
    typing.classList.remove("typing-message");
    typing.textContent = getBizAnswer(ideaTitle, question);
    chat.scrollTop = chat.scrollHeight;
  }, 520);
}

function getBizAnswer(ideaTitle, question) {
  const lower = question.toLowerCase();
  if (lower.includes("first")) {
    return `Start by writing one tiny offer for ${ideaTitle}. Then ask five people if they would pay for it.`;
  }
  if (lower.includes("customer")) {
    return "Begin with people already near you: classmates, parents, local groups, and club leaders. Ask for a short problem interview.";
  }
  if (lower.includes("skill")) {
    return "You mainly need outreach, simple project planning, and clear communication. Build the advanced skills only after demand is real.";
  }
  if (lower.includes("mistake")) {
    return "Avoid building a full brand before talking to customers. Test the offer first, then polish.";
  }
  if (lower.includes("school")) {
    return "Yes. Keep it small: two outreach blocks each week, one weekend work session, and one visible portfolio update.";
  }
  return "Make the next step smaller. A strong first move is one offer, one audience, and five honest conversations.";
}

function buildBusinessIdeas(answers) {
  const rawInterest = answers.passions || "student life";
  const niche = rawInterest.split(",")[0].trim() || "student life";
  const strength = answers.strength || "People";
  const budget = answers.budget || "Under $500";
  const hours = answers.hours || "10-20";
  const place = answers.place || "Both";
  const priority = answers.priority || "Flexibility";
  const channel = place === "In-person" ? "campus clubs and local flyers" : place === "Online" ? "TikTok, Discord, and referrals" : "Instagram, campus groups, and referrals";

  return [
    {
      title: `${capitalize(niche)} Starter Concierge`,
      summary: `A small service helping busy students solve one ${niche.toLowerCase()} problem.`,
      fit: `Fits your ${strength.toLowerCase()} strength, ${hours.toLowerCase()} schedule, and ${priority.toLowerCase()} goal.`,
      difficulty: "Low-medium",
      cost: budget.includes("500") ? "$50-$200" : "$100-$500",
      firstCustomer: "7-14 days",
      channel,
      monetization: "Charge a fixed starter package, then add monthly support.",
      steps: ["Pick one student problem.", "Message 10 possible buyers.", "Offer a simple paid pilot."],
      roadmap: {
        week: "Interview five students and write one offer.",
        monthOne: "Complete three paid pilots and collect proof.",
        monthThree: "Turn results into a small portfolio page.",
      },
    },
    {
      title: `${strength} Micro-Studio`,
      summary: `A beginner-friendly studio selling one useful outcome to local students or small businesses.`,
      fit: `This uses your ${strength.toLowerCase()} edge without needing a large team.`,
      difficulty: "Medium",
      cost: "$0-$300",
      firstCustomer: "2-3 weeks",
      channel,
      monetization: "Sell one-time projects, then upsell maintenance.",
      steps: ["Choose one deliverable.", "Create a before-and-after sample.", "Pitch 15 local leads."],
      roadmap: {
        week: "Build one sample project.",
        monthOne: "Land one testimonial and refine pricing.",
        monthThree: "Create a repeatable package.",
      },
    },
    {
      title: `${capitalize(niche)} Resource Kit`,
      summary: `A digital toolkit that saves beginners time in a niche you already understand.`,
      fit: `Good for ${place.toLowerCase()} work and a flexible student schedule.`,
      difficulty: "Low",
      cost: "$0-$100",
      firstCustomer: "1-3 weeks",
      channel: "TikTok, Reddit, Discord, and niche newsletters",
      monetization: "Sell templates, guides, or a low-cost bundle.",
      steps: ["List repeated questions in the niche.", "Make one useful template.", "Post a free preview."],
      roadmap: {
        week: "Draft the first template and test the title.",
        monthOne: "Publish a small bundle and gather feedback.",
        monthThree: "Add examples, videos, and a second product.",
      },
    },
  ];
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function populateHours() {
  const select = document.querySelector("#internshipHours");
  select.innerHTML = "";
  const ranges = [
    { value: "10", label: "0-10 hours" },
    { value: "20", label: "10-20 hours" },
    { value: "30", label: "20-30 hours" },
    { value: "40", label: "30-40 hours" },
    { value: "80", label: "40+ hours" },
  ];
  ranges.forEach(range => {
    const option = document.createElement("option");
    option.value = range.value;
    option.textContent = range.label;
    if (range.value === "20") option.selected = true;
    select.append(option);
  });
}

function renderInternships(matches) {
  if (!matches.length) {
    internshipResults.innerHTML = `<p class="empty-note">No close matches yet. Try more cities or hours.</p>`;
    return;
  }

  internshipResults.innerHTML = matches.map(item => `
    <article class="listing-card">
      <div>
        <p class="eyebrow">${item.source}</p>
        <h3>${item.company}</h3>
        <p>${item.specialty} internship in ${item.location}.</p>
      </div>
      <dl>
        <div><dt>Hours</dt><dd>${item.hours}/week</dd></div>
        <div><dt>Dates</dt><dd>${item.dates}</dd></div>
        <div><dt>Field</dt><dd>${item.industry}</dd></div>
      </dl>
    </article>
  `).join("");
}

function renderAcademicPrograms(matches) {
  if (!matches.length) {
    academicResults.innerHTML = `<p class="empty-note">No close programs yet. Try a broader format.</p>`;
    return;
  }

  academicResults.innerHTML = matches.map(item => `
    <article class="listing-card">
      <div>
        <p class="eyebrow">${item.source}</p>
        <h3>${item.name}</h3>
        <p>${item.specialty} program held ${item.format.toLowerCase()} in ${item.location}.</p>
      </div>
      <dl>
        <div><dt>Hours</dt><dd>${item.hours}/week</dd></div>
        <div><dt>Prestige</dt><dd>${item.prestige}/100</dd></div>
        <div><dt>Specialty</dt><dd>${item.specialty}</dd></div>
      </dl>
    </article>
  `).join("");
}

function startBizMatch() {
  state.quizStep = 0;
  state.quizAnswers = {};
  bizmatchModal.showModal();
  renderQuiz();
}

document.querySelectorAll("[data-open-account]").forEach(button => {
  button.addEventListener("click", () => openAccount("create"));
});

document.querySelectorAll("[data-open-login]").forEach(button => {
  button.addEventListener("click", () => openAccount("login"));
});

document.querySelector("#toggleAccountMode").addEventListener("click", () => {
  openAccount(state.accountMode === "create" ? "login" : "create");
});

accountForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(accountForm);
  const user = {
    email: formData.get("email"),
    profile: state.currentUser?.profile || null,
  };
  saveCurrentUser(user);
  closeDialog(accountModal);
  if (state.accountMode === "create") {
    profilePromptModal.showModal();
  }
  accountForm.reset();
});

document.querySelector("[data-sign-out]").addEventListener("click", () => {
  state.currentUser = null;
  localStorage.removeItem("careerlift.currentUser");
  updateAccountUi();
  updateProfilePreview();
});

document.querySelectorAll("[data-close-profile-prompt]").forEach(button => {
  button.addEventListener("click", () => closeDialog(profilePromptModal));
});

document.querySelector("[data-show-manual]").addEventListener("click", () => {
  manualFields.classList.toggle("hidden");
});

profileForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(profileForm);
  const profile = Object.fromEntries(formData.entries());
  const resume = profileForm.querySelector("[name='resume']").files[0];
  if (resume) profile.resume = resume.name;
  saveCurrentUser({
    ...(state.currentUser || { email: "guest@careerlift.local" }),
    profile,
  });
  closeDialog(profileModal);
});

document.querySelectorAll("[data-start-bizmatch]").forEach(button => {
  button.addEventListener("click", startBizMatch);
});

document.querySelector("[data-close-bizmatch]").addEventListener("click", () => closeDialog(bizmatchModal));

document.querySelectorAll("[data-open-goal]").forEach(button => {
  button.addEventListener("click", () => goalModal.showModal());
});

document.querySelectorAll("[data-goal]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector("#goalOutput").textContent = `${button.dataset.goal} path saved.`;
  });
});

internshipForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(internshipForm);
  const industry = formData.get("industry");
  const hours = Number(formData.get("hours"));
  const cities = formData.getAll("cities");
  const matches = internships
    .filter(item => item.industry === industry)
    .filter(item => cities.includes(item.location))
    .filter(item => item.hours <= hours)
    .sort((a, b) => b.hours - a.hours);
  renderInternships(matches);
});

academicForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(academicForm);
  const interest = formData.get("interest");
  const format = formData.get("format");
  const matches = academicPrograms
    .map(item => ({
      ...item,
      fit: item.specialty === interest ? item.prestige + 20 : item.prestige,
    }))
    .filter(item => format === "Any" || item.format === format)
    .sort((a, b) => b.fit - a.fit)
    .slice(0, 5);
  renderAcademicPrograms(matches);
});

populateHours();
updateAccountUi();
updateProfilePreview();
wireProfileButtons();
