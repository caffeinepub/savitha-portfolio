# My Sky of Wings

## Current State
Existing project "Savitha Portfolio" has a basic portfolio with username gate, 4-page swipe navigation (Profile, About, Resume, Contact), electric blue theme, and Motoko backend storing usernames and profile data.

## Requested Changes (Diff)

### Add
- Complete rebrand to "My Sky of Wings" for PRITHIVIRAJ
- Dark purple + pink gradient sky background
- Animated falling cherry blossom petals (CSS/JS)
- Floating particles background animation
- Glassmorphism UI throughout (backdrop-filter blur)
- Top glassmorphism navigation bar with logo, nav links, social icons
- Vertical swipe-up full-screen page navigation (6 pages)
- Page 1 (Home/Hero): glowing "Welcome to My Sky of Wings" heading, tagline "Dream • Create • Soar", circular profile photo with neon ring, "PRITHIVIRAJ" neon text, upload/edit profile photo (password protected)
- Page 2 (About): glassmorphism card with exact bio text, Edit option (password protected)
- Page 3 (Resume): glass card with Education/Skills/Goal details, View/Download/Upload Resume buttons (password protected)
- Page 4 (Contact): editable Instagram ID, LinkedIn ID, Phone Number (password protected)
- Page 5 (Projects): upload project files or add project descriptions (password protected)
- Page 6 (Admin): list of all usernames that have logged in
- Achievements/Stats section: 50+ Projects, 5+ Certifications, 1K+ Followers, 100% Passion glowing cards
- Follow Me section: large glowing LinkedIn + Instagram buttons
- Password protection modal (SNOWBEE) for all edit/upload actions — password hidden as ••••••
- Social links: LinkedIn and Instagram in navbar
- Glowing neon footer: "© 2026 My Sky of Wings | All Rights Reserved."
- Elegant script fonts for headings, clean sans-serif for content
- Smooth hover animations and transitions
- Fully responsive for mobile and desktop

### Modify
- Backend: store usernames log, profile photo, about text, resume file, contact details, projects list
- Frontend: complete redesign from electric blue to purple/pink glassmorphism theme

### Remove
- Old SAVITHA branding and electric blue theme
- Bottom tab navigation (replaced by swipe-up navigation)

## Implementation Plan
1. Update Motoko backend to store: username log, profile data (photo, about, resume, contact), projects list
2. Frontend App.tsx: username entry gate with glassmorphism modal
3. Full-screen swipe container with 6 pages using scroll-snap
4. Cherry blossom petal and particle animations (CSS keyframes + JS)
5. Glassmorphism navbar with logo, nav links (Home/About/Resume/Contact), social icons
6. Page 1 (Home): hero heading, tagline, circular profile image with neon ring, PRITHIVIRAJ neon name, upload controls
7. Page 2 (About): glassmorphism card, exact bio text, edit button with SNOWBEE password gate
8. Page 3 (Resume): glass card layout, education/skills/goal, View/Download/Upload buttons
9. Page 4 (Contact): editable contact fields with password protection
10. Page 5 (Projects): project upload/description cards with password protection
11. Page 6 (Admin): username log list display
12. Achievements stats row + Follow Me section embedded in Home or as subsections
13. Password modal component (SNOWBEE, hidden input)
14. Glowing neon footer
15. Responsive CSS with Tailwind utilities + custom CSS for glassmorphism/animations
