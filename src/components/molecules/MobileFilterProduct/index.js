import {faBars, React, Suspense, FormGroup, RadioGroup, FormControl, useForm, useTranslation} from 'libraries';
import {getIdentityFromHref} from "utils";

const IconButtonAtom = React.lazy(() => import('components/atoms/IconButtonAtom'));
const AccordionAtom = React.lazy(() => import('components/atoms/AccordionAtom'));
const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const RadioAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/RadioButtonAtom'));

const MobileFilterProduct = (props) => {

    const t = useTranslation();
    const { register } = useForm();
    const { filterMobile, filtering, selectColor, handleFilterColor, filterCheckBox, filterRadio, ordering, handleFilter } = props;

    let filterProduct = [];
    if (filtering?.length > 0) {
        filtering.forEach(bucket => {
            if (bucket.field !== 'category') {
                filterProduct.push(bucket);
            };
        });
    };

    return (
        <Suspense fallback={null}>
            <div className={'mobile__filter'}>
                Filter
                <IconButtonAtom
                    type="icon-button" label="open drawer" icon={faBars}
                    styleIconButton={`mobile__filter__button`}
                    clicked={props.handleFilterMobile}
                />
            </div>
            {filterMobile &&
                <div className={`mobile__filter__content`}>
                    <AccordionAtom
                        styleAccordion={'mobile__filter__content--accordion'} title={t('label.sortBy')}
                        styleTitle={props.styleTitle}
                    >
                        <FormControl component="fieldset" className={'filter__radio'}>
                            <RadioGroup aria-label="sortby" name="sortby" value={props.value}
                                        onChange={(event) => props.handleChangeRadio(event)}>
                                {ordering?.length > 0 &&
                                    ordering.map((bucket, key) => {
                                        let value = getIdentityFromHref(bucket.href);
                                        return (
                                            <RadioAtom key={key} id={`radio${key}`} name={`radio${key}`} reg={register}
                                                       value={value} label={bucket.name} placement={'start'} color={'default'}
                                                       checked={filterRadio === `radio${key}` ? true : false}
                                                       size={'small'}/>
                                        );
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </AccordionAtom>
                    {filterProduct?.length &&
                        filterProduct.map((item, index) => {
                            return (
                                <AccordionAtom
                                    styleAccordion={'mobile__filter__content--accordion'} key={index}
                                    title={item.name} styleTitle={props.styleTitle} changed={() => handleFilter(index + 1, item.field)}
                                >
                                    {item.field === 'brand' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`brand${key}`] ? true: false}
                                                                id={`brand${key}`} name={bucket.name} label={bucket.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'features' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`features${key}`] ? true: false}
                                                                id={`features${key}`} name={bucket.name} label={bucket.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'capacity' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`c${key}`] ? true: false}
                                                                id={`capacity${key}`} name={bucket.name} label={bucket.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'finishing' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`finishing${key}`] ? true: false}
                                                                id={`finishing${key}`} name={bucket.name} label={bucket.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'system' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`system${key}`] ? true: false}
                                                                id={`system${key}`} name={bucket.name} label={bucket.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'size' &&
                                        <div className={'filter__checkbox'}>
                                            <FormGroup>
                                                {item.buckets?.length > 0 &&
                                                    item.buckets.map((bucket, key) => {
                                                        let value = getIdentityFromHref(bucket.href);
                                                        return (
                                                            <CheckBoxAtom
                                                                key={key} reg={register} value={value}
                                                                checked={filterCheckBox[`size${key}`] ? true: false}
                                                                id={`size${key}`} name={item.name} label={item.name}
                                                                placement={'start'} color={'default'} size={'small'}
                                                                handleChangeCheckbox={props.handleChangeCheckbox}
                                                            />
                                                        );
                                                    })
                                                }
                                            </FormGroup>
                                        </div>
                                    }

                                    {item.field === 'color' &&
                                        <ul className={'filter__content__color'}>
                                            {item.buckets?.length > 0 &&
                                                item.buckets.map((bucket, key) => {
                                                    const selectIndex = selectColor.find((number) => number === key);
                                                    return (
                                                        <li key={key}
                                                            className={`filter__content__color--li pointer 
                                                            ${key === selectIndex ? 'filter__content__color--active' : ''}`}
                                                            style={{backgroundColor: bucket.name}}
                                                            onClick={() => handleFilterColor(bucket, key)}>
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    }
                                </AccordionAtom>
                            );
                        })
                    }
                </div>
            }
        </Suspense>
    );
};

export default MobileFilterProduct;