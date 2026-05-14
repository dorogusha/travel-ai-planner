Excursion Ai Planner Specification

Problem

Users need a lightweight, interactive assistant for planning and exploring excursions, with seamless integration of map, location-based content, and AI-powered insights.

Goals

- Provide a clean, intuitive landing page with the product title.

- Enable users to search for locations or select points on a map.

- Display a list of interesting places and landmarks near a selected point.

- Show detailed information about a selected location: current status, history, legends, architecture, notable people, and facts.

- Allow users to ask clarifying questions about locations and receive concise AI-generated answers.

- Let users add locations to a route, view the route on the map, and export/share/save it (e.g., as JSON or link).

- Persist the last selected points and routes between sessions.

- Support adding notes and photos to locations.

- Keep UI minimal as a baseline for future feature increments.

Functional Requirements

- The main page must render the title Excursion Ai Planner.

- The map component must occupy the main area, support search, and allow point selection.

- On selecting a point, display a side panel with two tabs: location info and AI chat.

- The location info tab must show: name, address, current status, historical facts, legends, architecture, notable people, and interesting facts.

- The AI chat tab must allow users to ask questions about the selected location or nearby places.

- Users can add locations to a route, view the route, and export/share/save it.

- The app must persist the last selected points and routes between sessions.

- Users can add notes and photos to locations.

Non-Functional Requirements

- Keep implementation modular and maintainable.

- Use Quasar UI library for consistent, responsive design.

- Integrate Google Maps and Places APIs for map and location data.

- Integrate OpenAI/Gemini API for AI chat.

- Keep styling minimal until feature-level specs are added.

Acceptance Criteria

- Navigating to / shows Excursion Ai Planner.

- The map is visible and interactive.

- Users can search/select points and view info in the side panel.

- The side panel supports two tabs: info and chat.

- Users can add points to a route, view, export, and share the route.

- The last selected points and routes persist after reload.

- No previous branded headers, footers, or decorative styles remain.