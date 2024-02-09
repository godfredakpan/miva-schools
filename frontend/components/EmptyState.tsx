
import Image from 'next/image';
import React from 'react';


const EmptyState = () => (
    <div className='text-center mt-8'>
        <div className="flex items-center justify-center">
            <Image
                src={"https://ucarecdn.com/3d067079-e539-4a14-b53a-27a5e84633e3/empty.jpg"}
                alt="Empty Data"
                style={{textAlign: 'center'}}
                className=""
                width={200}
                height={100} />

                <div><br></br>
                <p style={{textAlign: 'center'}}>
                    No Data !
                </p>
                </div>
        </div>

    </div>
);


export default EmptyState;