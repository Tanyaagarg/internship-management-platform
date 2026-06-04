/* ==========================================
   NexusIntern Reactive Client State Engine
   ========================================== */

// 1. Database State Mock (using Indian names and dynamic properties)
const state = {
    activeRole: 'student', // 'student' | 'mentor' | 'admin'
    selectedIntern: 'Ananya Sharma',
    
    // Cohort Interns
    interns: {
        'Ananya Sharma': {
            name: 'Ananya Sharma',
            university: 'Delhi Technological University (DTU)',
            track: 'Engineering Intern 2026',
            mentor: 'Amit Verma',
            designation: 'Senior Cloud Architect'
        },
        'Kabir Malhotra': {
            name: 'Kabir Malhotra',
            university: 'NID Ahmedabad',
            track: 'UI/UX Design Intern 2026',
            mentor: 'Neha Kapoor',
            designation: 'Lead Product Designer'
        }
    },

    // Tasks database (with Indian names)
    tasks: [
        // Ananya Sharma Tasks
        { id: 1, title: 'Configure Repository & Linting', desc: 'Initialize project codebase, configure ESLint, Prettier, and git hook scripts.', priority: 'Low', status: 'done', intern: 'Ananya Sharma' },
        { id: 2, title: 'Draft CSS Utility Core', desc: 'Create design tokens, colors variables, utility classes, and custom scrollbar setups.', priority: 'Medium', status: 'done', intern: 'Ananya Sharma' },
        { id: 3, title: 'Construct Navbar Shell', desc: 'Assemble headers, navigation elements, responsive hamburger bars, and profile badges.', priority: 'Medium', status: 'done', intern: 'Ananya Sharma' },
        { id: 4, title: 'Design Landing Page Banner', desc: 'Construct grid layouts, typography styling, and beautiful glassmorphic headers.', priority: 'High', status: 'done', intern: 'Ananya Sharma' },
        { id: 5, title: 'Integrate Routing State API', desc: 'Implement frontend routers to toggle page screens and load sidebar states dynamically.', priority: 'High', status: 'todo', intern: 'Ananya Sharma' },
        { id: 6, title: 'Connect App Mock Database', desc: 'Bind UI components with reactive state variables and storage events.', priority: 'Medium', status: 'progress', intern: 'Ananya Sharma' },
        
        // Kabir Malhotra Tasks
        { id: 7, title: 'Create Competitor Audit Sheet', desc: 'Analyze competitor portals, highlight gaps, and compile a feature grid summary.', priority: 'Low', status: 'done', intern: 'Kabir Malhotra' },
        { id: 8, title: 'Construct User Personas', desc: 'Formulate user profiles for Student, Mentor, and Admin roles based on initial interviews.', priority: 'High', status: 'progress', intern: 'Kabir Malhotra' },
        { id: 9, title: 'Wireframe Dashboard Flow', desc: 'Create interactive low-fidelity layouts for main panels in Figma.', priority: 'Medium', status: 'todo', intern: 'Kabir Malhotra' }
    ],

    // Submissions pending mentor review
    reviews: [
        { id: 101, title: 'Week 4 Report: CSS Layout Systems', desc: 'Documentation of all global styling modules, responsive design cards, and browser inspect results.', type: 'log', time: 'Yesterday, 4:10 PM', intern: 'Ananya Sharma' }
    ],

    // Unmatched pools for Admin matching
    unmatchedStudents: [
        { name: 'Rohan Mehta', track: 'Web Development', school: 'IIT Bombay' },
        { name: 'Priya Nair', track: 'Data Science', school: 'BITS Pilani' }
    ],
    availableMentors: [
        { name: 'Sanjay Rao', track: 'Web Development Lead', company: 'Xebia India' },
        { name: 'Deepika Sen', track: 'Chief Data Scientist', company: 'Xebia India' }
    ]
};

