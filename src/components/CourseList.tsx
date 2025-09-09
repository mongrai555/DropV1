import { useCourseStore } from "../store/courseStore";
import DropButton from "./DropButton";

const CourseList = () => {
    const { getActiveCourses, getTotalCredits, calculateGPA, updateGrade } = useCourseStore();
    const activeCourses = getActiveCourses();
    const totalCredits = getTotalCredits();
    const gpa = calculateGPA();

    const handleGradeChange = (courseId: string, grade: string) => {
        updateGrade(courseId, grade);
    };

    return (
        <div className="section-card">
            <div className="stats-card">
                <div className="stats-info">
                    <h3>📖 รายวิชาที่ลงทะเบียน</h3>
                    <div className="stats-details">
                        รายวิชาทั้งหมด: {activeCourses.length} วิชา | หน่วยกิตรวม: {totalCredits} หน่วยกิต
                    </div>
                </div>
                <div className="gpa-display">
                    <div className="gpa-value">{gpa.toFixed(2)}</div>
                    <div className="gpa-label">GPA เฉลี่ยสะสม</div>
                </div>
            </div>

            {activeCourses.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-state-icon">📚</span>
                    <div className="empty-state-text">ยังไม่มีรายวิชาที่ลงทะเบียน</div>
                </div>
            ) : (
                <div className="data-table">
                    {/* Desktop Table Header */}
                    <div className="table-header" style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                        gap: '10px'
                    }}>
                        <span>รหัสวิชา</span>
                        <span>ชื่อวิชา (ไทย)</span>
                        <span>ชื่อวิชา (อังกฤษ)</span>
                        <span>หน่วยกิต</span>
                        <span>อาจารย์ผู้สอน</span>
                        <span>เกรด</span>
                        <span>การดำเนินการ</span>
                    </div>
                    
                    {activeCourses.map((course) => (
                        <div key={course.id}>
                            {/* Desktop Row */}
                            <div
                                className="table-row"
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                                    gap: '10px',
                                    alignItems: 'center'
                                }}
                            >
                                <span style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                                    {course.courseCode}
                                </span>
                                <span>{course.courseNameTh}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>
                                    {course.courseNameEn}
                                </span>
                                <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {course.credits}
                                </span>
                                <span style={{ fontSize: '12px' }}>
                                    {course.instructor || '-'}
                                </span>
                                <select
                                    value={course.grade}
                                    onChange={(e) => handleGradeChange(course.id, e.target.value)}
                                    className="form-select"
                                    style={{
                                        padding: '4px',
                                        fontSize: '12px',
                                        backgroundColor: course.grade === '-' ? '#fff3cd' : '#d4edda'
                                    }}
                                >
                                    <option value="-">ไม่มี</option>
                                    <option value="A">A</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="C+">C+</option>
                                    <option value="C">C</option>
                                    <option value="D+">D+</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                    <option value="W">W</option>
                                    <option value="I">I</option>
                                </select>
                                <DropButton courseId={course.id} isDropped={course.isDropped} />
                            </div>
                            
                            {/* Mobile Layout */}
                            <div className="mobile-course-item">
                                <div className="mobile-course-header">
                                    <span className="mobile-course-code">{course.courseCode}</span>
                                    <span className="mobile-course-credits">{course.credits} หน่วยกิต</span>
                                </div>
                                <div className="mobile-course-name">{course.courseNameTh}</div>
                                {course.courseNameEn && (
                                    <div className="mobile-course-name-en">{course.courseNameEn}</div>
                                )}
                                {course.instructor && (
                                    <div className="mobile-instructor">อาจารย์: {course.instructor}</div>
                                )}
                                <div className="mobile-course-details">
                                    <div className="mobile-grade-actions">
                                        <select
                                            value={course.grade}
                                            onChange={(e) => handleGradeChange(course.id, e.target.value)}
                                            className="form-select mobile-grade-select"
                                            style={{
                                                backgroundColor: course.grade === '-' ? '#fff3cd' : '#d4edda'
                                            }}
                                        >
                                            <option value="-">ไม่มีเกรด</option>
                                            <option value="A">A</option>
                                            <option value="B+">B+</option>
                                            <option value="B">B</option>
                                            <option value="C+">C+</option>
                                            <option value="C">C</option>
                                            <option value="D+">D+</option>
                                            <option value="D">D</option>
                                            <option value="F">F</option>
                                            <option value="W">W</option>
                                            <option value="I">I</option>
                                        </select>
                                        <DropButton courseId={course.id} isDropped={course.isDropped} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;