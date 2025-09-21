# CRM System API Features for Insurance Policy Selling Company

This document outlines the comprehensive API features for the CRM system designed for an insurance policy selling company. The system is built to streamline sales operations, customer management, and reporting through a robust API architecture.

## 🌟 Project Overview

**Project Name:** CRM System for Policy Selling Company

The system is designed to streamline:

- 👥 Lead Management
- 🧑‍💼 Customer & Agent Tracking
- 📜 Policy Management
- 💰 Commission Calculation and Reporting
- 📊 Interactive Dashboards with filters (date, agent, product type, etc.)

The structure is optimized for:

- Daily, Monthly, Yearly Sales Reports
- Agent-wise Performance Reports
- Lead Conversion Funnels & Metrics
- Real-time Commission Calculations
- Complete Customer Document Handling (KYC)

## 🔑 Authentication & Authorization

### Login API

```
POST /api/auth/login
```

**Request:**
```json
{
  "username": "agent123",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 42,
    "username": "agent123",
    "first_name": "John",
    "last_name": "Smith",
    "role": "agent",
    "email": "john.smith@example.com"
  },
  "permissions": ["view_leads", "create_leads", "view_customers", "create_policies"]
}
```

### Refresh Token

```
POST /api/auth/refresh
```

**Request:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

```
POST /api/auth/logout
```

**Response:**
```json
{
  "status": "success",
  "message": "Successfully logged out"
}
```

## 👥 Lead Management

### Get All Leads

```
GET /api/leads
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `status`: Filter by status (new, contacted, qualified, proposal, won, lost)
- `priority`: Filter by priority (low, medium, high)
- `assigned_to`: Filter by assigned agent ID
- `source_id`: Filter by lead source ID
- `product_interest`: Filter by product ID
- `start_date`: Filter by creation date range start
- `end_date`: Filter by creation date range end
- `sort`: Sort field (default: created_at)
- `order`: Sort order (asc, desc) (default: desc)

**Response:**
```json
{
  "status": "success",
  "total": 156,
  "page": 1,
  "limit": 20,
  "total_pages": 8,
  "has_next": true,
  "has_prev": false,
  "data": [
    {
      "id": 1001,
      "lead_code": "LD10001",
      "customer": {
        "id": 501,
        "first_name": "Jane",
        "last_name": "Doe",
        "phone_primary": "+1234567890",
        "email": "jane.doe@example.com"
      },
      "source": {
        "id": 3,
        "name": "Website Inquiry"
      },
      "product_interest": {
        "id": 12,
        "name": "Term Life Insurance"
      },
      "expected_premium": 1200.00,
      "expected_sum_assured": 500000.00,
      "status": "contacted",
      "priority": "high",
      "assigned_to": {
        "id": 42,
        "first_name": "John",
        "last_name": "Smith"
      },
      "next_followup": "2023-06-15T10:30:00Z",
      "created_at": "2023-06-10T14:25:32Z",
      "updated_at": "2023-06-12T09:15:45Z"
    },
    // More leads...
  ]
}
```

### Get Lead Details

```
GET /api/leads/{id}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1001,
    "lead_code": "LD10001",
    "customer": {
      "id": 501,
      "customer_code": "CUS501",
      "first_name": "Jane",
      "last_name": "Doe",
      "date_of_birth": "1985-03-15",
      "gender": "female",
      "email": "jane.doe@example.com",
      "phone_primary": "+1234567890",
      "phone_secondary": null,
      "address_line1": "123 Main St",
      "address_line2": "Apt 4B",
      "city": "New York",
      "state": "NY",
      "postal_code": "10001",
      "country": "USA",
      "occupation": "Software Engineer",
      "income_range": "100k-250k",
      "marital_status": "married",
      "has_children": true
    },
    "source": {
      "id": 3,
      "name": "Website Inquiry",
      "type": "online"
    },
    "product_interest": {
      "id": 12,
      "name": "Term Life Insurance",
      "category": "term"
    },
    "expected_premium": 1200.00,
    "expected_sum_assured": 500000.00,
    "status": "contacted",
    "priority": "high",
    "assigned_to": {
      "id": 42,
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "phone": "+1987654321"
    },
    "lost_reason": null,
    "next_followup": "2023-06-15T10:30:00Z",
    "notes": "Customer is interested in a 20-year term policy with critical illness rider",
    "followups": [
      {
        "id": 2001,
        "type": "call",
        "direction": "outbound",
        "status": "completed",
        "scheduled_at": "2023-06-12T09:00:00Z",
        "completed_at": "2023-06-12T09:15:45Z",
        "duration_minutes": 12,
        "notes": "Discussed policy options, customer requested more information on riders",
        "outcome": "Positive, scheduled follow-up",
        "agent": {
          "id": 42,
          "first_name": "John",
          "last_name": "Smith"
        }
      }
    ],
    "created_at": "2023-06-10T14:25:32Z",
    "updated_at": "2023-06-12T09:15:45Z"
  }
}
```

### Create Lead

```
POST /api/leads
```

**Request:**
```json
{
  "customer": {
    "first_name": "Jane",
    "last_name": "Doe",
    "date_of_birth": "1985-03-15",
    "gender": "female",
    "email": "jane.doe@example.com",
    "phone_primary": "+1234567890",
    "address_line1": "123 Main St",
    "address_line2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "USA",
    "occupation": "Software Engineer",
    "income_range": "100k-250k",
    "marital_status": "married",
    "has_children": true
  },
  "source_id": 3,
  "product_interest": 12,
  "expected_premium": 1200.00,
  "expected_sum_assured": 500000.00,
  "status": "new",
  "priority": "medium",
  "assigned_to": 42,
  "notes": "Initial inquiry through website form"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Lead created successfully",
  "data": {
    "id": 1001,
    "lead_code": "LD10001",
    "customer_id": 501,
    "created_at": "2023-06-10T14:25:32Z"
  }
}
```

### Update Lead

```
PUT /api/leads/{id}
```

**Request:**
```json
{
  "status": "qualified",
  "priority": "high",
  "assigned_to": 42,
  "expected_premium": 1500.00,
  "expected_sum_assured": 600000.00,
  "notes": "Customer is interested in a 20-year term policy with critical illness rider",
  "next_followup": "2023-06-15T10:30:00Z"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Lead updated successfully",
  "data": {
    "id": 1001,
    "updated_at": "2023-06-12T09:15:45Z"
  }
}
```

### Add Follow-up

```
POST /api/leads/{id}/followups
```

**Request:**
```json
{
  "type": "call",
  "direction": "outbound",
  "status": "planned",
  "scheduled_at": "2023-06-15T10:30:00Z",
  "notes": "Follow up on policy options and answer questions about riders"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Follow-up scheduled successfully",
  "data": {
    "id": 2002,
    "lead_id": 1001,
    "scheduled_at": "2023-06-15T10:30:00Z",
    "created_at": "2023-06-12T09:20:15Z"
  }
}
```

### Complete Follow-up

```
PUT /api/followups/{id}
```

**Request:**
```json
{
  "status": "completed",
  "completed_at": "2023-06-15T10:45:00Z",
  "duration_minutes": 15,
  "notes": "Discussed policy options in detail, customer is ready for a proposal",
  "outcome": "Ready for proposal",
  "next_followup_scheduled": "2023-06-20T14:00:00Z"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Follow-up completed successfully",
  "data": {
    "id": 2002,
    "updated_at": "2023-06-15T10:50:12Z",
    "next_followup": {
      "id": 2003,
      "scheduled_at": "2023-06-20T14:00:00Z",
      "type": "meeting",
      "status": "planned"
    }
  }
}
```

## 🧑‍💼 Customer Management

### Get All Customers

```
GET /api/customers
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search by name, email, phone, or customer code
- `agent_id`: Filter by assigned agent
- `sort`: Sort field (default: created_at)
- `order`: Sort order (asc, desc) (default: desc)

