##Git_Structure

A tool that lets users visualize the file/folder structure of a GitHub repository in a diagrammatic/tree format.

🛠 Features

1. Fetches file structure (folders & files) from a GitHub repository

2. Converts structure into a tree/diagram view

3. Supports Mermaid / custom rendering for visual clarity

4. Interactive nodes (click to view paths or for further actions)

Responsive layout for large directory trees

📁 Folder Structure
Git_Structure/
├ public/
│   └ index.html
├ src/
│   ├ components/
│   ├ RepoTree.jsx
│   ├ App.jsx
│   └ main files...
├ .gitignore
├ package.json
├ vite.config.js
└ README.md

🚀 Getting Started

Clone the repo

git clone https://github.com/radhechaudhary/Git_Structure.git
cd Git_Structure


Install dependencies

npm install


Run the dev server

npm run dev


Build for production

npm run build

⚙ Usage

1. Enter or paste a GitHub repository link

2. The app fetches the repository’s file structure via GitHub API

3. The tree/diagram is generated (using Mermaid or equivalent) to show folder/file hierarchy

4. Clickable nodes reveal full file paths or additional info

5. Export Diagram in an SVG fromat.

🧩 Technical Stack

1. Frontend: React, Vite (or configured build tool)

2. Diagram Rendering: Mermaid / custom component

3. Styling: CSS / Tailwind CSS (or your preferred utility-first style)


🚧 TODO / Planned Improvements

1. Support for private GitHub repositories (via tokens)

2. Custom theming / dark mode

3. Handle very large repos more efficiently (lazy load, pagination)
