import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TableFooter from "@material-ui/core/TableFooter";
import TextField from "@material-ui/core/TextField";

import { isEqual } from "../../utils";
import CountriesItem from "./CountriesItem";

import classes from "./styles.module.css";

export default class CountriesList extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.countries, nextProps.countries);
  }

  componentDidUpdate() {
    console.log("CountriesListUpdated");
  }

  handleClick = event => {
    const svg = event.target.closest("svg");

    if (svg) this.props.onOpenDialog(svg.dataset.action, svg.dataset.id);
  };

  render() {
    //console.log(this.props)
    const {
      countries,
      onSortCountries,
      sortDirection,
      sortField,
      onFilterCountries,
      onOpenDialog
    } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.actions}>
                <span className={classes.title}>Actions</span>
              </TableCell>
              <TableCell className={classes.actions}>
                <span className={classes.title}>№</span>
              </TableCell>
              <TableCell
                sortDirection={sortField === "name" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortDirection}
                  onClick={() => onSortCountries("name")}
                  className={classes.title}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortField === "capital" ? sortDirection : false}
              >
                <TableSortLabel
                  active={sortField === "capital"}
                  direction={sortDirection}
                  onClick={() => onSortCountries("capital")}
                  className={classes.title}
                >
                  Capital
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody onClick={this.handleClick}>
            {countries.map((country, index) => 
              <CountriesItem country={country} key={country.id} index={index}/>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div className={classes.footerActions}>
                  <AddCircleIcon
                    className={classes.icon}
                    onClick={() => onOpenDialog("isAdd")}
                  />
                  <TextField
                    label="Filter"
                    className={classes.findFild}
                    onChange={({ target: { value } }) =>
                      onFilterCountries(value)
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}