**Response:**
```json
{
  "status": "success",
  "total": 1250,
  "page": 1,
  "limit": 20,
  "total_pages": 63,
  "has_next": true,
  "has_prev": false,
  "data": [
    {
      "id": 501,
      "customer_code": "CUS501",
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "jane.doe@example.com",
      "phone_primary": "+1234567890",
      "city": "New York",
      "state": "NY",
      "agent": {
        "id": 42,
        "first_name": "John",
        "last_name": "Smith"
      },
      "policies_count": 2,
      "created_at": "2023-05-15T10:20:30Z"
    },
    // More customers...
  ]
}
```

### Get Customer Details

```
GET /api/customers/{id}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 501,
    "customer_code": "CUS501",
    "first_name": "Jane",
    "last_name": "Doe",
    "date_of_birth": "1985-03-15",
    "gender": "female",
    "email": "jane.doe@example.com",
    "phone_primary": "+1234567890",
    "phone_secondary": null,
    "address_line1": "123 Main St",
    "address_line2": "Apt 4B",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "USA",
    "occupation": "Software Engineer",
    "income_range": "100k-250k",
    "marital_status": "married",
    "has_children": true,
    "source": "Website Inquiry",
    "agent": {
      "id": 42,
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com",
      "phone": "+1987654321"
    },
    "notes": "Prefers email communication",
    "policies": [
      {
        "id": 201,
        "policy_number": "POL-2023-201",
        "product": {
          "id": 12,
          "name": "Term Life Insurance",
          "category": "term"
        },
        "sum_assured": 500000.00,
        "premium_amount": 1200.00,
        "status": "active",
        "issue_date": "2023-06-25",
        "expiry_date": "2043-06-25"
      },
      {
        "id": 305,
        "policy_number": "POL-2023-305",
        "product": {
          "id": 15,
          "name": "Health Insurance Plus",
          "category": "health"
        },
        "sum_assured": 100000.00,
        "premium_amount": 800.00,
        "status": "active",
        "issue_date": "2023-07-10",
        "expiry_date": "2024-07-10"
      }
    ],
    "documents": [
      {
        "id": 701,
        "document_type": "id_proof",
        "document_name": "passport.pdf",
        "upload_date": "2023-06-20T11:30:45Z",
        "verified": true
      },
      {
        "id": 702,
        "document_type": "address_proof",
        "document_name": "utility_bill.pdf",
        "upload_date": "2023-06-20T11:32:20Z",
        "verified": true
      }
    ],
    "created_at": "2023-05-15T10:20:30Z",
    "updated_at": "2023-07-10T15:45:22Z"
  }
}
```

