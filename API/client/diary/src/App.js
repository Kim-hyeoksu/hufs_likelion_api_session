import { useState, useEffect } from "react";
import styled from 'styled-components'
import axios from 'axios';
function App() {
  const [diaryList, setDiaryList] = useState(null)

  const fetchDiary = async () => {
    const res = await axios.get("http://localhost:4000/api/diary");
    setDiaryList(res.data);
  };

  const todayDate = () => {
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let dateString = year + '-' + month  + '-' + day;

    return dateString;
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const mood = e.target.mood.value;
    const date = todayDate();
    console.log(title, content, mood);
    axios.post("http://localhost:4000/api/diary", { title, content, mood, date });
    fetchDiary()
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/diary")
      .then((res) => res.json())
      .then((data) => setDiaryList(data));
  }, []);
  
return (
  <>
    <Container>
      <Title>일기를 써봅시다!</Title>
      <Form onSubmit={onSubmitHandler}>
        <Moods>
          오늘의 기분은?
          <label>
            <Mood name="mood" type='radio'value='신남'></Mood>
            신남
          </label>
          <label>
            <Mood name="mood" type='radio'value='좋음'></Mood>
            좋음
          </label>
          <label>
            <Mood name="mood" type='radio'value='보통'></Mood>
            보통
          </label>
          <label>
            <Mood name="mood" type='radio'value='나쁨'></Mood>
            나쁨
          </label>
          <label>
            <Mood name="mood" type='radio'value='끔찍'></Mood>
            끔찍
          </label>
        </Moods>
        <Input name="title" placeholder="제목" />
        <TextArea name="content" placeholder="내용" />
        <SubmitButton type="submit">추가</SubmitButton>
      </Form>
      {diaryList && (
        <DiaryList>
          {diaryList.map((diary) => (
            <DiaryItem key={diary.id}>
              <div>
                <DiaryTitle>{diary.title}</DiaryTitle>
                <DiaryContent>날짜: {diary.date}</DiaryContent>
                <DiaryContent>오늘의 기분: {diary.mood}</DiaryContent>
                <DiaryContent>{diary.content}</DiaryContent>
              </div>
            </DiaryItem>
          ))}
        </DiaryList>
      )}
    </Container>
  </>
);
}

export default App;

const Container = styled.div`
display: flex;
width: 100vw;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 30px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  @media only screen and (max-width: 350px) {
    color: pink;
  }
`;

const Form = styled.form`
width: 60%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-bottom: 20px;
`;

const Moods = styled.ul`
display: flex;
`
const Mood = styled.input``

const Input = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 16px;
`;

const TextArea = styled.textarea`
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 16px;
`;

const SubmitButton = styled.button`
padding: 10px;
width: 50%;
background-color: #4caf50;
color: white;
border: none;
cursor: pointer;

&:hover {
  background-color: #45a049;
}
`;

const DiaryList = styled.ul`
list-style: none;
width: 60%;
box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const DiaryItem = styled.li`
border-bottom: 1px solid #eee;
padding: 20px 0;
display: flex;
justify-content: space-between;
align-items: center;
`;

const DiaryTitle = styled.h3`
font-size: 18px;
margin-bottom: 10px;
`;

const DiaryContent = styled.p`
font-size: 16px;
color: #555;
`;