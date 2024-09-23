import React from 'react'

export default function NewsItem(props) {

    function truncateDescription(description, wordLimit) {
        const words = description.split(' ');
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
        } else {
          return description;
        }
      }
    return (
        <div>
            <div className="card" >
                <img src={props.imageUrl ? props.imageUrl : "https://media2.gmgroup.be/00_nm_logo.png"} className="card-img-top" alt="NewsMonkey" />
                <div className="card-body" style={{ background: "#5a5858", color: "white" }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "50%" }}>{props.source}</span>
                    <h5 className="card-title">{props.title}...</h5>
                    {/* <p className="card-text" >{props.description}... </p> */}
                    <p className="card-text">{truncateDescription(props.description, 50)}</p>
                    <p className="card-text" style={{ fontSize: "14px" }}>By {props.author ? props.author : "Unknown"} on {new Date(props.publishedAt).toGMTString()}</p>
                    <a rel="noreferrer" href={props.newsUrl} target='_blank' className="btn btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}
