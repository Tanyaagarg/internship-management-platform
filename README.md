<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=220&section=header&text=NexusIntern&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Role-Based%20Internship%20Management%20Platform%20%F0%9F%8E%93&descAlignY=58&descAlign=50" width="100%"/>

<br/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F97316?style=for-the-badge&logoColor=white)](https://lucide.dev/)

<br/>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1000&color=0EA5E9&center=true&vCenter=true&width=650&lines=3+roles%3A+Student+%C2%B7+Mentor+%C2%B7+Admin+%F0%9F%91%A5;Drag-and-drop+Kanban+task+board+%F0%9F%93%8B;Mentor-intern+smart+matchmaking+%F0%9F%94%97;Certificate+generation+%26+PDF+download+%F0%9F%8F%86;Zero+dependencies+%E2%80%94+pure+HTML%2FCSS%2FJS+%E2%9A%A1" alt="Typing SVG" />
</p>

<br/>

<blockquote>
<strong>NexusIntern</strong> is a fully interactive, role-based internship management platform — built entirely with vanilla HTML, CSS, and JavaScript. Switch between Student, Mentor, and Admin perspectives to experience three complete dashboards in one single-file app.
</blockquote>

</div>

---

## 🌟 Features

<table>
  <tr>
    <td align="center" width="220">👤<br/><strong>3 Role Dashboards</strong><br/><sub>Fully separate views for Student (Intern), Mentor (Supervisor), and Administrator</sub></td>
    <td align="center" width="220">📋<br/><strong>Kanban Task Board</strong><br/><sub>Drag & drop tasks across To Do · In Progress · In Review · Completed</sub></td>
    <td align="center" width="220">🔗<br/><strong>Mentor-Intern Matching</strong><br/><sub>Admin matchmaking hub pairs students with mentors by technical track</sub></td>
  </tr>
  <tr>
    <td align="center" width="220">🏆<br/><strong>Certificate Generation</strong><br/><sub>Auto-generate and download PDF completion certificates for interns</sub></td>
    <td align="center" width="220">📊<br/><strong>Analytics Dashboard</strong><br/><sub>Cohort stats — completion rate, match rate, pending reviews</sub></td>
    <td align="center" width="220">🌙<br/><strong>Dark / Light Mode</strong><br/><sub>Toggleable theme with persistent preference</sub></td>
  </tr>
</table>

---

## 👥 Role Breakdown

| Role | Who | What they can do |
|------|-----|-----------------|
| 🎓 **Student (Intern)** | Intern | View tasks, drag Kanban cards, submit weekly logs, track milestones |
| 🧑‍💼 **Mentor (Supervisor)** | Senior Dev | Assign tasks, review submissions, send feedback, appraise interns |
| 🛡️ **Administrator** | Program Coord | Match interns to mentors, view cohort analytics, generate certificates |

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Role |
|-----------|------|
| **HTML5** | Full app structure — 3 role sections, modals, forms |
| **CSS3** | Dark/light theming, Kanban layout, glassmorphism cards |
| **Vanilla JavaScript** | Role switching, drag & drop, dynamic DOM, certificate generation |
| **Lucide Icons** | Icon set (no image files needed) |
| **Google Fonts** | Inter + Outfit font families |

</div>

> **Single-file frontend** — the entire UI logic lives in `index.html` + `app.js` + `style.css`. No build step, no npm, no frameworks.

---

## 📁 Project Structure

```
internship-management-platform/
├── index.html      # Full app — 3 role dashboards, modals, Kanban board
├── app.js          # All JS logic — role switching, drag & drop, data, DOM
└── style.css       # Theming, layout, card styles, animations
```

---

## 🚀 Getting Started

No setup needed — open directly in browser:

```bash
# Clone the repo
git clone https://github.com/Tanyaagarg/internship-management-platform.git
cd internship-management-platform

# Open in browser
open index.html
```

---

## 🎮 How to Use

1. **Open `index.html`** in any modern browser
2. Use the **role dropdown** in the top navbar to switch between:
   - `Student (Intern)` — see tasks, drag Kanban cards, submit weekly log
   - `Mentor (Supervisor)` — review submissions, assign tasks, appraise interns
   - `Administrator` — match interns to mentors, generate certificates
3. In the **Admin view** → Certification Portal → click Generate → Download PDF

---

## 💡 Key Concepts Demonstrated

- **Role-based UI** — same app, three completely different dashboards based on selected role
- **Drag & Drop API** — native HTML5 `draggable`, `ondragover`, `ondrop` for Kanban
- **Dynamic DOM manipulation** — all cards, lists, and modals injected via JavaScript
- **Modal system** — certificate preview and review detail modals with open/close logic
- **CSS theming** — `dark-mode` / `light-mode` class toggle with CSS variables
- **Glassmorphism design** — `backdrop-filter: blur()` card aesthetic

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/add-notifications`
3. Commit: `git commit -m 'Add real-time notifications'`
4. Push: `git push origin feature/add-notifications`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=120&section=footer" width="100%"/>

<sub>Built with ⚡ Vanilla JS · CSS · HTML — zero dependencies</sub>

</div>
