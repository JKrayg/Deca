import React from 'react'
import './style.css'

function Geometry() {
    return (
        <React.Fragment>
            <div id='shape-col1'>
                <div id='ringStyle' className='ring'>
                    <img id='ringImgStyle' alt='ring' src='https://i.imgur.com/ZFDWVuf.png' />
                </div>
                <div id='geoStyle' className='geo'>
                    <img id='geoImgStyle' alt='geo' src='https://i.imgur.com/bF5AL5u.png' />
                </div>
            </div>
            <div id='shape-col2'>
                <div>
                    <img id='ringImgStyle2' alt='geo' src='https://i.imgur.com/y67tiOW.png'/>
                </div>
                <div>
                    <img id='geoImgStyle2' alt='geo' src='https://i.imgur.com/bF5AL5u.png' />
                </div>
            </div>
            <div id='shape-col3'>
                <div>
                    <img id='ringImgStyle3' alt='geo' src='https://i.imgur.com/pREvLMg.png'/>
                </div>
                <div>
                    <img id='geoImgStyle3' alt='geo' src='https://i.imgur.com/bF5AL5u.png' />
                </div>
            </div>
            {/* <div id='shape-col4'>
                <div>
                    <img id='ring1' alt='geo' src='https://i.imgur.com/VfFxXQ2.png'/>
                </div>
                <div>
                    <img id='ring2' alt='geo' src='https://i.imgur.com/VfFxXQ2.png'/>
                </div>
                <div>
                    <img id='ring3' alt='geo' src='https://i.imgur.com/VfFxXQ2.png'/>
                </div>
                
            </div> */}
        </React.Fragment>
                
        
    )
}


export default Geometry;