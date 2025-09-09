// courseStore.ts
import { create } from "zustand";

export interface Course {
    id: string;
    courseCode: string;
    courseNameTh: string;
    courseNameEn: string;
    credits: number;
    instructor: string;
    grade: string;
    isDropped: boolean;
}

interface CourseState {
    courses: Course[];
    addCourse: (course: Omit<Course, 'id' | 'isDropped'>) => void;
    dropCourse: (id: string) => void;
    restoreCourse: (id: string) => void;
    updateGrade: (id: string, grade: string) => void;
    clearDroppedCourses: () => void;
    calculateGPA: () => number;
    getActiveCourses: () => Course[];
    getDroppedCourses: () => Course[];
    getTotalCredits: () => number;
}

const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D+': 1.5,
    'D': 1.0,
    'F': 0.0,
    'W': 0.0,
    'I': 0.0,
    '-': 0.0
};

export const useCourseStore = create<CourseState>((set, get) => ({
    courses: [],
    
    addCourse: (courseData) => set((state) => ({
        courses: [
            ...state.courses,
            {
                ...courseData,
                id: Date.now().toString(),
                isDropped: false,
            }
        ]
    })),
    
    dropCourse: (id: string) => set((state) => ({
        courses: state.courses.map(course =>
            course.id === id ? { ...course, isDropped: true } : course
        )
    })),
    
    restoreCourse: (id: string) => set((state) => ({
        courses: state.courses.map(course =>
            course.id === id ? { ...course, isDropped: false } : course
        )
    })),
    
    updateGrade: (id: string, grade: string) => set((state) => ({
        courses: state.courses.map(course =>
            course.id === id ? { ...course, grade } : course
        )
    })),
    
    clearDroppedCourses: () => set((state) => ({
        courses: state.courses.filter(course => !course.isDropped)
    })),
    
    calculateGPA: () => {
        const activeCourses = get().getActiveCourses().filter(course => course.grade !== '-');
        if (activeCourses.length === 0) return 0;
        
        const totalPoints = activeCourses.reduce((sum, course) => {
            return sum + (gradePoints[course.grade] || 0) * course.credits;
        }, 0);
        
        const totalCredits = activeCourses.reduce((sum, course) => sum + course.credits, 0);
        
        return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
    },
    
    getActiveCourses: () => get().courses.filter(course => !course.isDropped),
    
    getDroppedCourses: () => get().courses.filter(course => course.isDropped),
    
    getTotalCredits: () => get().getActiveCourses().reduce((sum, course) => sum + course.credits, 0),
}));