export default function List() {
  const courses = ['피아노', '영어', '미술교실']

  return (
    <div>
      <h4 className="title-sub">강의목록</h4>

      {courses.map((course, i) => {
        return <div className="course" key={i}><h4>{course}</h4></div>
      })}

    </div>
  )
}