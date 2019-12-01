import React, { Component } from "react";

import classes from "./styles.module.css";

export default WrappedComponent => {
  return class withModal extends Component {
    ModalRef = React.createRef();

    handleESC = event => {
      if (event.keyCode === 27) {
        this.props.close();
      }
    };
  
    componentDidMount() {
      document.addEventListener("keydown", this.handleESC);
    }
  
    componentWillUnmount() {
      document.removeEventListener("keydown", this.handleESC);
    }

    handleMouseDown = ({target}) => {
      if (target === this.ModalRef.current) {
        this.props.close();
      }
    };

    render() {
      const { title, close, isOpen} = this.props;

      return isOpen ? 
        <div
          className={classes.modal}
          onMouseDown={this.handleMouseDown}
          ref={this.ModalRef}
        >
          <div className={classes.modalContent}>
            <span className={classes.close} onClick={close}>
              &times;
            </span>
            <header className={classes.modalTitle}>{title}</header>
            <WrappedComponent {...this.props} />
          </div>
        </div> :
        null
    }
  }
};