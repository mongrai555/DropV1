import { useState } from "react";
import { useCourseStore } from "../store/courseStore";

const CourseForm = () => {
    const [formData, setFormData] = useState({
        courseCode: "",
        courseNameTh: "",
        courseNameEn: "",
        credits: 0,
        instructor: "",
        grade: "-"
    });
    
    const addCourse = useCourseStore((state) => state.addCourse);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.courseCode.trim() && formData.courseNameTh.trim()) {
            addCourse(formData);
            setFormData({
                courseCode: "",
                courseNameTh: "",
                courseNameEn: "",
                credits: 0,
                instructor: "",
                grade: "-"
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'credits' ? parseInt(value) || 0 : value
        }));
    };

    return (
        <div className="section-card">
            <form onSubmit={handleSubmit} className="form-container">
                <h3 className="form-header">
                    📚 เพิ่มรายวิชาใหม่
                </h3>
                
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '15px' }}>
                    <div className="form-group">
                        <label className="form-label">รหัสวิชา:</label>
                        <input
                            type="text"
                            name="courseCode"
                            value={formData.courseCode}
                            onChange={handleChange}
                            placeholder="เช่น CSC101"
                            required
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">หน่วยกิต:</label>
                        <input
                            type="number"
                            name="credits"
                            value={formData.credits}
                            onChange={handleChange}
                            min="1"
                            max="6"
                            required
                            className="form-input"
                        />
                    </div>
                </div>
                
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">ชื่อวิชา (ไทย):</label>
                    <input
                        type="text"
                        name="courseNameTh"
                        value={formData.courseNameTh}
                        onChange={handleChange}
                        placeholder="เช่น การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น"
                        required
                        className="form-input"
                    />
                </div>
                
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label className="form-label">ชื่อวิชา (อังกฤษ):</label>
                    <input
                        type="text"
                        name="courseNameEn"
                        value={formData.courseNameEn}
                        onChange={handleChange}
                        placeholder="เช่น Introduction to Computer Programming"
                        className="form-input"
                    />
                </div>
                
                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '25px' }}>
                    <div className="form-group">
                        <label className="form-label">อาจารย์ผู้สอน:</label>
                        <input
                            type="text"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleChange}
                            placeholder="เช่น อ.สมชาย ใจดี"
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">เกรด:</label>
                        <select
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="-">ยังไม่มีเกรด</option>
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
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '16px' }}>
                    ➕ เพิ่มรายวิชา
                </button>
            </form>
        </div>
    );
};

export default CourseForm;