import axios from 'axios';
import express = require('express');

const app = express();

// 네이버 API ID
const CLIENT_ID = 'O1WclIjYhETLbhIQPy37';
const CLIENT_SECRET = '8qrtTTRXJh';

app.get('/api-docs', async (req, res) => {
  const query = req.query.query as string; // 클라이언트로부터 검색어 받기
  console.log(query); // 콘솔에 검색어 띄어줌
  const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5&start=1&sort=random`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,
      },
    });

    const data = response.data; //받아온 api 검색 결과
    res.json(data); // 클라이언트에 검색 결과 응답하기
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    res.status(500).send('서버 오류 발생');
  }
});

app.listen(3000, () => {
  console.log('서버가 3000번 포트에서 실행 중입니다.');
});