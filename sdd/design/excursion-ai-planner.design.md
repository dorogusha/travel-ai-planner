Excursion Ai Planner Design

Scope

- Baseline UI: title-only landing page, then interactive map with side panel.

- Minimal, modular, and extensible design for future features.

Decisions

- Use Nuxt page and layout system.

- Use Quasar UI library for all components and layout.

- Map occupies main area; side panel (QDrawer) on the left with two tabs: Info and Chat.

- Search field at the top of the map, similar to Google Maps.

- Route management and export features accessible from the side panel.

- Notes and photo upload available in location info tab.

File Mapping

- pages/index.vue - landing page and main app entry.

- layouts/home.vue - home page wrapper.

- layouts/default.vue - fallback wrapper.

- components/MapView.vue - main map component.

- components/SidePanel.vue - left panel with tabs.

- components/LocationInfo.vue - info tab content.

- components/LocationChat.vue - chat tab content.

- components/RouteManager.vue - route management UI.

- components/NotesUploader.vue - notes and photo upload.

Future Extension Points

- Add more data sources for location info (e.g., Wikipedia, Wikidata).

- Enhance AI chat with context-aware prompts.

- Add user authentication for saving personal routes.

- Introduce advanced styling and theming after feature specs define UI behavior.