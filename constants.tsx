

// FIX: Removed the import of `Page` and the explicit type annotation on `PAGES` to break a circular dependency.
// By using `as const`, this constant becomes the single source of truth from which the `Page` type is inferred in `types.ts`.
export const PAGES = ['Home', 'Posters', 'Research', 'Guidelines', 'Contact'] as const;

export const SITE_TITLE = "Neurodivergent Representation in Media";
export const SITE_SUBTITLE = "An Interdisciplinary Major Project";