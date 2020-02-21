import React from 'react';
import './popup.styles.scss';

const Popup = ({handleSubmit, handleChange}) => {
    return(
        <div className='modal'>
            <div className='modal-content'>
                <form id='form1' onSubmit={handleSubmit}>
                    <input name='inputHeight' type='number' onChange={handleChange} required />
                    <input name='inputWidth' type='number' onChange={handleChange} required />
                    <br/>
                    <input name='startI' type='number' onChange={handleChange} required />
                    <input name='startJ' type='number' onChange={handleChange} required />
                    <br/>
                    <input name='goalI' type='number' onChange={handleChange} required />
                    <input name='goalJ' type='number' onChange={handleChange} required />
                </form>
                <button type='submit' onClick={handleSubmit}>SUBMIT</button>
                {/* <p>POP!</p> */}
            </div>
        </div>
    );
}

export default Popup;