// Sidebar Configuration per Role
const sidebarConfigs = {
    student: [
        { name: 'Overview', icon: 'layout-dashboard', target: 'student-section' },
        { name: 'My Tasks', icon: 'kanban', target: 'student-section' },
        { name: 'Milestones', icon: 'milestone', target: 'student-section' },
        { name: 'Submit Report', icon: 'clipboard-list', target: 'student-section' }
    ],
    mentor: [
        { name: 'Dashboard', icon: 'users', target: 'mentor-section' },
        { name: 'Review Queue', icon: 'inbox', target: 'mentor-section' },
        { name: 'Assign Tasks', icon: 'plus-circle', target: 'mentor-section' },
        { name: 'Appraisals', icon: 'bar-chart-2', target: 'mentor-section' }
    ],
    admin: [
        { name: 'Console Home', icon: 'shield', target: 'admin-section' },
        { name: 'Matchmaking', icon: 'shuffle', target: 'admin-section' },
        { name: 'Certificates', icon: 'award', target: 'admin-section' }
    ]
};

// User identity mappings
const userIdentities = {
    student: { name: 'Ananya Sharma', sub: 'Student Intern', avatar: 'A' },
    mentor: { name: 'Amit Verma', sub: 'Senior Supervisor', avatar: 'AV' },
    admin: { name: 'Tanya Garg', sub: 'University Admin', avatar: 'TG' }
};

// 2. Initialize App Events & Renders
document.addEventListener('DOMContentLoaded', () => {
    setupRoleDropdown();
    setupThemeToggle();
    setupForms();
    renderSidebar();
    renderAllViews();
});

// Role Switcher Setup
function setupRoleDropdown() {
    const dropdown = document.getElementById('roleDropdown');
    const btn = document.getElementById('activeRoleBtn');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });

    document.querySelectorAll('.role-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const role = option.getAttribute('data-role');
            switchRole(role);
            dropdown.classList.remove('open');
        });
    });
}

function switchRole(role) {
    state.activeRole = role;

    // Toggle dropdown button representation
    const activeRoleBtn = document.getElementById('activeRoleBtn');
    const dotSpan = activeRoleBtn.querySelector('.role-indicator');
    const nameSpan = activeRoleBtn.querySelector('.role-name');

    dotSpan.className = `role-indicator ${role}-dot`;
    nameSpan.textContent = role === 'student' ? 'Student (Intern)' :
                           role === 'mentor' ? 'Mentor (Supervisor)' : 'Administrator';

    // Update Header Avatar & Identity
    const id = userIdentities[role];
    const headerAvatar = document.getElementById('headerAvatar');
    const headerUserName = document.getElementById('headerUserName');
    const headerUserSub = document.getElementById('headerUserSub');

    // Default student profile mapping on switch
    if (role === 'student') {
        const studentInfo = state.interns[state.selectedIntern];
        headerUserName.textContent = studentInfo.name;
        headerUserSub.textContent = `DTU Intern • ${studentInfo.track}`;
        headerAvatar.textContent = studentInfo.name.split(' ').map(n => n[0]).join('');
    } else {
        headerUserName.textContent = id.name;
        headerUserSub.textContent = id.sub;
        headerAvatar.textContent = id.avatar;
    }

    headerAvatar.className = `user-avatar ${role}-theme`;
    headerAvatar.style.background = role === 'student' ? 'var(--student-accent)' :
                                   role === 'mentor' ? 'var(--mentor-accent)' : 'var(--admin-accent)';

    // Toggle section visibility
    document.querySelectorAll('.role-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${role}-section`).classList.add('active');

    // Toast Notice
    showToast(`Viewing context as: ${headerUserName.textContent}`, role);

    // Refresh views
    renderSidebar();
    renderAllViews();
}

// Sidebar Navigation Generation
function renderSidebar() {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';
    const config = sidebarConfigs[state.activeRole];

    config.forEach((item, index) => {
        const a = document.createElement('a');
        a.className = `nav-item ${index === 0 ? 'active' : ''} ${state.activeRole}-active`;
        a.innerHTML = `
            <i data-lucide="${item.icon}"></i>
            <span>${item.name}</span>
        `;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            nav.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active', 'student-active', 'mentor-active', 'admin-active'));
            a.classList.add('active', `${state.activeRole}-active`);
            navigateToSection(item.name);
        });

        nav.appendChild(a);
    });
    lucide.createIcons();
}

