**1. Project Description**
SepsisGuard AI is a high-performance, AI-powered clinical decision support system (CDSS) designed for ICU physicians and nursing staff. It streamlines sepsis management by providing real-time risk scoring, protocol tracking, and an intelligent clinical copilot to improve patient outcomes during the critical "Golden Hour."

**2. Key Features**
Real-Time Risk Analysis: Instant calculation and visualization of critical sepsis scores (SIRS, qSOFA, SOFA).
Golden Hour Bundle Tracker: Interactive checklist for the Surviving Sepsis Campaign (SSC) 1-hour bundle (Lactate, Blood Cultures, Antibiotics, Fluids, Vasopressors).
AI Clinical Copilot: A Gemini 3 Flash-powered assistant providing evidence-based guidance on protocols and score interpretation.
Longitudinal Vitals Monitoring: High-density charts for tracking MAP, Heart Rate, Temperature, and WBC trends.
Role-Based Access Control (RBAC): Tailored interfaces for Physicians, Nurses, and Clinical Admins.
Audit & Compliance: Comprehensive audit logging system to track clinical actions and system access.

**3.MACHINE LEARNING AND PREDICTIVE ANALYSIS**
Generative AI (The Clinical Copilot)
How it works: When you ask a question, the model processes your input against a "System Instruction" that contains medical knowledge (like the Surviving Sepsis Campaign guidelines).
Analysis: It doesn't just search for text; it predicts the most clinically relevant response based on the patterns it learned during training on vast amounts of medical literature.
2. Deterministic Predictive Scoring
The app implements clinical algorithms like SOFA, qSOFA, and SIRS.
How it works: These are "rule-based" predictive models. They take real-time data (Heart Rate, MAP, WBC, etc.) and calculate a score that predicts the statistical likelihood of organ failure or mortality.
Predictive Value: For example, a qSOFA score ≥ 2 is a strong predictor of poor outcomes in patients with suspected infection.
3. How it could be extended (Real-world ML)
In a production environment, this app would typically include:
Early Warning Models: Using historical patient data to train a model (like a Random Forest or LSTM) to predict sepsis 4–6 hours before clinical symptoms appear.
Trend Analysis: The charts in my app (Heart Rate, MAP) provide the "features" that an ML model would use to identify subtle patterns of deterioration that a human might miss.

**4. Tech Stack**
Frontend: React 19, Vite, Tailwind CSS 4
Animations: Motion (formerly Framer Motion)
Backend: Node.js, Express (Mock API & Dev Server)
Data Visualization & Feature Analysis :
Library: Recharts — Used for longitudinal trend analysis, allowing clinicians to visually "predict" patient deterioration by observing changes in vital signs over time.
Logic: TypeScript — The core predictive scoring (SIRS, qSOFA, SOFA) is implemented as deterministic mathematical models in the frontend and backend

**5. Mock Credentials (for testing)**
Physician: physician / Doc@2024
Nurse: nurse / Nurse@2024
Admin: admin / Admin@2024

<img width="534" height="895" alt="Screenshot 2026-03-29 223212" src="https://github.com/user-attachments/assets/5b26530f-ce27-4181-85d4-05b23246cbf5" />    <img width="459" height="622" alt="Screenshot 2026-03-29 222943" src="https://github.com/user-attachments/assets/955e14d6-f4db-4b75-8bdf-34d4f3d6232c" />


<img width="1560" height="991" alt="Screenshot 2026-03-29 223002" src="https://github.com/user-attachments/assets/680c2acf-3f43-430a-a8aa-186b7435ea89" />

<img width="1536" height="900" alt="Screenshot 2026-03-29 223027" src="https://github.com/user-attachments/assets/c81f4339-01f2-4ab3-85cd-842c62da9637" />

<img width=<img width="1534" height="867" alt="Screenshot 2026-03-29 223100" src="https://github.com/user-attachments/assets/9d9d2c1d-b04f-45e8-ae30-e90fdf515001" />

<img width="1560" height="955" alt="Screenshot 2026-03-29 223137" src="https://github.com/user-attachments/assets/6eaa61d9-55e1-4574-b1bf-b10dee2d7328" />

