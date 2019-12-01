import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../actions/actions";

import CountriesList from "./CountriesList";
import Dialog from "../Dialog";
import DeleteDialog from "../DeleteDialog";

import { applyFilter } from "../../services/countryService";

class CountriesPage extends Component {
  state = {
    isDelete: false,
    isEdit: false,
    isAdd: false,
    id: null
  };

  closeDialogs = () => {
    this.setState({
      isDelete: false,
      isEdit: false,
      isAdd: false
    });
  };

  handleOpenDialog = (field, id) => {
    this.setState({
      [field]: true,
      id
    });
  };

  render() {
    const {
      countries,
      removeCountry,
      addCountry,
      updateCountry,
      sortCountries,
      filterCountries,
      ...restProps
    } = this.props;
    const { isEdit, isAdd, isDelete, id } = this.state;

    return (
      <>
        <CountriesList
          countries={countries}
          onFilterCountries={filterCountries}
          onSortCountries={sortCountries}
          onOpenDialog={this.handleOpenDialog}
          {...restProps}
        />

        <DeleteDialog
          isOpen={isDelete}
          title="Delete Dialog"
          onSubmit={() => removeCountry(id)}
          close={this.closeDialogs}
        />

        <Dialog
          isOpen={isEdit}
          title="Edit Dialog"
          onSubmit={country => updateCountry(country)}
          country={countries.find(country => country.id === id)}
          close={this.closeDialogs}
        />

        <Dialog
          isOpen={isAdd}
          title="Add Dialog"
          onSubmit={country => addCountry(country)}
          country={{}}
          close={this.closeDialogs}
        />
      </>
    );
  }
}

const mapStateToProps = ({ countries, filter, sortField, sortDirection }) => ({
  countries: applyFilter(countries, filter, sortField, sortDirection),
  sortField,
  sortDirection
});

export default connect(
  mapStateToProps,
  actions
)(CountriesPage);
