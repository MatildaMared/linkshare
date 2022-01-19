import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --max-width: 1200px;

  --font-primary: "Outfit", sans-serif;
  --font-secondary: "Inter", sans-serif;

  --font-size-default: 1rem;
  --font-size-small: 0.75rem;

  --rounded-small: 4px;
  --rounded-medium: 8px;
  --rounded-large: 16px;

  --color-background: hsla(0, 0%, 10%, 1);
  --color-text: hsla(0, 0%, 90%, 1);

  --color-primary: hsla(170, 60%, 50%, 1);
  --color-primary-dark: hsla(175, 94%, 24%, 1.0);
  --color-accent: hsla(270, 60%, 63%, 1);

  --outline: 2px dotted var(--color-primary);
  --outline-offset: 4px;
}`;