// Theme switcher (Dark / Light)
function setupThemeToggle() {
    const toggle = document.getElementById('themeToggleBtn');
    toggle.addEventListener('click', () => {
        const body = document.body;

        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            toggle.innerHTML = `<i data-lucide="sun"></i> <span>Light Theme</span>`;
            showToast('Applied Light Theme aesthetics', 'student');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            toggle.innerHTML = `<i data-lucide="moon"></i> <span>Dark Theme</span>`;
            showToast('Applied Premium Dark Theme aesthetics', 'student');
        }
        lucide.createIcons();
    });
}

// Form Handlers
function setupForms() {
    // Student Report Submission
    const reportForm = document.getElementById('submitReportForm');
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const week = document.getElementById('reportWeek').value;
        const work = document.getElementById('reportWork').value;

        // Push new review item to supervisor queue
        const reviewId = Date.now();
        state.reviews.push({
            id: reviewId,
            title: `Week ${week} Report: Journal Progress`,
            desc: work,
            type: 'log',
            time: 'Just now',
            intern: state.selectedIntern
        });

        showToast(`Week ${week} report submitted to supervisor!`, 'student');
        reportForm.reset();
        renderAllViews();
    });

    // Mentor Task Creator
    const taskForm = document.getElementById('createTaskForm');
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;
        const desc = document.getElementById('taskDesc').value;
        const priority = document.getElementById('taskPriority').value;

        // Add task in state
        const taskId = Date.now();
        state.tasks.push({
            id: taskId,
            title: title,
            desc: desc,
            priority: priority,
            status: 'todo',
            intern: state.selectedIntern
        });

        showToast(`Assigned task: "${title}" to ${state.selectedIntern}`, 'mentor');
        taskForm.reset();
        renderAllViews();
    });
}

// 3. View Renderer Core
function renderAllViews() {
    renderStudentKanban();
    renderStudentTimeline();
    renderMentorSpace();
    renderAdminConsole();
    lucide.createIcons();
}

// Drag & Drop Handler Functions
window.allowDrop = function(e) {
    e.preventDefault();
};

window.dragCard = function(e, taskId) {
    e.dataTransfer.setData('text/plain', taskId);
    e.currentTarget.classList.add('dragging');
};

window.dragEnd = function(e) {
    e.currentTarget.classList.remove('dragging');
};

window.handleDrop = function(e, targetStatus) {
    e.preventDefault();
    const taskIdStr = e.dataTransfer.getData('text/plain');
    const taskId = parseInt(taskIdStr);
    
    const task = state.tasks.find(t => t.id === taskId);
    if (task && task.intern === state.selectedIntern) {
        if (task.status === targetStatus) return;
        
        // If moving to review column, trigger a review log submission
        if (targetStatus === 'review') {
            submitTaskForReview(taskId);
        } else {
            task.status = targetStatus;
            showToast(`Moved task to: ${targetStatus.toUpperCase()}`, 'student');
            renderAllViews();
        }
    }
};

