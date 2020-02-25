import React, {Component} from "react";
import shortid from "shortid";

import withModal from "../HOC/withModal";

import classnames from "classnames";
import classes from "./styles.module.css";

class Dialog extends Component {
  constructor(props){
    super(props);
    const { country: {id = shortid.generate(), name = "", capital =""} } = this.props;

    this.state = {
      id, 
      name, 
      capital
    }
  }

  handleChange(field, {target: {value}}) {
    this.setState({
      [field]: value
    });
  }

  render() {
    const { close, onSubmit } = this.props;
    const { id, name, capital } = this.state;

    return (
      <div className={classes.wrapper}>
        <form
          onSubmit={event => {
            event.preventDefault();
            onSubmit({id, name, capital});
            close();
          }}
        >
          <div className={classes.inputWrapper}>
            <label htmlFor={name}>Name:</label>
            <input
              className={classes.inputName}
              id="name"
              value={name}
              onChange={this.handleChange.bind(this, "name")}
              placeholder="Please input name of country"
              required
              autoFocus={true}
            />
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor={name}>Capital:</label>
            <input
              className={classes.inputName}
              id="capital"
              value={capital}
              onChange={this.handleChange.bind(this, "capital")
              }
              placeholder="Please input capital of country"
              required
            />
          </div>

          <div className={classes.actionPanel}>
            <button
              className={classnames(classes.btn, classes.btnCancel)}
              type="button"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className={classnames(classes.btn, classes.btnPrimary)}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Dialog.defaultProps = {
  country: {}
}

export default withModal(Dialog);