### Create Customer

```
POST /api/customers
```

**Request:**
```json
{
  "first_name": "Jane",
  "last_name": "Doe",
  "date_of_birth": "1985-03-15",
  "gender": "female",
  "email": "jane.doe@example.com",
  "phone_primary": "+1234567890",
  "phone_secondary": null,
  "address_line1": "123 Main St",
  "address_line2": "Apt 4B",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "country": "USA",
  "occupation": "Software Engineer",
  "income_range": "100k-250k",
  "marital_status": "married",
  "has_children": true,
  "source": "Website Inquiry",
  "agent_id": 42,
  "notes": "Prefers email communication"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Customer created successfully",
  "data": {
    "id": 501,
    "customer_code": "CUS501",
    "created_at": "2023-05-15T10:20:30Z"
  }
}
```

### Update Customer

```
PUT /api/customers/{id}
```

**Request:**
```json
{
  "phone_primary": "+1234567891",
  "address_line1": "456 Park Ave",
  "address_line2": "Suite 10C",
  "city": "New York",
  "state": "NY",
  "postal_code": "10022",
  "occupation": "Senior Software Engineer",
  "income_range": "100k-250k",
  "agent_id": 45,
  "notes": "Prefers email communication. Recently moved to a new address."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Customer updated successfully",
  "data": {
    "id": 501,
    "updated_at": "2023-08-05T14:30:22Z"
  }
}
```

### Upload Customer Document

```
POST /api/customers/{id}/documents
```

**Request:**
```
Multipart form data:
- `document_type`: "id_proof"
- `file`: [Binary file data] (Accepted types: PDF, JPG, PNG; Max size: 5MB)
- `notes`: "Passport copy"
```

**Response:**
```json
{
  "status": "success",
  "message": "Document uploaded successfully",
  "data": {
    "id": 701,
    "document_type": "id_proof",
    "document_name": "passport.pdf",
    "upload_date": "2023-06-20T11:30:45Z"
  }
}
```

## 📜 Policy Management

### Get All Policies

