# 🎓 AI-Based Institution Performance Tracking System (UGC / AICTE)

An AI-driven system designed to help **UGC and AICTE** automate the analysis of higher education institutions’ historical data, overall performance metrics, and document sufficiency.  

This project simplifies the manual, repetitive review process by providing **automated report generation** and **AI-based tracking** of institutional performance and compliance documents.

---

## 🚀 Features

✅ **Secure Authentication**
- Register and login system using hashed passwords  
- Session-based route protection  

✅ **Institution Management**
- Add institution details, address, documents, and performance metrics  
- Automatically compute document sufficiency and performance score  

✅ **Report Generation**
- Generates performance reports dynamically  
- Displays percentage of sufficiency of documents  
- Calculates institution performance score based on given metrics  

✅ **Extensible AI Design**
- Modular scoring system (`utils.py`) — can be easily replaced with an ML model for prediction and ranking  
- MongoDB used for scalable and flexible data storage  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | Python (Flask) |
| **Frontend** | HTML, CSS, JavaScript |
| **Database** | MongoDB |
| **Authentication** | Flask sessions + Werkzeug password hashing |
| **AI Logic (Base)** | Python functions in `utils.py` (replaceable with ML model) |

---

## 🧱 Future Improvements

📈 Integrate ML models for performance prediction

🧾 Add file upload and AI-based document verification

📊 Add charts and visualization dashboard

🔐 Implement JWT authentication and role-based access control

☁️ Deploy to Render / AWS / Azure
