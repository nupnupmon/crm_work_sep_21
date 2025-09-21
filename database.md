# 📦 DATABASE.md — CRM System for Policy Selling Company

## 🧾 Project Name  
**CRM System for Policy Selling Company**

## 📝 Database Description  
This project contains the **database schema** for a full-featured **Customer Relationship Management (CRM)** system tailored for companies selling policies.

The system is designed to handle:

- 👥 Lead Management  
- 🧑‍💼 Customer & Agent Tracking  
- 📜 Policy Management  
- 💰 Commission Calculation and Reporting  
- 📊 Interactive Dashboards with filters (date, agent, product type, etc.)

### Optimized For:
- Daily, Monthly, Yearly Sales Reports  
- Agent-wise Performance Reports  
- Lead Conversion Funnels & Metrics  
- Real-time Commission Calculations  
- Complete Customer Document Handling (KYC)

---

## 📚 Database Tables Overview

### 🔹 `users`
Stores user profiles including agents and admins.

| Column         | Description                        |
|----------------|------------------------------------|
| id             | Primary key                        |
| name           | Full name of the user              |
| email          | Unique identifier                  |
| password_hash  | Encrypted authentication password  |
| role           | `'admin'` or `'agent'`             |
| phone          | Contact number                     |
| last_login_at  | Timestamp of last login            |
| created_at     | Timestamp when account was created |

---

### 🔹 `customers`
Stores information about customers buying or exploring policies.

| Column         | Description              |
|----------------|--------------------------|
| id             | Primary key              |
| name           | Customer name            |
| email          | Optional email           |
| date_of_birth  | DOB for age calculation  |
| phone_number   | Customer contact         |
| address        | Full residential address |
| status         | `'active'` or `'inactive'` |
| created_at     | Record creation timestamp |

---

### 🔹 `customer_documents`
KYC and other uploaded documents linked to customers.

| Column         | Description                      |
|----------------|----------------------------------|
| id             | Primary key                      |
| customer_id    | Foreign key → `customers`        |
| document_type  | Aadhaar, PAN, etc.               |
| document_url   | File storage link                |
| verified       | KYC verified or not              |
| uploaded_at    | Upload date                      |

---

### 🔹 `leads`
Tracks all incoming and ongoing leads.

| Column                   | Description                          |
|--------------------------|--------------------------------------|
| id                       | Primary key                          |
| customer_id              | Optional FK if known                 |
| source                   | Source of the lead                   |
| expected_policy_type     | life / health / investment           |
| status                   | new, contacted, converted, lost      |
| lead_score               | Priority score                       |
| assigned_to              | FK → agents                          |
| notes                    | Agent notes                          |
| address                  | Lead address                         |
| customer_appointment_date| Appointment date                     |
| converted_at             | Conversion timestamp                 |
| lost_reason              | Reason if lost                       |
| created_at               | Lead creation time                   |

---

### 🔹 `follow_ups`
Follow-up actions taken by agents.

| Column               | Description                       |
|----------------------|-----------------------------------|
| id                   | Primary key                       |
| lead_id              | FK to `leads`                     |
| agent_id             | Agent performing follow-up        |
| follow_up_type       | call, email, meeting              |
| note                 | Notes on the follow-up            |
| status_after_follow_up | Result/status                  |
| follow_up_date       | Scheduled/actual follow-up date   |
| created_at           | Auto timestamp                    |

---

### 🔹 `policies`
Main table storing policy-related records.

| Column               | Description                          |
|----------------------|--------------------------------------|
| id                   | Primary key                          |
| policy_number        | Unique string identifier             |
| policy_name          | Product/policy name                  |
| type                 | life, health, investment             |
| customer_id          | FK → `customers`                     |
| agent_id             | FK → `users` (agents)                |
| conversion_lead_id   | FK to original lead                  |
| sum_assured          | Total insured value                  |
| issue_date           | Start date                           |
| expiry_date          | End of policy                        |
| premium_amount       | Required payment                     |
| payment_frequency    | monthly/yearly/etc.                  |
| commission_percentage| Commission % per policy              |
| status               | Policy lifecycle status              |
| last_renewal_date    | For renewal tracking                 |
| created_by           | Who added the policy                 |
| updated_by           | Last person to update                |
| created_at           | Created timestamp                    |
| updated_at           | Updated timestamp                    |

---

### 🔹 `commissions`
Tracks commission details for agents.

| Column           | Description                        |
|------------------|------------------------------------|
| id               | Primary key                        |
| policy_id        | FK → `policies`                    |
| agent_id         | Receiving agent                    |
| amount           | Commission value                   |
| percentage       | % used for calculation             |
| commission_status| paid, pending, on_hold             |
| recorded_at      | Auto timestamp                     |
| paid_at          | Payment disbursed timestamp        |

---

