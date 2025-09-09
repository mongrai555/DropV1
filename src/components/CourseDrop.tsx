import { useCourseStore } from "../store/courseStore";
import DropButton from "./DropButton";

const CourseDrop = () => {
    const { getDroppedCourses, clearDroppedCourses } = useCourseStore();
    const droppedCourses = getDroppedCourses();

    const handleClearAll = () => {
        if (window.confirm(`ต้องการลบรายวิชาที่ถอนทั้งหมด ${droppedCourses.length} วิชา ออกจากระบบหรือไม่?\n\n⚠️ การดำเนินการนี้ไม่สามารถยกเลิกได้!`)) {
            clearDroppedCourses();
        }
    };

    if (droppedCourses.length === 0) {
        return (
            <div className="section-card">
                <div className="empty-state">
                    <span className="empty-state-icon">🗑️</span>
                    <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>รายวิชาที่ถอน</h3>
                    <div className="empty-state-text">ไม่มีรายวิชาที่ถอน</div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-card dropped-section">
            <div className="dropped-header">
                <div className="dropped-stats">
                    <div className="dropped-info">
                        <h3>🗑️ รายวิชาที่ถอน</h3>
                        <div className="dropped-details">
                            รายวิชาที่ถอนทั้งหมด: {droppedCourses.length} วิชา
                        </div>
                    </div>
                    
                    <button
                        onClick={handleClearAll}
                        className="btn btn-purple"
                    >
                        🗑️ Reset ทั้งหมด
                    </button>
                </div>
            </div>

            <div className="data-table">
                {/* Desktop Table Header */}
                <div className="table-header" style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                    gap: '10px',
                    backgroundColor: '#f8d7da',
                    color: '#721c24'
                }}>
                    <span>รหัสวิชา</span>
                    <span>ชื่อวิชา (ไทย)</span>
                    <span>ชื่อวิชา (อังกฤษ)</span>
                    <span>หน่วยกิต</span>
                    <span>อาจารย์ผู้สอน</span>
                    <span>เกรด</span>
                    <span>การดำเนินการ</span>
                </div>
                
                {droppedCourses.map((course) => (
                    <div key={course.id}>
                        {/* Desktop Row */}
                        <div
                            className="table-row"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '100px 1fr 1fr 80px 120px 80px 80px',
                                gap: '10px',
                                alignItems: 'center',
                                backgroundColor: '#fff5f5',
                                opacity: 0.8
                            }}
                        >
                            <span style={{ fontWeight: 'bold', color: '#dc3545', textDecoration: 'line-through' }}>
                                {course.courseCode}
                            </span>
                            <span style={{ textDecoration: 'line-through' }}>{course.courseNameTh}</span>
                            <span style={{ color: '#666', fontSize: '12px', textDecoration: 'line-through' }}>
                                {course.courseNameEn}
                            </span>
                            <span style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'line-through' }}>
                                {course.credits}
                            </span>
                            <span style={{ fontSize: '12px', textDecoration: 'line-through' }}>
                                {course.instructor || '-'}
                            </span>
                            <span className="btn btn-warning" style={{
                                padding: '4px 8px',
                                fontSize: '12px',
                                minWidth: 'auto'
                            }}>
                                W
                            </span>
                            <DropButton courseId={course.id} isDropped={course.isDropped} />
                        </div>
                        
                        {/* Mobile Layout */}
                        <div className="mobile-course-item" style={{ opacity: 0.8 }}>
                            <div className="mobile-course-header">
                                <span className="mobile-course-code" style={{ 
                                    color: '#dc3545', 
                                    textDecoration: 'line-through' 
                                }}>
                                    {course.courseCode}
                                </span>
                                <span className="mobile-course-credits" style={{
                                    backgroundColor: '#f8d7da',
                                    color: '#721c24',
                                    textDecoration: 'line-through'
                                }}>
                                    {course.credits} หน่วยกิต
                                </span>
                            </div>
                            <div className="mobile-course-name" style={{ textDecoration: 'line-through' }}>
                                {course.courseNameTh}
                            </div>
                            {course.courseNameEn && (
                                <div className="mobile-course-name-en" style={{ textDecoration: 'line-through' }}>
                                    {course.courseNameEn}
                                </div>
                            )}
                            {course.instructor && (
                                <div className="mobile-instructor" style={{ textDecoration: 'line-through' }}>
                                    อาจารย์: {course.instructor}
                                </div>
                            )}
                            <div className="mobile-course-details">
                                <div className="mobile-grade-actions">
                                    <span className="btn btn-warning" style={{
                                        padding: '8px 16px',
                                        fontSize: '14px',
                                        minWidth: 'auto',
                                        flex: '0 0 auto'
                                    }}>
                                        เกรด: W (ถอน)
                                    </span>
                                    <DropButton courseId={course.id} isDropped={course.isDropped} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseDrop;