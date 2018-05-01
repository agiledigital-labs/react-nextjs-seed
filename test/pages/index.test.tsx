import * as React from 'react';
import { shallow } from 'enzyme';
import Index from '../../pages/index';

describe('Index Page', () => {

  it('Should render "This is a page" text', () => {

    // Act        
    const result = shallow(<Index />);
``
    // Assert    
    expect(result.contains(<h1>This is a page</h1>)).toBeTruthy();

  });

});
