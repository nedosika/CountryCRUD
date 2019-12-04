import React from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import classes from "./styles.module.css";

const CountriesItem = React.memo(props => {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.country.id !== nextProps.country.id;
  // }
  // componentDidMount() {
  //   console.log("CountriesItem mounted");
  // }
  // componentDidUpdate() {
  //   console.log("CountriesItem updated");
  // }
  // render() {
    const { country } = props;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          <DeleteIcon
            className={classes.icon}
            data-action="isDelete"
            data-id={country.id}
          />
          <EditIcon
            className={classes.icon}
            data-action="isEdit"
            data-id={country.id}
          />
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {country.id}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {country.name}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {country.capital}
        </TableCell>
      </TableRow>
    );
  
});


export default CountriesItem;