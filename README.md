<p align="center">
  <img
    src="https://github.com/user-attachments/assets/3a0f2bf8-19d3-4216-b55e-0b2f4eee0ce4"
    alt="Smart Farm Banner"
    width="100%"
  />
</p>


# 🌱 Smart Farm Management System (SFMS)

> A modern, intelligent farm management platform that helps farmers and agribusinesses manage farms, fields, crops, harvests, finances, workers, and daily operations from one centralized dashboard.

🔗 **Live Demo:** https://smart-farm-managementt.vercel.app

---

## 📖 Overview

Smart Farm Management System (SFMS) is a full-stack web application built to digitize and simplify agricultural operations.

The platform enables farm owners to manage multiple farms, assign workers, monitor crop growth, organize field activities, track financial records, and gain smart insights that support better decision-making.

Rather than relying on spreadsheets or paper records, SFMS provides a centralized workspace where every farming activity can be recorded, monitored, and analyzed.

---

# ✨ Features

## 🏡 Workspace Management

- Create multiple workspaces
- Join workspaces using invitation codes
- Workspace ownership and role management
- Edit workspace information
- Delete workspace with confirmation validation
- Workers can leave workspaces independently

---

## 🌾 Farm Management

- Create multiple farms
- GPS location support
- Farm overview dashboard
- Farm activity timeline
- Farm performance analytics
- Weather integration
- Farm map visualization

---

## 🌱 Field Management

- Create multiple fields per farm
- Field size tracking
- Field status monitoring
- Field notes
- Field activities
- Crop assignment

---

## 🌿 Crop Management

- Plant new crops
- Track crop growth stages
- Expected harvest scheduling
- Harvest readiness monitoring
- Crop lifecycle tracking
- Active vs harvested crops

---

## ✅ Task Management

- Assign tasks to workers
- Due date management
- Task priorities
- Task status tracking
- Overdue task detection
- Task completion monitoring

---

## 👨‍🌾 Worker Management

- Invite workers
- Role-based permissions
- Worker activity tracking
- Worker dashboard
- Top worker analytics
- Leave workspace functionality

---

## 📝 Notes System

Workers and farm managers can:

- Create notes
- View notes
- Delete their own notes
- Manage farm documentation

---

## 💰 Financial Management

### Sales

- Record produce sales
- Revenue tracking
- Sales history
- Farm-based sales analytics

### Expenses

- Track farm expenses
- Expense categorization
- Financial summaries
- Profit/Loss calculations

---

## 🌾 Harvest Management

- Record harvested crops
- Harvest quantity tracking
- Harvest history
- Upcoming harvest detection
- Harvest analytics

---

## 📊 Reports & Analytics

Interactive dashboards displaying:

- Revenue trends
- Expense trends
- Profit analysis
- Crop distribution
- Farm performance
- Financial reports
- Crop status
- Recent activities

---

# 🧠 Smart Farming Features

SFMS doesn't just store farm data—it interprets it.

The system automatically analyzes farm activities and generates intelligent recommendations.

### Smart Insights

- ❤️ Farm Health Score
- 🌾 Active Farms
- 🌱 Active Crops
- 🚜 Active Fields
- 📅 Upcoming Harvests
- 🌽 Next Harvest
- ⚠️ Overdue Tasks
- 🌿 Idle Fields Detection
- 💰 Financial Snapshot
- 📈 Profit & Loss Monitoring
- 👨‍🌾 Top Performing Worker
- 📋 Priority Insights
- 🤖 Smart Summary
- 💡 Smart Recommendations

Instead of simply displaying numbers, SFMS transforms farm data into meaningful, actionable insights to help farm owners make better decisions.

---

# 🔐 Authentication & Security

- Secure Authentication
- Email Verification
- Role-Based Authorization
- Workspace Access Validation
- Protected Server Actions
- Secure Document Ownership

---

# ⚡ Performance Optimizations

- React Query Caching
- Optimized Cache & Stale Times
- Background Refetching
- Lazy Loading
- Optimistic Updates
- Server Actions
- Efficient Appwrite Queries

---

# 📱 Responsive Design

Designed for

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Zustand

---

## Backend

- Appwrite Database
- Appwrite Authentication
- Appwrite Storage
- Appwrite Functions

---

## Data Visualization

- Recharts

---

## Maps

- Map CN

---

## Weather

- OpenWeather API

---

## Notifications

- Sonner

---

# 📸 Screenshots

## Landing Page

<p align="center">
 
<img height="500" alt="Image" src="https://github.com/user-attachments/assets/6ddc1980-c7b3-4115-a5ad-645dd9abfe72" />
</p>

---

## Dashboard

<p align="center">

<img height="500" alt="Image" src="https://github.com/user-attachments/assets/16b9aea2-cfe4-4d3d-b4ca-f2c4af6f5bbe" />
</p>

---

## Farm Overview

<p align="center">
<img height="500" alt="Image" src="https://github.com/user-attachments/assets/12204e60-9c88-4959-82dd-159fbb308cf0" />
</p>


---

## Crop Management

<p align="center">
<img height="500" alt="Image" src="https://github.com/user-attachments/assets/54c347c9-9a8d-46ed-9de6-6b6072b30c10" />
</p>


---

## Reports

<p align="center">
<img height="500" alt="Image" src="https://github.com/user-attachments/assets/7b7615a1-f0b9-42ed-9d93-a655da58d7c7" />
</p>


---

## Finance (Sales & Expenses)

<p align="center">
  <img
<img height="500" alt="Image" src="https://github.com/user-attachments/assets/d441b484-7648-4d2b-ad3a-a1535759d2cd" />
</p>


---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/yourusername/smart-farm-management.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=

NEXT_PUBLIC_APPWRITE_PROJECT_ID=

APPWRITE_API_KEY=

APPWRITE_DATABASE_ID=

APPWRITE_WORKSPACE_COLLECTION_ID=

APPWRITE_FARMS_COLLECTION_ID=

APPWRITE_FIELDS_COLLECTION_ID=

APPWRITE_CROPS_COLLECTION_ID=

APPWRITE_TASKS_COLLECTION_ID=

APPWRITE_EXPENSES_COLLECTION_ID=

APPWRITE_SALES_COLLECTION_ID=

APPWRITE_HARVEST_COLLECTION_ID=
```

## Start Development Server

```bash
npm run dev
```

---

# 🌍 Future Improvements

- 🤖 AI Crop Disease Detection
- 📷 Plant Image Recognition
- 🌦 Weather-Based Crop Recommendations
- 📈 Yield Prediction
- 📡 IoT Sensor Integration
- 🔔 Push Notifications
- 📱 Mobile Application
- 📄 PDF & Excel Report Export
- 📦 Inventory Management
- 🛒 Farm Marketplace
- 🌐 Offline Mode
- 🤝 Multi-Organization Support

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👨‍💻 Author

### Happie Samuel

Full-Stack Developer

- GitHub: [Happie Samuel](https://github.com/Happiesamuel)
- Twitter: [Happie Samuel](https://x.com/hs_the_dev)
- LinkedIn: [Happie Samuel](https://www.linkedin.com/in/hs-the-dev)
- Portfolio: [Happie Samuel](https://linktr.ee/hs_the_dev)

---

## ⭐ Support

If you found this project useful, please consider giving it a **⭐ Star**.

It helps others discover the project and motivates future improvements.

---

> **Smart Farm Management System — Helping Farmers Make Smarter Decisions. 🌱**
