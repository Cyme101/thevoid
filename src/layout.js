import { css } from "styled-components";

// Page content is centered, at most this wide, with side padding (the
// "gutter") that grows with the screen: 16px on phones up to 56px.
export const MAX_CONTENT_WIDTH = 1400;
export const gutter = "clamp(16px, 4vw, 56px)";

// Apply to a section's inner wrapper. Full-width backgrounds stay on the
// outer element; only the content gets the max width and side padding.
export const contained = (maxWidth = MAX_CONTENT_WIDTH) => css`
  box-sizing: border-box;
  margin-inline: auto;
  max-width: ${maxWidth}px;
  padding-inline: ${gutter};
  width: 100%;
`;
