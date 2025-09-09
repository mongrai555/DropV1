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
        <form onSubmit={handleSubmit} style={{
            marginBottom: '30px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
        }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>📚 เพิ่มรายวิชา</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>รหัสวิชา:</label>
                    <input
                        type="text"
                        name="courseCode"
                        value={formData.courseCode}
                        onChange={handleChange}
                        placeholder="เช่น CSC101"
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>หน่วยกิต:</label>
                    <input
                        type="number"
                        name="credits"
                        value={formData.credits}
                        onChange={handleChange}
                        min="1"
                        max="6"
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ชื่อวิชา (ไทย):</label>
                <input
                    type="text"
                    name="courseNameTh"
                    value={formData.courseNameTh}
                    onChange={handleChange}
                    placeholder="เช่น การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น"
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}
                />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ชื่อวิชา (อังกฤษ):</label>
                <input
                    type="text"
                    name="courseNameEn"
                    value={formData.courseNameEn}
                    onChange={handleChange}
                    placeholder="เช่น Introduction to Computer Programming"
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}
                />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>อาจารย์ผู้สอน:</label>
                    <input
                        type="text"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        placeholder="เช่น อ.สมชาย ใจดี"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>เกรด:</label>
                    <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
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
            
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                เพิ่มรายวิชา
            </button>
        </form>
    );
};

export default CourseForm;