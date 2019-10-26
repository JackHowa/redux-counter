import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import './styles.scss';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const initialState = {
  count: 0,
};

const incrementValue = () => ({
  type: INCREMENT,
});

const decrementValue = () => ({
  type: DECREMENT,
});

const resetValue = () => ({
  type: RESET,
});

const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1,
    };
  } else if (action.type === DECREMENT) {
    return {
      count: state.count - 1,
    };
  } else if (action.type === RESET) {
    return {
      count: 0,
    };
  }
  return state;
};

const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment, decrement, reset } = this.props;
    console.log({ count, increment });
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </section>
      </main>
    );
  }
}

// even if the whole component changed
// it'd trigger a re-render from here
const mapStateToProps = state => {
  return state;
};

// points to store.dispatch
const mapDispatchToProps = dispatch => {
  return {
    increment() {
      dispatch(incrementValue());
    },
    decrement() {
      dispatch(decrementValue());
    },
    reset() {
      dispatch(resetValue());
    },
  };
};

// returns a function waiting for a react component
// container pattern with state
// creates hoc
const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);

render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('root'),
);
