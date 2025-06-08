📝 AI-Powered Personal Diary
This is a personal diary web application that allows users to write daily entries, attach images or voice memos, and automatically detect the user's mood and get friendly activity recommendations using AI.

✨ Features
🧠 AI-powered mood analysis (offline with Ollama)

💬 Smart suggestions based on your journal entries

🖼️ Upload images

🎤 Attach voice notes

🔐 JWT-based login & signup

💾 MongoDB for storing entries

🎀 Beautiful, modern UI

📸 Screenshots
Login	Write Entry	View Entries

🚀 Getting Started
1. Clone the repo
bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Setup backend
bash
cd personal-diary-backend
npm install
Create a .env file:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
3. Run Ollama (for AI to work)
Install Ollama and run:

bash
Kopyala
Düzenle
ollama run mistral
✨ If Ollama isn't running, the app will fall back to default suggestions.

4. Start backend

npm start
5. Setup frontend

cd ../personal-diary-frontend
npm install
npm run dev
🧠 How AI Works
AI is powered locally using Ollama and the mistral model

When a user saves a note, the app:

Analyzes the mood

Generates 2–3 friendly suggestions for their day

If Ollama is not running, the app uses smart fallback suggestions

🛠️ Built With
React + TypeScript

Node.js + Express

MongoDB + Mongoose

JWT Authentication

Ollama + Mistral (LLM)

Multer for file upload

📦 Folder Structure

personal-diary/
├── personal-diary-backend/  # Express API, MongoDB, AI logic
├── personal-diary-frontend/ # React UI
📣 A Note for Reviewers
This project uses local AI (no paid API) via Ollama.
To see full mood analysis in action, please make sure Ollama is installed and running.

If not, the app will still work and use default suggestions for mood & advice.

🙌 Credits
Built by Dilruba Guliyeva

Inspired by real-world journaling tools + modern AI

AI suggestions powered by Ollama

