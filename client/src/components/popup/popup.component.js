import React from 'react';
import './popup.styles.scss';

const Popup = ({changeMap, handleChange}) => {
    return(
        <div className='modal'>
            <div className='modal-content'>
                <form id='form1'>
                    <p>Please specify a board</p>
                    <span className='title'>Height:</span><br/>
                    <input name='inputHeight' type='number' onChange={handleChange} required /><br/>
                    <span className='title'>Width:</span><br/>
                    <input name='inputWidth' type='number' onChange={handleChange} required /><br/>
                </form>
                <button type='submit' onClick={changeMap}>SUBMIT</button>
            </div>
        </div>
    );
}

export default Popup;