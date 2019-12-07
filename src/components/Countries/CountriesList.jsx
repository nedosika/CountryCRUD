import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@material-ui/core/TextField";

import CountriesItem from "./CountriesItem";

import Utils from "../../utils/";

import classes from "./styles.module.css";

const heightElement = 62;
const buffer = 25;

export default class CountriesTable extends Component {
  state = {
    offset: window.pageYOffset
  };

  componentDidMount() {
    window.addEventListener("scroll", Utils.throttle(this.update, 200));
    window.addEventListener("resize", Utils.debounce(this.update, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", Utils.throttle(this.update, 200));
    window.removeEventListener("resize", Utils.debounce(this.update, 100));
  }

  update = () => {
    this.setState({
      offset: window.pageYOffset
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("CountriesList update");
  }

  handleClick = ({target}) => {
    if (target.closest("svg")) {
      const { action, id } = target.closest("svg").dataset;
      this.props.onOpenDialog(action, id);
    }
  };

  render() {
    const {
      countries,
      onSortCountries,
      sortDirection,
      sortField,
      onFilterCountries,
      onOpenDialog
    } = this.props;

    const calculateStart =
      Math.floor(window.pageYOffset / heightElement) - buffer;

    const startElementPosition = calculateStart < 0 ? 0 : calculateStart;

    const endElementPosition = Math.ceil(
      (window.pageYOffset + window.innerHeight) / heightElement + buffer
    );

    const paddingTop = startElementPosition * heightElement;

    const heightElements = (countries.length + 3) * heightElement - paddingTop;

    return (
      <Paper
        className={classes.root}
        style={{
          height: `${heightElements}px`,
          paddingTop: `${paddingTop}px`
        }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
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
            <TableRow>
              <TableCell className={classes.actions}>
                <span className={classes.title}>Actions</span>
              </TableCell>
              <TableCell>
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
          <TableBody onClick={this.handleClick} ref={this.TableBodyRef}>
            {countries
              .slice(startElementPosition, endElementPosition)
              .map((country, index) => (
                <CountriesItem
                  country={country}
                  key={country.id}
                  index={
                    sortDirection === "desc"
                      ? startElementPosition + index + 1
                      : countries.length - index - startElementPosition
                  }
                />
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
