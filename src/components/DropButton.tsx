import { useCourseStore } from "../store/courseStore";

interface DropButtonProps {
    courseId: string;
    isDropped: boolean;
}

const DropButton = ({ courseId, isDropped }: DropButtonProps) => {
    const { dropCourse, restoreCourse } = useCourseStore();

    const handleClick = () => {
        if (isDropped) {
            restoreCourse(courseId);
        } else {
            dropCourse(courseId);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`btn ${isDropped ? 'btn-success' : 'btn-danger'}`}
            style={{
                padding: '5px 12px',
                fontSize: '12px',
                minWidth: '80px'
            }}
        >
            {isDropped ? '🔄 กลับคืน' : '❌ ถอน'}
        </button>
    );
};

export default DropButton;