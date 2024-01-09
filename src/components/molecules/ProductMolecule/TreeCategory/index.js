import { React, TreeView, TreeItem, Suspense, ExpandMore, ChevronRight, useState, useEffect, Skeleton } from 'libraries';
import { getIdentityFromHref, findItemInObject, getQueryParams } from 'utils';

const TreeCategory = (props) => {
    const { tree, url, loading } = props;

    const [expanded, setExpanded] = useState(null);
    const [selected, setSelected] = useState([url]);
    const [category, setCategory] = useState([]);

    useEffect (() => {
        if (tree?.length > 0) {
            const categories = findItemInObject(tree, 'field', 'category');
            if (categories?.buckets?.length > 0) {
                setCategory(categories?.buckets);
                let parentUrl = getIdentityFromHref(categories?.buckets[0]['href']);
                parentUrl = getQueryParams(parentUrl, 'category');
                if (categories?.buckets[0]?.total > 0) {
                    const buckets = categories?.buckets[0]?.children;
                    let array = [];
                    buckets.forEach(item => {
                        if (item.children?.length > 0 ) {
                            const href = getIdentityFromHref(item.href);
                            const url = getQueryParams(href, 'category');
                            array.push(url);
                        }
                    });
                    array.push(parentUrl);
                    setExpanded(array);
                }
            }
        };
    }, [tree]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    return (
        <Suspense fallback={null}>
            <TreeView
                className={props.classRoot}
                defaultCollapseIcon={<ExpandMore />}
                defaultExpandIcon={<ChevronRight />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {category?.length > 0 &&
                    category.map((item, index) => {
                        const slug = getIdentityFromHref(item.href);
                        const parentNode = getQueryParams(slug, 'category');
                        if (loading) {
                            return <Skeleton key={index} variant="text" />
                        }
                        else {
                            return (
                                <TreeItem key={index} nodeId={parentNode} label={item.name} className={'tree__parent'}>
                                    {item.children?.length &&
                                        item.children.map((child, key) => {
                                        const slugChild = getIdentityFromHref(child.href);
                                        const childNode = getQueryParams(slugChild, 'category');
                                        return (
                                            <TreeItem
                                                key={key}
                                                nodeId={childNode}
                                                label={child.name}
                                                className={'tree__child'}
                                            >
                                                {child.children?.length &&
                                                    child.children.map((subChild, uniq) => {
                                                    const slugSubChild = getIdentityFromHref(subChild.href);
                                                    const subChildNode = getQueryParams(slugSubChild, 'category');
                                                    return (
                                                        <TreeItem
                                                            key={uniq}
                                                            nodeId={subChildNode}
                                                            label={subChild.name}
                                                            onClick={(event) => props.handleChangeUrl(event, slugSubChild)}
                                                            className={'tree__sub__child'}
                                                        />
                                                    );
                                                })
                                                }
                                            </TreeItem>
                                        )
                                    })
                                    }
                                </TreeItem>
                            )
                        }
                    })
                }
            </TreeView>
        </Suspense>
    );
};

export default React.memo(TreeCategory);