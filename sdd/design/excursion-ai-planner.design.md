# Excursion Ai Planner Design

## Scope

Initial baseline UI reset and title-only landing page.

## Decisions

- Use existing Nuxt page and layout system.
- Keep `home` and `default` layouts as plain wrappers with no visual styling.
- Render title directly in `pages/index.vue`.

## File Mapping

- `pages/index.vue` - landing page content.
- `layouts/home.vue` - home page wrapper.
- `layouts/default.vue` - fallback wrapper.

## Future Extension Points

- Add reusable UI components under `components/` when features are introduced.
- Introduce styling strategy only after feature specs define UI behavior.

