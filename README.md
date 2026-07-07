# ✈️ Susi Air - Pilot Operations Portal

A modern, mobile-first web application designed for Susi Air pilots to effectively manage their flight schedules, monitor regulatory flight hours, and track operational document expiries. 

Built as a submission for the **Front-End Developer Technical Test** at PT ASI Pudjiastuti Aviation (Susi Air).

---

## 🔗 Live Preview & Repository
- **Live Deployment:** https://vercel.com/arka6/susi-air-frontend-test
- **GitHub Repository:** https://github.com/marioarka-dev/susi-air-frontend-test/

---

## 🛠️ Tech Stack & Libraries Chosen

In accordance with the mandatory requirements, this project was developed without a backend, utilizing the provided JSON mock data.

- **Framework:** Nuxt 3 (Composition API & `<script setup>`) for robust routing, state management architecture, and auto-imports.
- **State Management:** Pinia. Chosen for its native TypeScript support. I implemented an *Adapter Pattern* within the store to smoothly transform and map the raw JSON keys (`mock-schedules.json` and `mock-documents.json`) into UI-friendly states without cluttering the components.
- **Styling:** Raw SCSS. Instead of relying on heavy CSS frameworks, I utilized custom SCSS with CSS Grid/Flexbox. This approach allowed me to construct a precise, custom layout while demonstrating strong foundational CSS architecture.
- **Charts:** `vue-chartjs` (Chart.js). Selected for its lightweight footprint and high customizability, efficiently handling the dynamic 15-day window rolling-sum calculations for the "Hours to Limit" trend chart.
- **Icons:** `lucide-vue-next` to maintain clean, consistent, and professional 2px stroke line icons.

---

## 🎨 Design & UI/UX Approach

The user interface was crafted to reflect an operational airline tool—minimalist, professional, and accessible. 

- **Bento Grid Layout:** The dashboard employs a modern "Bento Grid" structure to organize complex data (flight limits, upcoming flights, and news) into easily digestible, self-contained cards.
- **Micro-interactions:** Added subtle tap feedback and clean fade-in transitions to improve the perceived performance.
- **Glassmorphism Detail:** The calendar's date-click interaction triggers a custom modal featuring a refined Glassmorphism backdrop, ensuring the UI feels premium while adhering to the scope of the test ("Detail page coming soon").

---

## 🧮 Technical Highlight: Rolling-Sum Logic
The "Hours to Limit" chart accurately implements the requested rolling-sum calculation. Rather than plotting daily hours, each point on the chart represents the total accumulated hours over a specific backward-looking window (e.g., 7 days, 30 days) relative to that specific anchor date. The chart dynamically adjusts its Y-axis bounds and red limit line based on the selected toggle, always keeping the current date (May 31, 2026) centered.

---

## 💡 What I Would Do Differently With More Time

1. **PWA Integration:** Implement `@vite-pwa/nuxt` to make the application installable and accessible offline. This is crucial for pilots operating in remote areas with poor or zero internet connectivity.
2. **Unit Testing:** Integrate Vitest to write robust unit tests, specifically targeting the complex mathematical logic for the rolling-sum chart and the date-math for document expiries to prevent regressions.
3. **CI/CD Pipeline:** Set up automated GitHub Actions to lint the code and preview builds before deploying to production.
4. **State Persistence:** Utilize `pinia-plugin-persistedstate` to temporarily cache schedule and logbook data on the device for faster subsequent loads.

---

## 🚀 Setup & Installation Instructions

Ensure you have Node.js (v18 or newer) installed on your machine.

**1. Clone the repository:**
\`\`\`bash
git clone https://github.com/YOUR-USERNAME/susi-air-frontend-test.git
\`\`\`

**2. Navigate to the directory:**
\`\`\`bash
cd test-susi-air
\`\`\`

**3. Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**4. Run the development server:**
\`\`\`bash
npm run dev
\`\`\`
The application will be running at `http://localhost:3000`. Treat the current date as **31 May 2026** to fully observe the mock data interactions.

**5. Build for production:**
\`\`\`bash
npm run build
\`\`\`
