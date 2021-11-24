import React from "react";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --font-primary: "Poppins", sans-serif;

  --font-size-small: 0.8rem;

  --max-width: 1300px;

  --rounded-small: 4px;
  --rounded-medium: 8px;
  --rounded-large: 16px;

  --color-background: hsla(0, 0%, 10%, 1);
  --color-text: hsla(0, 0%, 90%, 1);

  --color-primary-lightest: hsla(21, 100%, 85%, 1);
  --color-primary-light: hsla(348, 40%, 70%, 1);
  --color-primary: hsla(348, 40%, 63%, 1);
  --color-primary-dark: hsla(348, 25%, 45%, 1);
  --color-dark: hsla(348, 20%, 30%, 1);
  --color-black: hsla(348, 15%, 20%, 1);

  --shadow-color: hsla(348, 35%, 20%, .06);
  --shadow: 1px 2px 2px var(--shadow-color), 2px 4px 4px var(--shadow-color),
		4px 8px 8px var(--shadow-color), 8px 16px 16px var(--shadow-color),
		16px 32px 32px var(--shadow-color);

  --gradient-bottom-right: linear-gradient(135deg, var(--color-primary-light), var(--color-primary), var(--color-primary-dark));
}

`;
