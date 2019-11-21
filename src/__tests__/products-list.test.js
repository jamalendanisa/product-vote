import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import ProductsList from '../components/products-list/products-list';
import '../setupTests';

const mockStore = configureMockStore();
const store = mockStore({ products: { 
  products :[
    { id: 1,
      title: 'Yellow Pail',
      description: 'On-demand sand castle construction expertise.',
      url: '/abc.com',
      votes: 33,
      submitterAvatarUrl: 'images/avatars/daniel.jpg',
      productImageUrl: 'images/products/image-aqua.png',
    }],
  pending : false}});

it('renders without crashing', () => {
  shallow(<Provider store={store}>
    <ProductsList />
  </Provider>);
});

it('should show loader when data is empty', () => {
  const store = mockStore({ products: { products :[], pending : true}});
  const wrapper = mount((<Provider store={store}>
    <ProductsList />
  </Provider>
  ));
  expect(wrapper.find('.loader').length).toEqual(1);
});

it('should hide loader when data is not empty', () => {
  const wrapper = mount((<Provider store={store}>
    <ProductsList />
  </Provider>
  ));
  expect(wrapper.find('.loader').length).toEqual(0);
});

it('increases votes by 1 when the vote button is clicked ', () => {
  const wrapper = mount((<Provider store={store}>
    <ProductsList />
  </Provider>
  ));
  const voteBefore = parseInt(wrapper.find('span').text());
  const voteBtn = wrapper.find('.vote img');

  voteBtn.simulate('click');

  const voteAfter = parseInt(wrapper.find('span').text());
  expect(voteAfter).toEqual(voteBefore + 1);
});



