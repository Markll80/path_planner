import React from 'react';
import Cell from '../components/cell/cell.component';
import { shallow } from 'enzyme';

describe('Cell component', () => {
    it('Has cell in class name', () => {
        const wrapper = shallow(<Cell />);
        // const countState = wrapper.state().count
        // console.log(wrapper.find('.cell').length);
        expect(wrapper.find('.cell')).toHaveLength(1);
        // console.log(expect(wrapper.find('.cell')));
    });

    it('Has start in class name', () => {
        const wrapper = shallow(<Cell isStart={true} />);
        expect(wrapper.find('.cell')).toHaveLength(1);
        expect(wrapper.find('.start')).toHaveLength(1);
    });

    it('Has goal in class name', () => {
        const wrapper = shallow(<Cell isGoal={true} />);
        expect(wrapper.find('.cell')).toHaveLength(1);
        expect(wrapper.find('.goal')).toHaveLength(1);
    });

    it('Has path in class name', () => {
        const wrapper = shallow(<Cell inPath={true} />);
        expect(wrapper.find('.cell')).toHaveLength(1);
        expect(wrapper.find('.path')).toHaveLength(1);
    });

    it('Has value in class name', () => {
        const wrapper = shallow(<Cell value={10} />);
        expect(wrapper.find('.cell')).toHaveLength(1);
        expect(wrapper.find('.value')).toHaveLength(1);
    });
})