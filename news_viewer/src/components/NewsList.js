// 뉴스 데이터 배열 렌더링
import React, { useState, useEffect} from "react";
import styled from 'styled-components';
import NewsItem from "./NewsItem";
import axios from "axios";

// 스타일 컴포넌트
const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

// const sampleArticle = {
//     title: '제목',
//     description: '내용',
//     url: 'https://google.com',
//     urlToImage: 'https://via.placeholder.com/160',
// };

const NewsList = () => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // async 사용하는 함수 따로 선언
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&category=technology&apiKey=c0662f2484fb4c458135523c837f41d5',
                );
                setArticles(response.data.articles);
            } catch(e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    },[]);

    // 대기 중일 때
    if(loading) {
        return <NewsListBlock>대기중...</NewsListBlock>
    }
    // article 값이 설정되지 않았을 때
    if(!articles) {
        return null;
    }

    return (
        <NewsListBlock>
            {/* map 함수를 통해 item 추가 */}
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;