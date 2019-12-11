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

import { debounce } from "../../utils/";

import classes from "./styles.module.css";

const heightElement = 62;
const buffer = 3;

export default class CountriesTable extends Component {
  state = {
    offset: window.pageYOffset,
    windowHeight: window.innerHeight
  };

  componentDidMount() {
    window.addEventListener("scroll", this.update);
    window.addEventListener("resize", debounce(this.update, 100));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.update);
    window.removeEventListener("resize", debounce(this.update, 100));
  }

  shouldComponentUpdate(props, state) {
    return (
      this.state.windowHeight !== window.innerHeight ||
      this.state.offset !== state.offset ||
      this.props.countries !== props.countries
    );
  }

  update = () => {
    if (
      Math.abs(this.state.offset - window.pageYOffset) >
        buffer * heightElement ||
      this.state.windowHeight !== window.innerHeight
    )
      this.setState({
        offset: window.pageYOffset,
        windowHeight: window.innerHeight
      });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("CountriesList update");
  }

  handleClick = ({ target }) => {
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

    const startPosition =
      Math.floor(window.pageYOffset / heightElement) - 2 * buffer;

    const startElementPosition = Math.max(0, startPosition);

    const endElementPosition = Math.ceil(
      (window.pageYOffset + window.innerHeight) / heightElement
    );

    const paddingTop = startElementPosition * heightElement;

    return (
      <div
        style={{
          height: `${countries.length * heightElement}px`
        }}
      >
        <Paper
          className={classes.root}
          style={{
            paddingTop: `${paddingTop}px`
          }}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>
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
                  sortDirection={
                    sortField === "capital" ? sortDirection : false
                  }
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
                .map((country, key) => (
                  <CountriesItem country={country} key={key} />
                ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