```
GET /api/policies
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `customer_id`: Filter by customer ID
- `agent_id`: Filter by agent ID
- `product_id`: Filter by product ID
- `status`: Filter by status (applied, underwriting, issued, active, lapsed, cancelled, matured, claimed)
- `start_date`: Filter by issue date range start
- `end_date`: Filter by issue date range end
- `sort`: Sort field (default: issue_date)
- `order`: Sort order (asc, desc) (default: desc)

**Response:**
```json
{
  "status": "success",
  "total": 850,
  "page": 1,
  "limit": 20,
  "total_pages": 43,
  "has_next": true,
  "has_prev": false,
  "data": [
    {
      "id": 201,
      "policy_number": "POL-2023-201",
      "customer": {
        "id": 501,
        "first_name": "Jane",
        "last_name": "Doe"
      },
      "product": {
        "id": 12,
        "name": "Term Life Insurance",
        "category": "term"
      },
      "agent": {
        "id": 42,
        "first_name": "John",
        "last_name": "Smith"
      },
      "sum_assured": 500000.00,
      "premium_amount": 1200.00,
      "payment_frequency": "annual",
      "status": "active",
      "issue_date": "2023-06-25",
      "expiry_date": "2043-06-25"
    },
    // More policies...
  ]
}
```

### Get Policy Details

```
GET /api/policies/{id}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": 201,
    "policy_number": "POL-2023-201",
    "customer": {
      "id": 501,
      "customer_code": "CUS501",
      "first_name": "Jane",
      "last_name": "Doe",
      "date_of_birth": "1985-03-15",
      "email": "jane.doe@example.com",
      "phone_primary": "+1234567890"
    },
    "product": {
      "id": 12,
      "product_code": "TERM-20",
      "name": "Term Life Insurance",
      "category": "term",
      "description": "20-year term life insurance with fixed premiums"
    },
    "agent": {
      "id": 42,
      "first_name": "John",
      "last_name": "Smith",
      "email": "john.smith@example.com"
    },
    "lead_id": 1001,
    "application_date": "2023-06-15",
    "issue_date": "2023-06-25",
    "effective_date": "2023-07-01",
    "expiry_date": "2043-07-01",
    "sum_assured": 500000.00,
    "premium_amount": 1200.00,
    "payment_frequency": "annual",
    "payment_method": "credit_card",
    "status": "active",
    "beneficiary_name": "Robert Doe",
    "beneficiary_relation": "Spouse",
    "riders": [
      {
        "id": 301,
        "rider_name": "Critical Illness Cover",
        "rider_type": "critical_illness",
        "sum_assured": 100000.00,
        "premium_amount": 300.00,
        "start_date": "2023-07-01",
        "end_date": "2043-07-01",
        "is_active": true
      }
    ],
    "documents": [
      {
        "id": 705,
        "document_type": "application",
        "document_name": "application_form.pdf",
        "upload_date": "2023-06-15T14:20:30Z",
        "verified": true
      },
      {
        "id": 710,
        "document_type": "policy_contract",
        "document_name": "policy_contract.pdf",
        "upload_date": "2023-06-25T10:15:45Z",
        "verified": true
      }
    ],
    "notes": "Policy issued after medical examination",
    "created_at": "2023-06-15T14:25:32Z",
    "updated_at": "2023-06-25T10:20:15Z"
  }
}
```

### Create Policy

```
POST /api/policies
```

**Request:**
```json
{
  "customer_id": 501,
  "product_id": 12,
  "agent_id": 42,
  "lead_id": 1001,
  "application_date": "2023-06-15",
  "sum_assured": 500000.00,
  "premium_amount": 1200.00,
  "payment_frequency": "annual",
  "payment_method": "credit_card",
  "status": "applied",
  "beneficiary_name": "Robert Doe",
  "beneficiary_relation": "Spouse",
  "notes": "Application submitted, pending underwriting"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Policy created successfully",
  "data": {
    "id": 201,
    "policy_number": "POL-2023-201",
    "created_at": "2023-06-15T14:25:32Z"
  }
}
```

### Update Policy Status

```
PUT /api/policies/{id}/status
```

**Request:**
```json
{
  "status": "issued",
  "issue_date": "2023-06-25",
  "effective_date": "2023-07-01",
  "expiry_date": "2043-07-01",
  "notes": "Policy issued after successful underwriting"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Policy status updated successfully",
  "data": {
    "id": 201,
    "status": "issued",
    "updated_at": "2023-06-25T10:20:15Z"
  }
}
```

### Add Policy Rider

```
POST /api/policies/{id}/riders
```

**Request:**
```json
{
  "rider_name": "Critical Illness Cover",
  "rider_type": "critical_illness",
  "sum_assured": 100000.00,
  "premium_amount": 300.00,
  "start_date": "2023-07-01",
  "end_date": "2043-07-01"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Rider added successfully",
  "data": {
    "id": 301,
    "policy_id": 201,
    "created_at": "2023-06-25T10:30:45Z"
  }
}
```

## 💰 Commission Management

### Get Agent Commissions

```
GET /api/commissions
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `agent_id`: Filter by agent ID
- `commission_type`: Filter by type (new_business, renewal, override, bonus)
- `status`: Filter by status (calculated, approved, paid, disputed, adjusted)
- `start_date`: Filter by period start date
- `end_date`: Filter by period end date
- `sort`: Sort field (default: period_start)
- `order`: Sort order (asc, desc) (default: desc)

**Response:**
```json
{
  "status": "success",
  "total": 320,
  "page": 1,
  "limit": 20,
  "total_pages": 16,
  "has_next": true,
  "has_prev": false,
  "data": [
    {
      "id": 1201,
      "policy": {
        "id": 201,
        "policy_number": "POL-2023-201",
        "product": {
          "id": 12,
          "name": "Term Life Insurance"
        }
      },
      "agent": {
        "id": 42,
        "first_name": "John",
        "last_name": "Smith"
      },
      "commission_type": "new_business",
      "period_start": "2023-07-01",
      "period_end": "2023-07-31",
      "premium_amount": 1200.00,
      "commission_rate": 25.00,
      "commission_amount": 300.00,
      "status": "paid",
      "payment_date": "2023-08-15"
    },
    // More commissions...
  ]
}
```

### Calculate Commission

```
POST /api/commissions/calculate
```

**Request:**
```json
{
  "policy_id": 201,
  "agent_id": 42,
  "commission_type": "new_business",
  "period_start": "2023-07-01",
  "period_end": "2023-07-31"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Commission calculated successfully",
  "data": {
    "id": 1201,
    "policy_id": 201,
    "agent_id": 42,
    "commission_type": "new_business",
    "premium_amount": 1200.00,
    "commission_rate": 25.00,
    "commission_amount": 300.00,
    "status": "calculated",
    "created_at": "2023-08-01T09:15:30Z"
  }
}
```

### Update Commission Status

```
PUT /api/commissions/{id}/status
```

**Request:**
```json
{
  "status": "paid",
  "payment_date": "2023-08-15",
  "notes": "Paid via direct deposit"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Commission status updated successfully",
  "data": {
    "id": 1201,
    "status": "paid",
    "updated_at": "2023-08-15T14:30:22Z"
  }
}
```

