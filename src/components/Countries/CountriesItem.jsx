import React, {PureComponent} from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import classes from "./styles.module.css";

export default class CountriesItem extends PureComponent {
  render(){
    const {country, index} = this.props;
    
    return(
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
          {index + 1}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {country.name}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {country.capital}
        </TableCell>
      </TableRow>
    );
  }
}
