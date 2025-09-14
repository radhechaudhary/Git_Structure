<img width="1919" height="858" alt="Screenshot 2025-09-14 231623" src="https://github.com/user-attachments/assets/b9517d37-20af-4649-a630-e2ac417b76d9" />

<h1 style="font-weight:800 font-size:30px">Git Structure</h1>

A tool that lets users visualize the file/folder structure of a GitHub repository in a diagrammatic/tree format.

🛠 Features

1. Fetches file structure (folders & files) from a GitHub repository

2. Converts structure into a tree/diagram view

3. Supports Mermaid / custom rendering for visual clarity

4. Interactive nodes (click to view paths or for further actions)

5. Responsive layout for large directory trees


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

<img width="1901" height="864" alt="Screenshot 2025-09-14 231707" src="https://github.com/user-attachments/assets/cea2e275-98d5-45f6-924a-9664c87cbb8a" />
<img width="1905" height="859" alt="Screenshot 2025-09-14 231654" src="https://github.com/user-attachments/assets/883b9945-0d57-4fc9-b508-10d50cdb70fb" />

🧩 Technical Stack

1. Frontend: React, Vite (or configured build tool)

2. Diagram Rendering: Mermaid / custom component

3. Styling: CSS / Tailwind CSS (or your preferred utility-first style)


🚧 TODO / Planned Improvements

1. Support for private GitHub repositories (via tokens)

2. Custom theming / dark mode

3. Handle very large repos more efficiently (lazy load, pagination)
