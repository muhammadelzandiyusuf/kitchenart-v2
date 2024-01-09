import { React, Suspense } from 'libraries';

const ProductBrandName = React.lazy(() => import('components/atoms/ProductAtom/ProductBrandName'));
const ProductDetailAction = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailAction'));
const ProductDetailDownload = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailDownload'));
const ProductDateTimeCountDown = React.lazy(() => import('components/atoms/ProductAtom/ProductDateTimeCountDown'));
const ProductDetailPrice = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPrice'));
const ProductDetailVariant = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailVariant'));
const ProductDetailButtonAction = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailButtonAction'));
const ProductDetailShipping = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailShipping'));
const ProductDetailAboutAction = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailAboutAction'));
const ProductReportInformation = React.lazy(() => import('components/atoms/ProductAtom/ProductReportInformation'));
const ProductRequestStock = React.lazy(() => import('components/atoms/ProductAtom/ProductRequestStock'));
const ProductInstallmentSimulation = React.lazy(() => import('components/atoms/ProductAtom/ProductInstallmentSimulation'));
const ProductDetailShippingCost = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailShippingCost'));
const ProductDetailInfoPromo = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailInfoPromo'));
const ProductDetailPackageItem = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailPackageItem'));
const ProductDetailShareButton = React.lazy(() => import('components/atoms/ProductAtom/ProductDetailShareButton'));
const ProductQuantity = React.lazy(() => import('components/atoms/ProductAtom/ProductQuantity'));
const ProductWholesalePriceList = React.lazy(() => import('components/atoms/ProductAtom/ProductWholesalePriceList'));

const ProductDetailInfo = (props) => {

    return (
        <Suspense fallback={null}>
            <ProductBrandName brand={props.brand} name={props.name} code={props.code} availability={props.availability}
                              stock={props.stock} productType={props.productType} productLabel={props.productLabel}
            />
            <ProductDetailAction
                warranty={props.warranty}
                detail={true}
                handlePostWishlist={props.handlePostWishlist}
                handleDeleteWishlist={props.handleDeleteWishlist}
                isWishlist={props.isWishlist}
                href={props.href}
            />
            <ProductDetailDownload handleDownload={props.handleDownload} catalogFile={props.catalogFile}
                                   cuttingImage={props.cuttingImage} manualFile={props.manualFile}
                                   itemProducts={props.itemProduct} type={props.typeDownload} valueDownload={props.valueDownload}
                                   handleChangeDownload={props.handleChangeDownload} fileDownload={props.fileDownload}
            />
            {props.activePromotion?.type === 'deal_zone' &&
                <ProductDateTimeCountDown
                    deadline={props.activePromotion}
                    detail={true}
                    styleView={'product__detail__countdown fs-14'}
                />
            }
            {props.activePromotion?.type !== 'deal_zone' && props.activePromotion?.name &&
                <div className={'fs-15 c-black fw-b mt-10'}>{props.activePromotion?.name}</div>
            }
            <ProductDetailPrice price={props.price} detail={true} netPrice={props.netPrice} />
            <ProductDetailVariant variants={props.variants} handleChangeProduct={props.handleChangeProduct} code={props.code} styleView="product__detail__info" />
            {props.typeDownload === 'package-product' &&
                <ProductDetailInfoPromo lineItems={props.itemProduct} label={props.productLabel} />
            }
            <ProductDetailPackageItem relatedPackages={props.relatedPackages} productName={props.productName}
                                      handleChangePackage={props.handleChangePackage} lineItems={props.itemProduct}
                                      baseHref={props.baseHref} type={props.productType}
            />
            <ProductQuantity
                quantity={props.quantity}
                maxQuantity={props.maxQuantity}
                wholesalePriceLists={props.wholesalePriceLists}
                handleQuantity={props.handleQuantity}
                handleShowWholesale={props.handleShowWholesale}
                href={props.href}
            />
            <ProductDetailButtonAction
                availability={props.availability}
                stock={props.stock}
                handleShowRequestStock={props.handleShowRequestStock}
                detail={true}
                handleShowSimulation={props.handleShowSimulation}
                handleAddToCart={props.handleAddToCart}
            />
            <ProductRequestStock
                openRequestStock={props.openRequestStock}
                handleCloseRequestStock={props.handleCloseRequestStock}
                handleSubmitRequestStock={props.handleSubmitRequestStock}
                buttonLoading={props.buttonLoading}
            />
            <ProductInstallmentSimulation
                openSimulation={props.openSimulation}
                handleCloseSimulation={props.handleCloseSimulation}
                indexInstallment={props.indexInstallment}
                handleChooseBankInstallment={props.handleChooseBankInstallment}
            />
            <ProductDetailShipping
                handleOpenShippingCost={props.handleOpenShippingCost}
            />
            <ProductDetailShippingCost
                openShipiingCost={props.openShipiingCost}
                handleCloseShippingCost={props.handleCloseShippingCost}
                vendorShipment={props.vendorShipment}
                buttonLoading={props.buttonLoading}
                tariff={props.tariff}
                message={props.message}
                showTable={props.showTable}
                handleCalculate={props.handleCalculate}
            />
            <ProductDetailAboutAction handleShowReport={props.handleShowReport} />
            <ProductReportInformation
                openReport={props.openReport}
                handleCloseReport={props.handleCloseReport}
                handleSubmitReportProduct={props.handleSubmitReportProduct}
                buttonLoading={props.buttonLoading}
            />
            <ProductDetailShareButton
                shortLink={props.shortLink}
                brand={props.brand}
                name={props.name}
                code={props.code}
                handleCopyShortLink={props.handleCopyShortLink}
                handleOpenSharingUrl={props.handleOpenSharingUrl}
                openShortLink={props.openShortLink}
            />
            <ProductWholesalePriceList
                price={props.price}
                wholesalePriceLists={props.wholesalePriceLists}
                openWholesale={props.openWholesale}
                handleCloseWholesale={props.handleCloseWholesale}
            />
        </Suspense>
    );
};

export default ProductDetailInfo;