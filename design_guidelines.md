# Password Breach Checker Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from security-focused applications like 1Password, Bitwarden, and security dashboards that prioritize trust, clarity, and professional appearance while maintaining approachability.

## Core Design Principles
- **Trust & Security**: Visual design must convey reliability and security
- **Clarity**: Instant understanding of breach status with clear visual hierarchy
- **Professional Minimalism**: Clean, focused interface without distractions

## Color Palette

### Light Mode
- **Primary**: 220 100% 20% (Deep security blue)
- **Success**: 120 60% 35% (Secure green)
- **Danger**: 0 70% 50% (Breach red)
- **Warning**: 35 85% 45% (Caution orange)
- **Background**: 0 0% 98% (Clean white)
- **Surface**: 0 0% 100% (Pure white)
- **Text**: 220 15% 15% (Near black)

### Dark Mode
- **Primary**: 220 100% 70% (Bright security blue)
- **Success**: 120 50% 60% (Safe green)
- **Danger**: 0 65% 65% (Alert red)
- **Warning**: 35 80% 60% (Alert orange)
- **Background**: 220 15% 8% (Dark blue-gray)
- **Surface**: 220 10% 12% (Elevated dark)
- **Text**: 0 0% 95% (Near white)

## Typography
- **Primary Font**: Inter (via Google Fonts CDN)
- **Monospace**: JetBrains Mono (for passwords/hashes)
- **Hierarchy**: text-4xl for main headings, text-xl for section headers, text-base for body, text-sm for metadata

## Layout System
**Spacing Units**: Consistent use of Tailwind units 4, 6, 8, 12, 16 for margins, padding, and gaps
- Small spacing: p-4, m-4
- Medium spacing: p-6, gap-6  
- Large spacing: p-8, m-8
- Section spacing: p-12, m-16

## Component Library

### Core Elements
- **Password Input**: Secure text input with toggle visibility, monospace font
- **Status Cards**: Color-coded cards showing breach status with clear iconography
- **Batch Checker**: Clean table/grid layout for multiple password results
- **Security Indicators**: Badge-style components for breach counts and security levels

### Navigation
- Simple header with app title and dark mode toggle
- Minimal navigation focusing on core functionality

### Forms
- Large, accessible input fields with proper labels
- Submit buttons with loading states
- Clear error messaging with helpful guidance

### Data Display
- Status indicators using color and iconography (shield icons for safe, warning triangles for breached)
- Clean typography hierarchy for password results
- Responsive grid layout for batch results

## Visual Treatment
- **Backgrounds**: Subtle gradients from primary color (220 100% 20% to 220 80% 25%) for headers
- **Shadows**: Soft drop shadows on cards for depth without distraction
- **Borders**: Subtle borders using primary color at low opacity
- **Focus States**: Clear focus indicators using primary color for accessibility

## Animations
**Minimal Implementation**: 
- Smooth color transitions on status changes (300ms ease)
- Subtle loading spinners for API calls
- No decorative animations that could undermine security perception

## Key Pages/Sections
1. **Hero Section**: Clean title, subtitle explaining the service, primary password input
2. **Single Check Results**: Large status display with clear messaging
3. **Batch Checker**: Upload/paste interface with results table
4. **About Security**: Brief explanation of k-anonymity and data safety

The design emphasizes trustworthiness through professional color choices, clear information hierarchy, and security-focused iconography while maintaining modern web standards and accessibility.