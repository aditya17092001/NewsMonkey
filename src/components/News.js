import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';
import NewsItem from './NewsItem';

export default function News(props) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bottomLoading, setBottomLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [nextpage, setNextpage] = useState(0);
    const [limitExceeded, setLimitExceeded] = useState(false);
    const [status, setStatus] = useState(200);

    const getData = async (query = '') => {
        console.log("getData: " + query);
        props.updateProgress(0);
        setLoading(true);
        let url = `https://newsdata.io/api/1/news?country=${props.country}${props.category === 'general' ? '' : `&category=${props.category}`}&apikey=${props.apiKey}&size=9${query ? `&q=${query}` : ''}`;
        console.log(url);
        try {
            let data = await fetch(url);

            if (data.status !== 200) {
                console.log(data.status);
                setLimitExceeded(true);
                setStatus(data.status);
                setLoading(false);
                return;
            }
            if(data.totalResults === 0) {
                return ( <h2>No results found</h2>);
            }
 
            let parsedData = await data.json();
            setResults(parsedData.results);
            setTotalResults(parsedData.totalResults);
            props.updateProgress(100);
            setLoading(false);
            setNextpage(parsedData.nextPage);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLimitExceeded(true);
            setLoading(false);
        }
    };

    const fetchMoreData = async () => {
        setBottomLoading(true);
        let url = `https://newsdata.io/api/1/news?country=${props.country}${props.category === 'general' ? '' : `&category=${props.category}`}&apikey=${props.apiKey}&page=${nextpage}&size=9`;

        try {
            let data = await fetch(url);

            if (data.status !== 200) {
                console.log(data.status);
                setStatus(data.status);
                setLimitExceeded(true);
                setBottomLoading(false);
                return;
            }

            let parsedData = await data.json();
            setResults(results.concat(parsedData.results));
            setTotalResults(parsedData.totalResults);
            setBottomLoading(false);
            setNextpage(parsedData.nextPage);
        } catch (error) {
            console.error('Error fetching more data:', error);
            setLimitExceeded(true);
            setBottomLoading(false);
        }
    };

    useEffect(() => {
        getData(props.searchQuery);
        // eslint-disable-next-line
    }, [props.searchQuery]);

    const capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <div style={{ marginTop: '80px' }}>
            {loading && <Spinner />}
            {!limitExceeded ?
                <InfiniteScroll
                    dataLength={results.length}
                    next={fetchMoreData}
                    hasMore={results.length !== totalResults}
                    loader={bottomLoading && <Spinner />}
                >
                    <h1 className="text-center my-3" style={{ color: 'white' }}>
                        NewsMonkey - Top {props.category === 'general' ? '' : capitalize(props.category)} Headlines
                    </h1>
                    <div className="container my-3" style={{ color: 'white' }}>
                        <div className="row">
                            {!loading &&
                                Array.isArray(results) &&
                                results.map((element, index) => (
                                    <div className="col-md-4 my-3" key={index}>
                                        <NewsItem
                                            title={element.title ? element.title : ' '}
                                            description={element.description ? element.description : ' '}
                                            imageUrl={element.image_url}
                                            newsUrl={element.link}
                                            author={element.creator}
                                            publishedAt={element.pubDate}
                                            source={element.source_id ? element.source_id : 'Unknown'}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </InfiniteScroll>
                : <h1 style={{ textAlign: "center", color: "white" }}>Error: {status} Your api limit is Exceeded</h1>}
        </div>
    );
}
