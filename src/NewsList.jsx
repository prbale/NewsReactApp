// src/components/NewsList.js

import React, { useState, useEffect } from 'react';
import './NewsList.css'; // Import the CSS file

const NewsList = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://localhost:3000/summarized-news?page=${page}&limit=10`);
                const data = await response.json();
                setArticles(data.articles);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching news: ", error);
            }
        };

        fetchNews();
    }, [page]);

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <h1>News Demo App in React JS</h1>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>


            <div className="news-grid">
                {articles.map((article, index) => (
                    <div key={index} className="news-item">
                        <img src={article.urlToImage} alt={article.title} />
                        <h2>{article.title}</h2>
                        <p className="published-date">{new Date(article.publishedAt).toLocaleDateString()}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                        <p></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
