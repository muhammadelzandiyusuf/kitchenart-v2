import {React, Suspense, FormGroup, RadioGroup, FormControl, ExpandMore, Button, useTranslation, useForm, Skeleton} from 'libraries';
import {getIdentityFromHref, findItemInObject} from 'utils';

const CheckBoxAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/CheckboxAtom'));
const RadioAtom = React.lazy(() => import('components/atoms/FormMaterialAtom/RadioButtonAtom'));

const MenuFilterMolecule = (props) => {

    const t = useTranslation();
    const { ordering, filtering, selected, selectColor, handleFilterColor, filterCheckBox, filterRadio } = props;
    const { register } = useForm();

    let filterProduct = [];
    let filterBuckets = {buckets: []};

    if (filtering?.length > 0) {
        filtering.forEach(bucket => {
             if (bucket.field !== 'category' && bucket.field !== 'availability') {
                 filterProduct.push(bucket);
             };
        });
    };

    if (filterProduct?.length > 0) {
        if (selected?.index !== null && selected?.index > 0) {
            filterBuckets = findItemInObject(filterProduct, 'field', selected?.field);
        };
    };

    return (
        <Suspense fallback={null}>
            <div className="filter pb-10">
                {props.loading ?
                    <Button className={'filter__menu'}>
                        <Skeleton variant="rect" width={100} height={30} />
                    </Button>
                 :
                    <Button
                        onClick={() => props.handleFilter(0, 'sortBy')}
                        className={`filter__menu fs-15 ${selected?.index === 0 ? 'filter__active' : ''}`}
                        endIcon={<ExpandMore />}>
                        {t('label.sortBy')}
                    </Button>
                }
                {filterProduct?.length > 0 &&
                    filterProduct?.map((item, index) => {
                        if (props.loading) {
                            return (
                                <Button className={'filter__menu'} key={index}>
                                    <Skeleton variant="rect" width={100} height={30} />
                                </Button>
                            )
                        }
                        else {
                            return item.buckets?.length > 0 && <Button
                                    key={index}
                                    onClick={() => props.handleFilter(index + 1, item.field)}
                                    className={`filter__menu fs-15 ${selected?.index === index + 1 ? 'filter__active' : ''}`}
                                    endIcon={<ExpandMore/>}>
                                    {item.name}
                                </Button>

                        }
                    })
                }
                <div className={`filter__content filter__active ${selected?.index === 0 ? 'ds-b' : 'ds-n'}`}>
                    <FormControl component="fieldset" className={'filter__radio'}>
                        <RadioGroup aria-label="sortby" name="sortby" value={props.value}
                                    onChange={(event) => props.handleChangeRadio(event)}>
                            {selected?.index !== null &&
                                ordering.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <RadioAtom key={key} id={`radio${key}`} name={`radio${key}`} reg={register}
                                                   value={value} label={item.name} placement={'start'} color={'default'}
                                                   checked={filterRadio === `radio${key}` ? true : false}
                                                   size={'small'}/>
                                    )
                                })
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
                <div
                    className={
                        `filter__content filter__active
                        ${selected?.index === 1 ? 'ds-b ml-8persen' : 'ds-n'}
                        ${selected?.index === 2 ? 'ds-b ml-16persen' : 'ds-n'}
                        ${selected?.index === 3 ? 'ds-b ml-24persen' : 'ds-n'}
                        ${selected?.index === 4 ? 'ds-b ml-32persen' : 'ds-n'}
                        ${selected?.index === 5 ? 'ds-b ml-40persen' : 'ds-n'}
                        ${selected?.index === 6 ? 'ds-b ml-48persen' : 'ds-n'}
                        ${selected?.index === 7 ? 'ds-b ml-56persen' : 'ds-n'}`
                    }
                >
                    <div className={'filter__checkbox'}>
                        <FormGroup>
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'brand' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
                                                      checked={filterCheckBox[`brand${key}`] ? true: false}
                                                      id={`brand${key}`} name={item.name} label={item.name}
                                                      placement={'start'} color={'default'} size={'small'}
                                                      handleChangeCheckbox={props.handleChangeCheckbox}
                                        />
                                    );
                                })
                            }
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'features' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
                                                      checked={filterCheckBox[`features${key}`] ? true: false}
                                                      id={`features${key}`} name={item.name} label={item.name}
                                                      placement={'start'} color={'default'} size={'small'}
                                                      handleChangeCheckbox={props.handleChangeCheckbox}
                                        />
                                    );
                                })
                            }
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'capacity' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
                                                      checked={filterCheckBox[`capacity${key}`] ? true: false}
                                                      id={`capacity${key}`} name={item.name} label={item.name}
                                                      placement={'start'} color={'default'} size={'small'}
                                                      handleChangeCheckbox={props.handleChangeCheckbox}
                                        />
                                    );
                                })
                            }
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'finishing' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
                                                      checked={filterCheckBox[`finishing${key}`] ? true: false}
                                                      id={`finishing${key}`} name={item.name} label={item.name}
                                                      placement={'start'} color={'default'} size={'small'}
                                                      handleChangeCheckbox={props.handleChangeCheckbox}
                                        />
                                    );
                                })
                            }
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'system' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
                                                      checked={filterCheckBox[`system${key}`] ? true: false}
                                                      id={`system${key}`} name={item.name} label={item.name}
                                                      placement={'start'} color={'default'} size={'small'}
                                                      handleChangeCheckbox={props.handleChangeCheckbox}
                                        />
                                    );
                                })
                            }
                            {selected?.index !== null && selected?.index > 0 && selected?.field === 'size' &&
                                filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    let value = getIdentityFromHref(item.href);
                                    return (
                                        <CheckBoxAtom key={key} reg={register} value={value}
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
                    {selected?.index !== null && selected?.index > 0 && selected?.field === 'color' &&
                        <ul className={'filter__content__color'}>
                            {filterBuckets?.buckets?.length > 0 &&
                                filterBuckets.buckets.map((item, key) => {
                                    const selectIndex = selectColor.find((number) => number === key);
                                    return (
                                        <li key={key}
                                            className={`filter__content__color--li pointer ${key === selectIndex ? 'filter__content__color--active' : ''}`}
                                            style={{backgroundColor: item.name}}
                                            onClick={() => handleFilterColor(item, key)}
                                        ></li>
                                    );
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        </Suspense>
    );
};

export default MenuFilterMolecule;