## 📊 Dashboard & Reporting

### Agent Performance Dashboard

```
GET /api/dashboard/agent-performance
```

**Query Parameters:**
- `agent_id`: Filter by agent ID (optional)
- `start_date`: Start date for metrics (default: 30 days ago)
- `end_date`: End date for metrics (default: today)
- `group_by`: Group results by (day, week, month) (default: day)

**Response:**
```json
{
  "status": "success",
  "data": {
    "period": {
      "start": "2023-07-01",
      "end": "2023-07-31"
    },
    "summary": {
      "leads_assigned": 45,
      "leads_contacted": 42,
      "appointments_scheduled": 30,
      "appointments_completed": 28,
      "proposals_sent": 20,
      "policies_sold": 15,
      "premium_collected": 18500.00,
      "commission_earned": 4625.00,
      "conversion_rate": 33.33
    },
    "trend": [
      {
        "date": "2023-07-01",
        "leads_assigned": 2,
        "leads_contacted": 2,
        "appointments_scheduled": 1,
        "appointments_completed": 1,
        "proposals_sent": 1,
        "policies_sold": 0,
        "premium_collected": 0.00,
        "commission_earned": 0.00
      },
      // More daily data...
    ],
    "comparison": {
      "vs_previous_period": {
        "leads_assigned": 12.5,
        "leads_contacted": 10.5,
        "appointments_scheduled": 15.4,
        "appointments_completed": 16.7,
        "proposals_sent": 11.1,
        "policies_sold": 25.0,
        "premium_collected": 22.3,
        "commission_earned": 22.3,
        "conversion_rate": 10.8
      },
      "vs_team_average": {
        "leads_assigned": 5.2,
        "leads_contacted": 8.3,
        "appointments_scheduled": 12.1,
        "appointments_completed": 15.4,
        "proposals_sent": 18.2,
        "policies_sold": 25.0,
        "premium_collected": 15.7,
        "commission_earned": 15.7,
        "conversion_rate": 20.5
      }
    }
  }
}
```

### 📊 More Filters for Reporting

I'll expand the filtering options for analytics endpoints:

#### Sales Summary Report with Advanced Filters

```
GET /api/reports/sales-summary?start_date=2023-07-01&end_date=2023-07-31&territory_id=5&policy_type=term&demographic_filters[gender]=female&demographic_filters[age_range]=26-35&comparison_period[previous_period]=true&comparison_period[comparison_type]=month_over_month
```

**Query Parameters:**
- `start_date`: Start date for report (required)
- `end_date`: End date for report (required)
- `agent_id`: Filter by agent ID (optional)
- `territory_id`: Filter by territory ID (optional)
- `product_id`: Filter by product ID (optional)
- `policy_type`: Filter by policy type (e.g., `term`, `whole_life`, `health`) (optional)
- `demographic_filters[gender]`: Filter by customer gender (e.g., `male`, `female`, `other`) (optional)
- `demographic_filters[age_range]`: Filter by customer age range (e.g., `26-35`, `36-45`) (optional)
- `comparison_period[previous_period]`: Boolean to include comparison with previous period (optional)
- `comparison_period[comparison_type]`: Type of comparison (e.g., `day_over_day`, `week_over_week`, `month_over_month`, `year_over_year`) (optional)
- `group_by`: Group results by (day, week, month, agent, territory, product) (default: day)

**Response:**
```json
{
  "status": "success",
  "data": {
    "period": {
      "start": "2023-07-01",
      "end": "2023-07-31"
    },
    "summary": {
      "policies_sold": 125,
      "total_premium": 156000.00,
      "total_sum_assured": 62500000.00,
      "average_premium": 1248.00,
      "average_sum_assured": 500000.00
    },
    "breakdown": [
      {
        "date": "2023-07-01",
        "policies_sold": 4,
        "total_premium": 5200.00,
        "total_sum_assured": 2100000.00
      },
      // More data points based on group_by parameter...
    ]
  }
}
```

### Lead Conversion Funnel

```
GET /api/reports/lead-funnel
```

**Query Parameters:**
- `start_date`: Start date for report (required)
- `end_date`: End date for report (required)
- `agent_id`: Filter by agent ID (optional)
- `source_id`: Filter by lead source ID (optional)
- `product_id`: Filter by product interest ID (optional)

