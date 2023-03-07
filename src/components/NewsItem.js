import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div className="my-3">
      <div className="card">
        <div style={{ position: 'absolute', right: '0', display: 'flex', justifyContent: 'flex-end' }}>
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>

        <img src={imageUrl === null ? "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" : imageUrl} style={{ width: "100%", height: "150px" }} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 45)}....</h5>
          <p className="card-text">{description.slice(0, 88)}....</p>
          <p className="card-text"><small className="text-primary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>

          <a rel="noreffrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );
}
export default NewsItem;
