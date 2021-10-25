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

html {
  font-family: var(--font-primary);
  font-weight: 300;
  color: var(--color-black);
}

body {
  background: var(--gradient-bottom-right);
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

h1, h2 {
    font-weight: 800;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

`;