**Response:**
```json
{
  "status": "success",
  "data": {
    "period": {
      "start": "2023-07-01",
      "end": "2023-07-31"
    },
    "funnel": {
      "new": {
        "count": 200,
        "percentage": 100.0
      },
      "contacted": {
        "count": 180,
        "percentage": 90.0,
        "conversion_rate": 90.0
      },
      "qualified": {
        "count": 120,
        "percentage": 60.0,
        "conversion_rate": 66.7
      },
      "proposal": {
        "count": 80,
        "percentage": 40.0,
        "conversion_rate": 66.7
      },
      "won": {
        "count": 50,
        "percentage": 25.0,
        "conversion_rate": 62.5
      }
    },
    "lost_reasons": [
      {
        "reason": "Price",
        "count": 15,
        "percentage": 30.0
      },
      {
        "reason": "Competition",
        "count": 12,
        "percentage": 24.0
      },
      {
        "reason": "Product Fit",
        "count": 10,
        "percentage": 20.0
      },
      {
        "reason": "Timing",
        "count": 8,
        "percentage": 16.0
      },
      {
        "reason": "Other",
        "count": 5,
        "percentage": 10.0
      }
    ],
    "average_conversion_time": {
      "new_to_contacted": 1.2, // days
      "contacted_to_qualified": 5.3,
      "qualified_to_proposal": 7.8,
      "proposal_to_won": 10.5,
      "total_cycle": 24.8
    }
  }
}
```

### Commission Report

```
GET /api/reports/commissions
```

**Query Parameters:**
- `start_date`: Start date for report (required)
- `end_date`: End date for report (required)
- `agent_id`: Filter by agent ID (optional)
- `commission_type`: Filter by type (new_business, renewal, override, bonus) (optional)
- `status`: Filter by status (calculated, approved, paid, disputed, adjusted) (optional)
- `group_by`: Group results by (day, week, month, agent, type) (default: month)

**Response:**
```json
{
  "status": "success",
  "data": {
    "period": {
      "start": "2023-07-01",
      "end": "2023-07-31"
    },
    "summary": {
      "total_premium": 156000.00,
      "total_commission": 39000.00,
      "average_commission_rate": 25.0,
      "commission_by_type": {
        "new_business": 30000.00,
        "renewal": 6000.00,
        "override": 2000.00,
        "bonus": 1000.00
      },
      "commission_by_status": {
        "calculated": 5000.00,
        "approved": 10000.00,
        "paid": 24000.00,
        "disputed": 0.00,
        "adjusted": 0.00
      }
    },
    "breakdown": [
      {
        "month": "2023-07",
        "total_premium": 156000.00,
        "total_commission": 39000.00,
        "commission_by_type": {
          "new_business": 30000.00,
          "renewal": 6000.00,
          "override": 2000.00,
          "bonus": 1000.00
        }
      }
      // More data points based on group_by parameter...
    ]
  }
}
```

## 📄 Document Management

### Get Customer Documents

```
GET /api/customers/{id}/documents
```

