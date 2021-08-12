import React from 'react'
import format from 'date-fns/format'

const ButtonLink = ({ link, children }) => (
  <a
    sx={{
      appearance: 'none',
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: 'inherit',
      textDecoration: 'none',
      fontSize: 'inherit',
      fontWeight: 'bold',
      m: 0,
      px: 3,
      py: 2,
      border: 0,
      borderRadius: 4,
      variant: 'buttons.primary',
    }}
    className="entryButton"
    href={link}
  >
    {children}
  </a>
)

export default ButtonLink