// RENDER: Student Kanban
function renderStudentKanban() {
    const activeStudentInfo = state.interns[state.selectedIntern];
    
    // Update headers names
    document.getElementById('student-welcome-title').textContent = `Welcome back, ${activeStudentInfo.name}!`;
    document.getElementById('student-track-title').textContent = activeStudentInfo.track;
    document.getElementById('student-mentor-name').textContent = activeStudentInfo.mentor;
    
    const mentorMatch = Object.values(state.interns).find(i => i.name === activeStudentInfo.name);
    document.getElementById('student-mentor-name').nextElementSibling.textContent = activeStudentInfo.designation;

    const todoList = document.getElementById('student-todo-list');
    const progressList = document.getElementById('student-progress-list');
    const reviewList = document.getElementById('student-review-list');
    const doneList = document.getElementById('student-done-list');

    // Clean lists
    todoList.innerHTML = '';
    progressList.innerHTML = '';
    reviewList.innerHTML = '';
    doneList.innerHTML = '';

    const studentTasks = state.tasks.filter(t => t.intern === state.selectedIntern);
    let counts = { todo: 0, progress: 0, review: 0, done: 0 };

    studentTasks.forEach(task => {
        counts[task.status]++;
        
        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('ondragstart', `dragCard(event, ${task.id})`);
        card.setAttribute('ondragend', `dragEnd(event)`);
        
        // Buttons actions
        let actionBtn = '';
        if (task.status === 'todo') {
            actionBtn = `<button class="card-action-btn" title="Start Task" onclick="advanceTaskStatus(${task.id}, 'progress')"><i data-lucide="play"></i></button>`;
        } else if (task.status === 'progress') {
            actionBtn = `<button class="card-action-btn" title="Submit for Review" onclick="submitTaskForReview(${task.id})"><i data-lucide="send"></i></button>`;
        } else if (task.status === 'review') {
            actionBtn = `<span class="review-time" style="font-size: 0.65rem; font-style: italic;">Awaiting Review</span>`;
        } else if (task.status === 'done') {
            actionBtn = `<i data-lucide="check" style="color: var(--student-accent);"></i>`;
        }

        card.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.desc}</p>
            <div class="card-footer">
                <span class="priority-badge ${task.priority.toLowerCase()}">${task.priority}</span>
                ${actionBtn}
            </div>
        `;

        if (task.status === 'todo') todoList.appendChild(card);
        if (task.status === 'progress') progressList.appendChild(card);
        if (task.status === 'review') reviewList.appendChild(card);
        if (task.status === 'done') doneList.appendChild(card);
    });

    // Update Counts & Progress Card indicators
    document.querySelector('#col-todo .column-count').textContent = counts.todo;
    document.querySelector('#col-progress .column-count').textContent = counts.progress;
    document.querySelector('#col-review .column-count').textContent = counts.review;
    document.querySelector('#col-done .column-count').textContent = counts.done;

    document.getElementById('student-tasks-val').textContent = `${counts.done}/${studentTasks.length}`;
    const fillPercent = studentTasks.length > 0 ? (counts.done / studentTasks.length) * 100 : 0;
    
    document.querySelector('.progress-bar-fill.student-theme').style.width = `${fillPercent}%`;
    document.getElementById('student-days-val').textContent = `${Math.round(fillPercent)}%`;

    // Toggle grade badge dynamically
    const gradeVal = document.getElementById('student-grade-val');
    const gradeSub = gradeVal.nextElementSibling;
    if (fillPercent >= 80) {
        gradeVal.textContent = 'Outstanding';
        gradeSub.textContent = 'Top tier task completion rates';
    } else if (fillPercent >= 50) {
        gradeVal.textContent = 'Excellent';
        gradeSub.textContent = 'Consistent progress logs';
    } else {
        gradeVal.textContent = 'Satisfactory';
        gradeSub.textContent = 'Milestones progressing';
    }
}

// Student action triggers
window.advanceTaskStatus = function(taskId, nextStatus) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.status = nextStatus;
        showToast(`Moved task to: ${nextStatus.toUpperCase()}`, 'student');
        renderAllViews();
    }
};

window.submitTaskForReview = function(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.status = 'review';
        
        // Push task review log item to Mentor's inbox
        state.reviews.push({
            id: Date.now(),
            title: `Task Deliverable: ${task.title}`,
            desc: task.desc,
            type: 'task',
            time: 'Just now',
            intern: task.intern,
            originalTaskId: taskId
        });

        showToast(`Task submitted for review approval.`, 'student');
        renderAllViews();
    }
};

// RENDER: Dynamic Milestones Tracker
function renderStudentTimeline() {
    const container = document.getElementById('student-timeline-list');
    container.innerHTML = '';

    const studentTasks = state.tasks.filter(t => t.intern === state.selectedIntern);
    const doneCount = studentTasks.filter(t => t.status === 'done').length;
    const totalCount = studentTasks.length;
    const pct = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

    // Define 4 dynamic milestones based on task completion
    const milestones = [
        { name: 'Onboarding & Workspace Sync', condition: true, desc: 'Initial accounts setup, repository configurations.' },
        { name: 'Milestone 1: Fundamentals', condition: pct >= 33, desc: 'Style guide integrations and base layouts assembly.' },
        { name: 'Milestone 2: App Shell Flow', condition: pct >= 66, desc: 'Connecting state APIs with layouts and handling callbacks.' },
        { name: 'Midterm Completion & Appraisal', condition: pct >= 100, desc: 'Fully verified tasks and coordinator certifications eligibility.' }
    ];

    milestones.forEach((m, idx) => {
        const item = document.createElement('div');
        let statusClass = 'locked';
        let marker = `<i data-lucide="lock" class="small-lock"></i>`;

        if (m.condition) {
            statusClass = 'completed';
            marker = `<i data-lucide="check"></i>`;
        } else if (idx > 0 && milestones[idx-1].condition) {
            statusClass = 'active';
            marker = `<span class="pulse-dot"></span>`;
        }

        item.className = `timeline-item ${statusClass}`;
        item.innerHTML = `
            <div class="timeline-marker">${marker}</div>
            <div class="timeline-content">
                <h4>${m.name}</h4>
                <p>${m.desc}</p>
            </div>
        `;
        container.appendChild(item);
    });
}

// RENDER: Mentor Workspace
function renderMentorSpace() {
    // Generate Intern pills dynamically
    const pillbox = document.getElementById('mentor-intern-pillbox');
    pillbox.innerHTML = '<span class="role-label">Managing:</span>';

    Object.keys(state.interns).forEach(name => {
        const info = state.interns[name];
        const pill = document.createElement('div');
        pill.className = `intern-pill ${state.selectedIntern === name ? 'active' : ''}`;
        pill.setAttribute('onclick', `selectIntern('${name}')`);
        
        const initial = name.split(' ').map(n => n[0]).join('');
        pill.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <span>${name.split(' ')[0]}</span>
        `;
        pillbox.appendChild(pill);
    });

    const currentInternInfo = state.interns[state.selectedIntern];
    document.getElementById('mentor-intern-name').textContent = currentInternInfo.name;
    document.getElementById('mentor-intern-details').textContent = `${currentInternInfo.university} • ${currentInternInfo.track}`;

    // Filter metrics
    const internTasks = state.tasks.filter(t => t.intern === state.selectedIntern);
    const pendingCount = state.reviews.filter(r => r.intern === state.selectedIntern).length;
    const outstandingCount = internTasks.filter(t => t.status === 'todo' || t.status === 'progress').length;

    document.getElementById('mentor-pending-count').textContent = pendingCount;
    document.getElementById('mentor-outstanding-count').textContent = outstandingCount;

    // Quality Rating Calculation
    const doneCount = internTasks.filter(t => t.status === 'done').length;
    const totalCount = internTasks.length;
    const qualityScore = totalCount > 0 ? (4.0 + (doneCount / totalCount) * 1.0) : 4.0;
    document.getElementById('appraisal-quality').textContent = `${qualityScore.toFixed(1)}/5.0`;

    // Render Review queue
    const reviewQueue = document.getElementById('mentor-review-queue');
    reviewQueue.innerHTML = '';

    const activeReviews = state.reviews.filter(r => r.intern === state.selectedIntern);
    if (activeReviews.length === 0) {
        reviewQueue.innerHTML = `
            <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
                <i data-lucide="circle-dashed" style="width: 32px; height: 32px; margin-bottom: 0.5rem; opacity: 0.5; display: inline-block;"></i>
                <p>All items checked! No tasks awaiting validation for ${state.selectedIntern}.</p>
            </div>
        `;
    } else {
        activeReviews.forEach(item => {
            const row = document.createElement('div');
            row.className = 'review-item';
            row.style.cursor = 'pointer';
            
            // Clicking the row opens full detail view
            row.addEventListener('click', (e) => {
                // Prevent event firing if clicking buttons specifically
                if (e.target.closest('.btn-icon')) return;
                openReviewDetailModal(item.id);
            });

            row.innerHTML = `
                <div class="review-details">
                    <div class="review-meta">
                        <span class="badge-review ${item.type}-type">${item.type.toUpperCase()}</span>
                        <span class="review-time">${item.time}</span>
                    </div>
                    <h4>${item.title}</h4>
                    <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 350px;">${item.desc}</p>
                </div>
                <div class="review-actions">
                    <button class="btn-icon btn-approve" title="Approve Submission" onclick="approveReview(${item.id})">
                        <i data-lucide="check"></i>
                    </button>
                    <button class="btn-icon btn-reject" title="Request Changes" onclick="rejectReview(${item.id})">
                        <i data-lucide="refresh-cw"></i>
                    </button>
                </div>
            `;
            reviewQueue.appendChild(row);
        });
    }
}

