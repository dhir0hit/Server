import React from 'react';
import { Space, Spin } from 'antd';
// const Loading = () => {
//     return <div className={'Loading'}>
//         <div>
//             <div><span>L</span></div>
//             <div><span>O</span></div>
//             <div><span>A</span></div>
//             <div><span>D</span></div>
//             <div><span>I</span></div>
//             <div><span>N</span></div>
//             <div><span>G</span></div>
//             <div><span>.</span></div>
//             <div><span>.</span></div>
//             <div><span>.</span></div>
//         </div>
//     </div>;
// }

const Loading = () => {

    return <div className={'Loading'}>
        <Space size={'large'}>
            <Spin size='large' />
        </Space>

        <h1>Loading...</h1>
        
    </div>;
}
export default Loading;