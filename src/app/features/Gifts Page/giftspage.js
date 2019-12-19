import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { httpGet } from '../../shared/utils/http/http';
import GiftCard from '../../shared/component/giftCard/giftcard';
import giftPageStyles from './giftpage.module.scss';
import SortFilter from '../../shared/component/sort-filter/sortfilter';
import * as helper from '../../shared/utils/helper/functions';
import { Grid, WindowScroller } from "react-virtualized";

const GiftDetails = React.memo((props) => {
    const [categoryWisegifts, setCategoryWisegifts] = useState([]);
    const [rawGiftdata, setRawGiftData] = useState([]);

    const fetchSearchResult = useCallback(async (params) => {
        const response = await httpGet('/giftCards?q=' + params);
        setRawGiftData(response.data);
        const splitArray = helper.splitArray(response.data);
        setCategoryWisegifts(splitArray);
    }, []);

    const fetchCategoryGiftCards = useCallback(async (params) => {
        const response = await httpGet('/giftCards?categoryId=' + params);
        setRawGiftData(response.data);
        const splitArray = helper.splitArray(response.data);
        setCategoryWisegifts(splitArray);
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        let source = null;
        let params = null;
        for (let param of query.entries()) {
            source = param[0];
            params = param[1];
        }
        if (source === 'category') {
            fetchCategoryGiftCards(params);
        } else if (source === 'search') {
            fetchSearchResult(params);
        }
    }, [props.location.search, fetchSearchResult, fetchCategoryGiftCards])

    const giftSorthandler = useCallback((value) => {
        const data = [...rawGiftdata];
        if (value === 1) {
            setCategoryWisegifts(helper.splitArray(data.sort(helper.ascending)));
        }
        else if (value === 2) {
            setCategoryWisegifts(helper.splitArray(data.sort(helper.descending)));
        }
        else if (value === 3) {
            setCategoryWisegifts(helper.splitArray(data.sort(helper.priceDescending)));
        }
        else if (value === 4) {
            setCategoryWisegifts(helper.splitArray(data.sort(helper.priceAscending)));
        }
    }, [rawGiftdata])


    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {

        return (
            <Fragment key={key}>
                {categoryWisegifts[rowIndex][columnIndex] ?
                    <div style={style}>
                        <GiftCard
                            key={key}
                            id={categoryWisegifts[rowIndex][columnIndex].id}
                            cardName={categoryWisegifts[rowIndex][columnIndex].name}
                            description={categoryWisegifts[rowIndex][columnIndex].desc}
                            image={categoryWisegifts[rowIndex][columnIndex].imageUrl} />
                    </div> : null}
                    </Fragment>
                );
    }

    return (
        <>
            {categoryWisegifts.length !== 0 ?
                <>
                    <div className={giftPageStyles.sortFilter} >
                        <SortFilter sortHandler={giftSorthandler} />
                    </div>
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <Grid
                                autoHeight
                                height={height}
                                cellRenderer={cellRenderer}
                                columnCount={3}
                                columnWidth={400}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                rowCount={categoryWisegifts.length}
                                scrollTop={scrollTop}
                                rowHeight={400}
                                width={1600}
                            />)}
                    </WindowScroller>
                </> : <h2>No Data To Display</h2>}
        </>
    )
});

export default GiftDetails;