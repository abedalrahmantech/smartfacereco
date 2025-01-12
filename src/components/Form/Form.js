import React from 'react';
import './Form.css';

const Form = ({onInputChange, onSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic App will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='form-container pa4 br3 shadow-5' style={{ maxWidth: '500px', width: '90%' }}>
                    <input type='text' className='f4 pa2 w-100 center' onChange={onInputChange} />
                    <button className='grow f4 link ph3 pv2 dib white bg-light-purple mt3' onClick={onSubmit} style={{ width: 'auto' }}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Form;