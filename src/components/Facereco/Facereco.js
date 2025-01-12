import React from 'react';
import './Facereco.css';

const Facereco = ({ imageUrl, box }) => {
    return (
        <div className='center'>
            <div className='relative mt2'>
                {imageUrl && (
                    <img 
                        id='inputImage'
                        src={imageUrl} 
                        alt='Detected face'
                        onError={(e) => console.log('Image loading error:', e)} 
                        style={{ maxWidth: '500px', width: '100%', height: 'auto' }}
                    />
                )}
                {/* Add bounding box div */}
                {box && (
                    <div 
                        className='bounding-box'
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol
                        }}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default Facereco;