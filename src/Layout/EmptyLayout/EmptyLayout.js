import React from 'react';
import {useHistory} from 'react-router';

const EmptyLayout=({children})=>{
    return <div className='empty-layout-style'>
        {children}
    </div>
}

export default EmptyLayout;