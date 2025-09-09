// App.tsx
import './App.css'
import CourseForm from './components/CourseForm'
import CourseList from './components/CourseList'
import CourseDrop from './components/CourseDrop'

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <header className="page-header">
          <h1 className="page-title">
            🎓 ระบบการลงทะเบียนและถอนรายวิชา
          </h1>
          <p className="page-subtitle">
            จัดการรายวิชาของคุณได้อย่างง่ายดาย พร้อมคำนวณ GPA แบบเรียลไทม์
          </p>
        </header>
        
        {/* ฟอร์มเพิ่มรายวิชา */}
        <section className="section">
          <CourseForm />
        </section>
        
        {/* รายวิชาที่ลงทะเบียน */}
        <section className="section">
          <CourseList />
        </section>
        
        {/* รายวิชาที่ถอน */}
        <section className="section">
          <CourseDrop />
        </section>
      </div>
    </div>
  )
}

export default App
