import React from 'react'

const input = React.forwardRef(({ label, inputProps, error, onchange, errorText, onblur }, ref) => {
  const classes = `input ${error ? 'error' : ''}`
  return (
    <div className={classes}>
      <label>{label}</label><br></br>
      <input {...inputProps} ref={ref} onChange={onchange} onBlur={onblur} />
      {error && <p>{errorText }</p>}
    </div>
  )
})

export default input