import React from 'react'
import classes from './Error.module.css'
import ReactDOM from 'react-dom'

function Error(props) {
    return ReactDOM.createPortal(<>
        <div className={classes.back} id='infront'>
            <div className={classes.cont}>
                <div className={classes.left}>
                    <h1>{props.title}</h1>
                    <p>{props.body}</p>
                </div>
                <div className={classes.right} >
                <button onClick={props.handler}>CLOSE</button>
            </div>
           </div>
      </div>
  </>,
      document.getElementById('portal1')
  )
}

export default Error