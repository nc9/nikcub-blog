import React from "react"
import format from "date-fns/format"

const DateTime = ({ date }) => (
  <time>{ format(Date.parse(date), "co MMMM yyyy") }</time>
)

export default DateTime