### 🔹 `policy_status_history`
Tracks every policy status change.

| Column      | Description                         |
|-------------|-------------------------------------|
| id          | Primary key                         |
| policy_id   | FK to `policies`                    |
| status      | New status                          |
| changed_at  | When status was changed             |
| changed_by  | Who made the change                 |

---

### 🔹 `activity_log` *(optional but recommended)*
Tracks all user actions across the system.

| Column       | Description                     |
|--------------|---------------------------------|
| id           | Primary key                     |
| user_id      | Who performed the action        |
| entity_type  | 'lead', 'policy', etc.          |
| entity_id    | ID of the entity                |
| action       | What was done                   |
| created_at   | Timestamp of the action         |

---

## 📊 Dashboard Metrics Powered by This Schema

- ✅ Sales Reports by Day, Month, Agent, Policy Type  
- 📈 Lead Pipeline: Total, Converted, Lost, Contacted  
- 🧑‍💼 Agent Performance Reports  
- 💼 Commission Summary: Paid & Pending  
- 🗓️ Policy Renewal & Expiry Alerts  

---

## 🚧 Future Tables / Modules

### 🔹 `targets` – Agent/Branch-wise Goal Setting

| Column         | Data Type   | Description                     |
|----------------|-------------|---------------------------------|
| id             | INT (PK)    | Unique target ID                |
| target_type    | ENUM        | 'agent' or 'branch'             |
| target_for_id  | INT         | FK to users.id (agent/branch)   |
| metric         | ENUM        | leads_converted, policies_sold  |
| target_value   | DECIMAL     | Numeric goal value              |
| period_start   | DATE        | Goal start                      |
| period_end     | DATE        | Goal end                        |
| created_at     | TIMESTAMP   | Created date                    |
| created_by     | INT (FK)    | Admin who created               |

---

### 🔹 `notifications` – Alerts / Reminders

| Column           | Data Type    | Description                  |
|------------------|--------------|------------------------------|
| id               | INT (PK)     | Notification ID              |
| user_id          | INT (FK)     | Receiver of notification     |
| title            | VARCHAR(255) | Notification title           |
| message          | TEXT         | Full message                 |
| type             | ENUM         | reminder, alert, system      |
| status           | ENUM         | unread, read, dismissed      |
| target_entity    | VARCHAR(50)  | e.g., 'policy', 'lead'       |
| target_entity_id | INT          | ID of entity                 |
| remind_at        | TIMESTAMP    | When to remind               |
| created_at       | TIMESTAMP    | Notification created         |

---

### 🔹 `tasks` – To-Do Management

| Column        | Data Type    | Description                          |
|---------------|--------------|--------------------------------------|
| id            | INT (PK)     | Task ID                              |
| title         | VARCHAR(255) | Task summary                         |
| description   | TEXT         | Full description                     |
| assigned_to   | INT (FK)     | Assigned agent                       |
| related_type  | VARCHAR(50)  | e.g., 'lead', 'policy'               |
| related_id    | INT          | ID of related entity                 |
| status        | ENUM         | pending, completed, overdue, etc.    |
| due_date      | DATE         | Due date for task                    |
| priority      | ENUM         | low, medium, high, urgent            |
| created_at    | TIMESTAMP    | Task creation timestamp              |
| created_by    | INT (FK)     | Who created the task                 |

---

### 🔹 `products` – Insurance Product Catalog

| Column                | Data Type     | Description                         |
|------------------------|---------------|-------------------------------------|
| id                    | INT (PK)      | Product ID                          |
| name                  | VARCHAR(150)  | Product name                        |
| provider              | VARCHAR(150)  | Insurance company                   |
| type                  | ENUM          | life, health, vehicle, etc.         |
| description           | TEXT          | Product details or brochure         |
| premium_type          | ENUM          | fixed, variable, calculated         |
| commission_percentage | DECIMAL(5,2)  | Default commission %                |
| is_active             | BOOLEAN       | Visible or hidden from agent panel  |
| created_at            | TIMESTAMP     | When product was added              |

---

## ✅ Benefits of These Tables

| Module        | Enables Functionality                                   |
|---------------|----------------------------------------------------------|
| `targets`     | KPIs, performance tracking, productivity reports         |
| `notifications` | Auto-reminders, alerts for agents/admins             |
| `tasks`       | Agent to-do list, follow-up/renewal tracking             |
| `products`    | Multiple policy offerings with centralized management    |

---

## 🏁 Final Thoughts

This schema is **production-ready**, supports scalable operations, and is designed for:

- 🔒 Role-based access and traceability  
- 📈 Real-time dashboards and metrics  
- 🛠️ Easy extensibility into billing, tasks, or marketing modules

---

Let me know if you’d like:
- 📐 An ER diagram  
- 🗃️ SQL dump file  
- 🧪 Sample queries and test data

Happy building!
