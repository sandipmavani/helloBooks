import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/Header';
import Loading from '../Loading';

const ForgotPasswordForm = props => (
  <div>
    <Header />
    <main>
      <div className="container center">
        <div className="row top-30">
          <div className="col s12 m8 offset-m2">
            <form onSubmit={props.onSubmit}>
              <h6>
                Enter your email address and we&apos;ll send you a link
                to reset your password
              </h6>
              <div
                className="input-field"
              >
                <input
                  type="email"
                  name="email"
                  required="true"
                  placeholder="your email here"
                  title="input is not a valid email"
                />
              </div>
              {props.loading && <Loading />}
              <div
                className="input-field"
              >
                <input
                  type="submit"
                  value={props.buttonText}
                  className="btn teal darken-4"
                  disabled={props.loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
);

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;