**Query Parameters:**
- `document_type`: Filter by document type (id_proof, address_proof, income_proof, application, medical_report, policy_contract, other)
- `verified`: Filter by verification status (true, false)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 701,
      "document_type": "id_proof",
      "document_name": "passport.pdf",
      "file_path": "/documents/customers/501/id_proof/passport.pdf",
      "upload_date": "2023-06-20T11:30:45Z",
      "uploaded_by": {
        "id": 42,
        "first_name": "John",
        "last_name": "Smith"
      },
      "verified": true,
      "notes": "Passport copy"
    },
    // More documents...
  ]
}
```

### Download Document

```
GET /api/documents/{id}/download
```

**Response:**
Binary file data with appropriate content type header

### Verify Document

```
PUT /api/documents/{id}/verify
```

**Request:**
```json
{
  "verified": true,
  "notes": "Document verified and approved"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Document verification status updated",
  "data": {
    "id": 701,
    "verified": true,
    "updated_at": "2023-06-21T09:15:30Z"
  }
}
```

## 🔍 Search API

### Global Search

```
GET /api/search
```

**Query Parameters:**
- `query`: Search term (required)
- `type`: Limit search to specific entity type (customers, leads, policies, agents) (optional)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**
```json
{
  "status": "success",
  "total": 15,
  "page": 1,
  "limit": 20,
  "data": {
    "customers": [
      {
        "id": 501,
        "customer_code": "CUS501",
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "jane.doe@example.com",
        "phone_primary": "+1234567890",
        "type": "customer"
      }
    ],
    "leads": [
      {
        "id": 1001,
        "lead_code": "LD10001",
        "first_name": "Jane",
        "last_name": "Doe",
        "status": "contacted",
        "type": "lead"
      }
    ],
    "policies": [
      {
        "id": 201,
        "policy_number": "POL-2023-201",
        "customer_name": "Jane Doe",
        "product_name": "Term Life Insurance",
        "status": "active",
        "type": "policy"
      }
    ],
    "agents": []
  }
}
```

## 🔄 System Configuration

### Get System Settings

```
GET /api/settings
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "company_name": "ABC Insurance",
    "company_logo": "https://example.com/logo.png",
    "currency": "USD",
    "date_format": "MM/DD/YYYY",
    "time_format": "12h",
    "timezone": "America/New_York",
    "lead_statuses": ["new", "contacted", "qualified", "proposal", "won", "lost"],
    "policy_statuses": ["applied", "underwriting", "issued", "active", "lapsed", "cancelled", "matured", "claimed"],
    "document_types": ["id_proof", "address_proof", "income_proof", "application", "medical_report", "policy_contract", "other"],
    "notification_settings": {
      "email_notifications": true,
      "sms_notifications": true,
      "lead_assignment_notification": true,
      "policy_status_change_notification": true
    }
  }
}
```

### Update System Settings

```
PUT /api/settings
```

**Request:**
```json
{
  "company_name": "ABC Insurance Solutions",
  "date_format": "DD/MM/YYYY",
  "notification_settings": {
    "sms_notifications": false
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Settings updated successfully",
  "data": {
    "updated_at": "2023-08-10T11:20:45Z"
  }
}
```

## 📱 Mobile App API Extensions

### Agent Dashboard Summary

```
GET /api/mobile/dashboard
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "agent": {
      "id": 42,
      "name": "John Smith",
      "target_achievement": 68.5,
      "rating": 4.2
    },
    "today": {
      "appointments": 3,
      "leads_assigned": 5,
      "policies_sold": 1,
      "premium_collected": 1500.00
    },
    "this_month": {
      "leads_assigned": 45,
      "leads_contacted": 42,
      "appointments_completed": 28,
      "policies_sold": 15,
      "premium_collected": 18500.00,
      "commission_earned": 4625.00
    },
    "upcoming_appointments": [
      {
        "id": 2501,
        "lead": {
          "id": 1050,
          "first_name": "Michael",
          "last_name": "Johnson",
          "phone_primary": "+1987654321"
        },
        "scheduled_datetime": "2023-08-12T10:00:00Z",
        "location": "Client's Office",
        "appointment_type": "proposal"
      },
      // More appointments...
    ],
    "recent_activities": [
      {
        "type": "policy_created",
        "timestamp": "2023-08-10T15:30:45Z",
        "details": {
          "policy_id": 215,
          "policy_number": "POL-2023-215",
          "customer_name": "Robert Brown",
          "product_name": "Health Insurance Plus"
        }
      },
      // More activities...
    ]
  }
}
```

### Check-in for Appointment

```
POST /api/mobile/appointments/{id}/checkin
```

**Request:**
```json
{
  "latitude": 40.7128,
  "longitude": -74.0060,
  "notes": "Arrived at client's office"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Check-in recorded successfully",
  "data": {
    "id": 2501,
    "actual_datetime": "2023-08-12T10:05:22Z",
    "status": "completed"
  }
}
```

## 🔔 Notifications API

### Get Notifications

```
GET /api/notifications
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `read`: Filter by read status (true, false, all) (default: all)

**Response:**
```json
{
  "status": "success",
  "total": 45,
  "unread_count": 12,
  "page": 1,
  "limit": 20,
  "total_pages": 3,
  "has_next": true,
  "has_prev": false,
  "data": [
    {
      "id": 3001,
      "type": "lead_assigned",
      "title": "New Lead Assigned",
      "message": "A new lead (Jane Doe) has been assigned to you",
      "data": {
        "lead_id": 1055,
        "lead_name": "Jane Doe"
      },
      "read": false,
      "created_at": "2023-08-11T09:30:45Z"
    },
    {
      "id": 3000,
      "type": "policy_status_changed",
      "title": "Policy Status Updated",
      "message": "Policy POL-2023-210 status changed to 'active'",
      "data": {
        "policy_id": 210,
        "policy_number": "POL-2023-210",
        "old_status": "issued",
        "new_status": "active"
      },
      "read": true,
      "created_at": "2023-08-10T16:45:30Z"
    },
    // More notifications...
  ]
}
```

### Mark Notification as Read

```
PUT /api/notifications/{id}/read
```

**Response:**
```json
{
  "status": "success",
  "message": "Notification marked as read",
  "data": {
    "id": 3001,
    "read": true,
    "updated_at": "2023-08-11T10:15:22Z"
  }
}
```

### Mark All Notifications as Read

```
PUT /api/notifications/read-all
```

**Response:**
```json
{
  "status": "success",
  "message": "All notifications marked as read",
  "data": {
    "count": 12,
    "updated_at": "2023-08-11T10:20:15Z"
  }
}
```

## 🔒 API Security & Best Practices

### 🧪 Validation & Error Responses

All API errors return a consistent format, making it easier for clients to handle different types of errors programmatically.

#### Generic Error Response

```json
{
  "status": "error",
  "code": "GENERIC_ERROR",
  "message": "An unexpected error occurred",
  "details": null
}
```

#### Validation Error

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "One or more validation errors occurred",
  "details": {
    "field_name": "Error message for field_name",
    "another_field": "Error message for another_field"
  }
}
```

#### Resource Not Found

```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "The requested resource was not found",
  "details": {
    "resource": "policy",
    "id": "999"
  }
}
```

#### Authentication Error

```json
{
  "status": "error",
  "code": "AUTHENTICATION_FAILED",
  "message": "Invalid credentials provided",
  "details": null
}
```

#### Authorization Error

```json
{
  "status": "error",
  "code": "PERMISSION_DENIED",
  "message": "You do not have permission to perform this action",
  "details": {
    "required_permission": "create_policy"
  }
}
```

#### Rate Limit Exceeded

```json
{
  "status": "error",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests. Please try again later.",
  "details": {
    "retry_after_seconds": 60
  }
}
```

## 🧩 Future Additions

### Webhook Support

```
POST /api/webhooks
```

**Request:**
```json
{
  "event_type": "policy.issued",
  "destination_url": "https://example.com/webhook-receiver",
  "secret": "your_webhook_secret"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Webhook created successfully",
  "data": {
    "id": 101,
    "event_type": "policy.issued",
    "destination_url": "https://example.com/webhook-receiver"
  }
}
```

### Bulk APIs

#### Bulk Lead Import

```
POST /api/leads/bulk
```

**Request:**
```json
[
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "source_id": 1
  },
  {
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane.smith@example.com",
    "source_id": 2
  }
]
```

**Response:**
```json
{
  "status": "success",
  "message": "Bulk leads imported successfully",
  "data": {
    "total_processed": 2,
    "total_created": 2,
    "total_failed": 0,
    "failed_records": []
  }
}
```

### Audit Trail/Activity Logs

```
GET /api/audit-logs
```

**Query Parameters:**
- `user_id`: Filter by user ID
- `action_type`: Filter by action type (e.g., `create`, `update`, `delete`, `login`)
- `resource_type`: Filter by resource type (e.g., `lead`, `customer`, `policy`)
- `start_date`: Start date for logs
- `end_date`: End date for logs
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**
```json
{
  "status": "success",
  "total": 500,
  "page": 1,
  "limit": 20,
  "data": [
    {
      "id": 4001,
      "user": {
        "id": 42,
        "username": "agent123"
      },
      "action_type": "update",
      "resource_type": "lead",
      "resource_id": 1001,
      "description": "Updated lead status from 'contacted' to 'qualified'",
      "timestamp": "2023-08-15T11:00:00Z",
      "ip_address": "203.0.113.45"
    }
  ]
}
```

### Webhook Test Events

```
POST /api/webhooks/{id}/test
```

**Request:**
```json
{
  "event": "policy.issued",
  "custom_payload": {
    "policy_id": 201,
    "policy_number": "POL-2023-201"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "webhook_id": 101,
    "event": "policy.issued",
    "destination_url": "https://example.com/webhook-receiver",
    "request_id": "req_123abc",
    "sent_at": "2023-08-15T10:30:45Z",
    "response": {
      "status_code": 200,
      "body": "{\"received\":true}",
      "headers": {
        "Content-Type": "application/json"
      },
      "response_time_ms": 320
    }
  }
}
```

### 🔐 Security Enhancements

#### IP Whitelisting

```
POST /api/security/ip-whitelist
```

**Request:**
```json
{
  "ip_address": "192.168.1.1",
  "description": "Office IP address"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "IP address added to whitelist"
}
```

#### Enable Two-Factor Authentication (2FA)

```
POST /api/auth/enable-2fa
```

**Request:**
```json
{
  "user_id": 42,
  "method": "sms",
  "phone_number": "+1234567890"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "2FA enabled successfully",
  "data": {
    "user_id": 42,
    "method": "sms",
    "status": "enabled"
  }
}
```

1. **Authentication**: All API endpoints require a valid JWT token obtained through the login API.

2. **Rate Limiting**: API requests are limited to 100 requests per minute per user.
3. **IP Whitelisting**: Access to sensitive APIs can be restricted to a predefined list of IP addresses.
4. **Two-Factor Authentication (2FA)**: For critical operations, 2FA can be enforced.
5. **Token Expiration**: JWT tokens have an explicit expiration time (e.g., 15 minutes for access tokens, 7 days for refresh tokens) and are subject to revocation.

6. **Error Handling**: All API errors return a consistent format:
   ```json
   {
     "status": "error",
     "code": "RESOURCE_NOT_FOUND",
     "message": "The requested resource was not found",
     "details": {
       "resource": "policy",
       "id": "999"
     }
   }
   ```

7. **Versioning**: API versioning is handled through the URL path (e.g., `/api/v1/leads`).

8. **Pagination**: All list endpoints support pagination with `page` and `limit` parameters, and include `total_pages` and `has_next/prev` in the metadata.

9. **Filtering & Sorting**: Most list endpoints support filtering and sorting through query parameters.

10. **CORS**: Cross-Origin Resource Sharing is enabled for the frontend application domain.

11. **Data Validation**: All request payloads are validated against a schema before processing, with clear and informative error responses.

12. **Logging**: API requests are logged for audit and debugging purposes.

13. **Documentation**: Complete API documentation is available through Swagger UI at `/api/docs`.
