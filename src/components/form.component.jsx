import React from 'react';

import './scss/form.style.scss';

const Form = (props) => {
  const isWrongData = () => {
    return (
      <div className={'error alert alert-danger mx-5'} role="alert" > You wrote wrong city or country name</div>
    );
  };
  const isError = () => {
    return (
      <div className="error alert alert-warning mx-5" role="alert">Please enter City and Country</div>
    )
  };
  return (
    <div className="container">
      <div>{props.wrongData ? isWrongData() : null}</div>
      <div>{props.error ? isError() : null}</div>
      <form onSubmit={props.loadweather}>
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City" />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country" />
          </div>
          <div className="col-md-3 mt-md-0 py-2 text-md-left">
            <button className="btn btn-warning">Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;