# Dashboard UI - Next.js & Tailwind CSS

A modern, responsive dashboard interface built with Next.js, Tailwind CSS, and Zod for form validation. This project features a dark theme with vibrant accent colors, matching the provided design reference.

## Features

- 🎨 **Dark Theme Design** - Modern dark interface with purple and cyan accents
- 📱 **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Authentication Pages** - Login and registration forms with Zod validation
- 👥 **Role Selection** - User registration with role-based access control
- 📊 **Dashboard Components** - Stat cards, charts, calendar, and data tables
- 🎯 **Form Validation** - Robust form handling with Zod schema validation
- ⚡ **Next.js 14** - Built with the latest Next.js features and App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework for rapid development

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main dashboard page
│   ├── login/page.tsx      # Login page with validation
│   ├── register/page.tsx   # Registration page with role selection
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Header.tsx          # Top header with search and profile
│   ├── StatCards.tsx       # Key metrics cards
│   ├── SalesChart.tsx      # Sales chart component
│   ├── Calendar.tsx        # Calendar widget
│   └── CustomerTable.tsx   # Customer data table
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

### Dashboard (`/`)
- Main dashboard with all components
- Stat cards showing key metrics
- Sales chart and calendar widgets
- Customer data table
- Additional metrics and visitor stats

### Login (`/login`)
- Email and password authentication
- Form validation with Zod
- Social login options (Google, Twitter)
- Remember me functionality
- Link to registration page

### Register (`/register`)
- User registration with role selection
- Comprehensive form validation
- Password confirmation
- Terms and conditions acceptance
- Link to login page

## Components

### Sidebar
- Fixed navigation sidebar
- Collapsible design
- Icon-based menu items
- Active state indicators

### Header
- Search functionality
- User profile display
- Dashboard title with custom font

### Stat Cards
- Three main metric cards
- Gradient backgrounds
- Hover animations
- Icon decorations

### Sales Chart
- Chart placeholder (no actual graphs)
- Year selector
- Download functionality
- Legend and labels

### Calendar
- Monthly calendar view
- Date selection
- February 2023 layout
- Interactive date picking

### Customer Table
- Customer data display
- Status indicators
- Filter and download options
- Pagination controls

## Styling

The project uses a custom Tailwind CSS configuration with:

- **Dark Theme Colors**: Gray-900, Gray-800, Gray-700
- **Accent Colors**: Purple, Cyan, Yellow, Pink, Green, Red
- **Custom Fonts**: Dancing Script for titles
- **Gradients**: Purple to Cyan, Purple to Pink
- **Glass Effects**: Backdrop blur and transparency

## Form Validation

All forms use Zod schema validation with react-hook-form:

- **Login Form**: Email and password validation
- **Register Form**: Name, email, password, role selection
- **Password Confirmation**: Matching password validation
- **Role Selection**: Required role choice

## Responsive Design

The dashboard is fully responsive with:

- **Desktop**: Full layout with sidebar and all components
- **Tablet**: Adjusted grid layouts and spacing
- **Mobile**: Stacked layout with mobile-optimized navigation

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
colors: {
  gray: {
    900: '#0f0f23',
    800: '#1a1a2e',
    // ... more colors
  },
  purple: {
    400: '#a855f7',
    500: '#8b5cf6',
    // ... more colors
  }
}
```

### Components
All components are modular and can be easily customized by editing their respective files in the `components/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Design inspiration from the provided dashboard image
- Built with Next.js and Tailwind CSS
- Form validation powered by Zod and react-hook-form
