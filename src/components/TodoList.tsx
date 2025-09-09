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
        <div style={{ marginBottom: '30px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #2196f3'
            }}>
                <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#1976d2' }}>📖 รายวิชาที่ลงทะเบียน</h3>
                    <span style={{ fontSize: '14px', color: '#555' }}>
                        รายวิชาทั้งหมด: {activeCourses.length} วิชา | หน่วยกิตรวม: {totalCredits} หน่วยกิต
                    </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
                        GPA: {gpa.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        เฉลี่ยสะสม
                    </div>
                </div>
            </div>

            {activeCourses.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '16px',
                    padding: '40px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px dashed #ddd'
                }}>
                    ยังไม่มีรายวิชาที่ลงทะเบียน 📚
                </div>
            ) : (
                <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                        gap: '10px',
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        borderBottom: '1px solid #ddd'
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
                        <div
                            key={course.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                                gap: '10px',
                                padding: '12px',
                                borderBottom: '1px solid #eee',
                                alignItems: 'center',
                                fontSize: '13px'
                            }}
                        >
                            <span style={{ fontWeight: 'bold', color: '#1976d2' }}>
                                {course.courseCode}
                            </span>
                            <span>{course.courseNameTh}</span>
                            <span style={{ color: '#666', fontSize: '12px' }}>
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
                                style={{
                                    padding: '4px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseList;