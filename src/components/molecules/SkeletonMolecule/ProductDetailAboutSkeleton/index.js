import {React, Skeleton, Suspense} from 'libraries';

const ProductDetailAboutSkeleton = (props) => {

    return (
        <Suspense fallback={null}>
            <div className={'ds-f mb-48'}>
                <div className={'w-20'}>
                    <Skeleton type={'text'} width={'95%'} height={50} />
                </div>
                <div className={'w-20'}>
                    <Skeleton type={'text'} width={'95%'} height={50} />
                </div>
                <div className={'w-20'}>
                    <Skeleton type={'text'} width={'95%'} height={50} />
                </div>
                <div className={'w-20'}>
                    <Skeleton type={'text'} width={'95%'} height={50} />
                </div>
                <div className={'w-20'}>
                    <Skeleton type={'text'} width={'95%'} height={50} />
                </div>
            </div>
        </Suspense>
    );
};

export default ProductDetailAboutSkeleton;