import React from "react";

import withModal from "../HOC/withModal";

import classes from "./styles.module.css";
import classnames from "classnames";

const DeleteDialog = ({onSubmit, close}) => {
  return (
    <div>
      <div className={classes.question}>Are you sure?</div>
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit();
          close();
        }}
      >
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
            autoFocus={true}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default withModal(DeleteDialog);