// Select Intern pill callback
window.selectIntern = function(name) {
    state.selectedIntern = name;
    showToast(`Switched view to intern: ${name}`, 'mentor');
    renderAllViews();
};

// Details Modal Trigger
window.openReviewDetailModal = function(reviewId) {
    const review = state.reviews.find(r => r.id === reviewId);
    if (!review) return;

    document.getElementById('modal-review-type').className = `badge-review ${review.type}-type`;
    document.getElementById('modal-review-type').textContent = review.type.toUpperCase();
    document.getElementById('modal-review-title').textContent = review.title;
    document.getElementById('modal-review-subtitle').textContent = `Submitted by: ${review.intern} • ${review.time}`;
    document.getElementById('modal-review-desc').textContent = review.desc;

    // Build buttons inside modal
    const actionsContainer = document.getElementById('modal-review-actions');
    actionsContainer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal('reviewDetailModal')">Close View</button>
        <button class="btn btn-student" style="background-color: var(--danger-accent); box-shadow:none;" onclick="rejectReview(${review.id}); closeModal('reviewDetailModal');">
            <i data-lucide="refresh-cw"></i> Request Changes
        </button>
        <button class="btn btn-student" onclick="approveReview(${review.id}); closeModal('reviewDetailModal');">
            <i data-lucide="check"></i> Approve Deliverable
        </button>
    `;

    document.getElementById('reviewDetailModal').classList.add('open');
    lucide.createIcons();
};

// Approve submissions
window.approveReview = function(reviewId) {
    const reviewIndex = state.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
        const review = state.reviews[reviewIndex];
        
        if (review.originalTaskId) {
            const task = state.tasks.find(t => t.id === review.originalTaskId);
            if (task) {
                task.status = 'done';
            }
        }

        state.reviews.splice(reviewIndex, 1);
        showToast(`Approved: "${review.title}"`, 'mentor');
        renderAllViews();
    }
};

// Revisions trigger
window.rejectReview = function(reviewId) {
    const reviewIndex = state.reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
        const review = state.reviews[reviewIndex];
        
        if (review.originalTaskId) {
            const task = state.tasks.find(t => t.id === review.originalTaskId);
            if (task) {
                task.status = 'progress';
            }
        }

        state.reviews.splice(reviewIndex, 1);
        showToast(`Requested changes on: "${review.title}"`, 'mentor');
        renderAllViews();
    }
};

// Direct appraisal notes
window.showFeedbackPrompt = function() {
    const feedback = prompt(`Enter appraisals/development feedback notes for ${state.selectedIntern}:`);
    if (feedback) {
        showToast(`Feedback notes successfully saved to profile.`, "mentor");
    }
};

// RENDER: Admin Portal Console
function renderAdminConsole() {
    const totalMatchedCount = Object.keys(state.interns).length;
    const totalUnmatchedCount = state.unmatchedStudents.length;
    const totalCohortSize = totalMatchedCount + totalUnmatchedCount + 22; // Initializing cohort scale offset to 24

    document.getElementById('admin-cohort-size').textContent = `${totalCohortSize} Interns`;

    // Dynamic Match Rate Calculation
    const matchPct = Math.round(( (totalCohortSize - totalUnmatchedCount) / totalCohortSize ) * 100);
    document.getElementById('admin-match-rate').textContent = `${matchPct}%`;
    document.getElementById('admin-match-subtitle').textContent = `${totalCohortSize - totalUnmatchedCount} matched, ${totalUnmatchedCount} pending registration`;

    // Dynamic Cohort Completion Rates
    const totalTasks = state.tasks.length;
    const doneTasksCount = state.tasks.filter(t => t.status === 'done').length;
    const completionPct = totalTasks > 0 ? Math.round((doneTasksCount / totalTasks) * 100) : 0;
    document.getElementById('admin-cohort-completion').textContent = `${completionPct}%`;

    // Render unmatched list columns
    const studentListEl = document.getElementById('unmatched-students');
    const mentorListEl = document.getElementById('available-mentors');

    studentListEl.innerHTML = '';
    mentorListEl.innerHTML = '';

    if (state.unmatchedStudents.length === 0) {
        studentListEl.innerHTML = `<p style="font-size: 0.75rem; text-align: center; color: var(--text-muted); padding: 2rem;">All matched!</p>`;
    } else {
        state.unmatchedStudents.forEach((student, index) => {
            const item = document.createElement('div');
            item.className = 'match-item student-item';
            item.setAttribute('data-index', index);
            item.innerHTML = `
                <span>${student.name}</span>
                <span class="track-badge">${student.track}</span>
            `;
            item.addEventListener('click', () => selectMatchTarget('student', item, index));
            studentListEl.appendChild(item);
        });
    }

    if (state.availableMentors.length === 0) {
        mentorListEl.innerHTML = `<p style="font-size: 0.75rem; text-align: center; color: var(--text-muted); padding: 2rem;">No mentors available.</p>`;
    } else {
        state.availableMentors.forEach((mentor, index) => {
            const item = document.createElement('div');
            item.className = 'match-item mentor-item';
            item.setAttribute('data-index', index);
            item.innerHTML = `
                <span>${mentor.name}</span>
                <span class="track-badge">${mentor.track}</span>
            `;
            item.addEventListener('click', () => selectMatchTarget('mentor', item, index));
            mentorListEl.appendChild(item);
        });
    }

    // Dynamic Certification eligibility list
    const certsContainer = document.getElementById('admin-certifications-list');
    certsContainer.innerHTML = '';

    // Loop through interns and calculate real graduation eligibility based on tasks done
    Object.keys(state.interns).forEach(name => {
        const internTasks = state.tasks.filter(t => t.intern === name);
        const doneCount = internTasks.filter(t => t.status === 'done').length;
        const pct = internTasks.length > 0 ? Math.round((doneCount / internTasks.length) * 100) : 0;
        
        const eligible = pct === 100;
        const label = eligible ? 'Graduated (100% Complete)' : `In Progress (${pct}%)`;

        const row = document.createElement('div');
        row.className = 'cert-item';
        
        let actionBtn = '';
        if (eligible) {
            actionBtn = `<button class="cert-btn" onclick="openCertModal('${name}', '${state.interns[name].mentor}')">Open Cert</button>`;
        } else {
            actionBtn = `<span style="font-size: 0.7rem; color: var(--text-muted); font-weight:600;">Ineligible</span>`;
        }

        row.innerHTML = `
            <div class="cert-item-info">
                <h4>${name}</h4>
                <p>Status: ${label} • Mentor: ${state.interns[name].mentor}</p>
            </div>
            ${actionBtn}
        `;
        certsContainer.appendChild(row);
    });
}

// Matching selections
let selectedStudentMatchIndex = null;
let selectedMentorMatchIndex = null;

function selectMatchTarget(type, element, index) {
    if (type === 'student') {
        document.querySelectorAll('.student-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedStudentMatchIndex = index;
    } else {
        document.querySelectorAll('.mentor-item').forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
        selectedMentorMatchIndex = index;
    }
}

window.triggerMatch = function() {
    if (selectedStudentMatchIndex === null || selectedMentorMatchIndex === null) {
        showToast("Select a student and a mentor first to perform matching.", "admin");
        return;
    }

    const student = state.unmatchedStudents[selectedStudentMatchIndex];
    const mentor = state.availableMentors[selectedMentorMatchIndex];

    // Push unmatched targets to interns cohort database!
    state.interns[student.name] = {
        name: student.name,
        university: student.school,
        track: `${student.track} Cohort`,
        mentor: mentor.name,
        designation: mentor.track
    };

    // Add empty task for newly matched student to progress
    state.tasks.push({
        id: Date.now(),
        title: 'Complete Onboarding Survey',
        desc: 'Review program rules, select matching deliverables options, and connect chat integrations.',
        priority: 'Low',
        status: 'todo',
        intern: student.name
    });

    // Delete from unmatched list pools
    state.unmatchedStudents.splice(selectedStudentMatchIndex, 1);
    state.availableMentors.splice(selectedMentorMatchIndex, 1);

    // Reset selection indexes
    selectedStudentMatchIndex = null;
    selectedMentorMatchIndex = null;

    showToast(`Linked student ${student.name} with mentor ${mentor.name}!`, 'admin');
    renderAllViews();
};

// 4. Modal Triggers (Certificates & Reviews)
window.openCertModal = function(studentName, mentorName) {
    document.getElementById('cert-student-name').textContent = studentName;
    document.getElementById('cert-mentor-name').textContent = mentorName;
    document.getElementById('certModal').classList.add('open');
};

window.closeModal = function(id) {
    document.getElementById(id).classList.remove('open');
};

window.downloadCertificate = function() {
    showToast("Generating official signed printable PDF... Done!", "student");
    window.print();
};

// 5. Toast Notifications Component
function showToast(message, type = 'student') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'student') icon = 'user';
    if (type === 'mentor') icon = 'users';
    if (type === 'admin') icon = 'shield';

    toast.innerHTML = `
        <i data-lucide="${icon}" style="width: 16px; height: 16px;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto-remove
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// 6. Sidebar Target Auto-Scrolling Navigation
function navigateToSection(name) {
    let targetId = '';
    
    if (state.activeRole === 'student') {
        if (name === 'Overview') targetId = 'student-overview-target';
        if (name === 'My Tasks') targetId = 'student-tasks-card';
        if (name === 'Milestones') targetId = 'student-milestones-card';
        if (name === 'Submit Report') targetId = 'student-reports-card';
    } else if (state.activeRole === 'mentor') {
        if (name === 'Dashboard') targetId = 'mentor-overview-target';
        if (name === 'Review Queue') targetId = 'mentor-review-card';
        if (name === 'Assign Tasks') targetId = 'mentor-assign-card';
        if (name === 'Appraisals') targetId = 'mentor-appraisals-card';
    } else if (state.activeRole === 'admin') {
        if (name === 'Console Home') targetId = 'admin-overview-target';
        if (name === 'Matchmaking') targetId = 'admin-matchmaking-card';
        if (name === 'Certificates') targetId = 'admin-certificates-card';
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast(`Jumped to: ${name}`, state.activeRole);
    }
}
