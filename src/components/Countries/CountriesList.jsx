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

import classes from "./styles.module.css";

const heightElement = 62;
const buffer = 3;

export default class CountriesTable extends Component {
  state = {
    offset: window.pageYOffset
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scroll);
  }

  scroll = () => {
    if(Math.abs(this.state.offset - window.pageYOffset) > heightElement)
      this.setState({
        offset: window.pageYOffset
      })
  };

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log(Math.abs(prevState.offset - window.pageYOffset))
  }

  handleClick = event => {
    const svg = event.target.closest("svg");

    if (svg) this.props.onOpenDialog(svg.dataset.action, svg.dataset.id);
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

    const calculateStart = Math.floor(this.state.offset / heightElement) - buffer;
    const start =  calculateStart < 0 ? 0 : calculateStart;
    const end = Math.ceil(
      (this.state.offset + window.innerHeight) / heightElement
    );

    const paddingTop = start * heightElement;

    const height = (countries.length + buffer) * heightElement - paddingTop;

    return (
      <Paper
        className={classes.root}
        style={{
          height: `${height}px`,
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
              <TableCell className={classes.actions}>
                <TableSortLabel
                  active={sortField === "id"}
                  direction={sortDirection}
                  onClick={() => onSortCountries("id")}
                  className={classes.title}
                >
                  №
                </TableSortLabel>
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
            {countries.slice(start, end).map(country =>
                <CountriesItem country={country} key={country.id} />
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
