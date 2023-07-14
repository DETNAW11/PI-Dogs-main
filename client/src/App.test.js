import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { App } from './App.js';
import Home from './components/Home';
import NavHeader from './components/NavHeader';
import CreateForm from './components/CreateForm';


configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('FRONT TESTING....', () => {
   
    it('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    
    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(NavHeader)).toHaveLength(0);
    expect(wrapper.find(CreateForm)).toHaveLength(0);
  });
  
  it('El componente CreateForm debe renderizar en la ruta /create - este test no pasará si Otro componente (que no sea CreateForm) se renderiza en esta ruta.', () => {
    const container = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={[  '/create' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(container.find(NavHeader)).toHaveLength(0);
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(CreateForm)).toHaveLength(1);
  });
});
  
});

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
