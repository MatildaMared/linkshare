import React from "react";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --max-width: 1200px;

  --font-primary: "Outfit", sans-serif;
  --font-secondary: "Outfit", sans-serif;

  --font-size-default: 1rem;
  --font-size-small: 0.8rem;

  --rounded-small: 4px;
  --rounded-medium: 8px;
  --rounded-large: 16px;

  --color-background: hsla(0, 0%, 10%, 1);
  --color-text: hsla(0, 0%, 90%, 1);

  --color-primary: hsla(270, 60%, 63%, 1);
  --color-accent: hsla(165, 60%, 63%, 1);
}`;
