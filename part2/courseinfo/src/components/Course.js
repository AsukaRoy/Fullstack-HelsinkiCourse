import Part from "./Part"
const Course = ({ parts }) => {
    const breakParts = parts.map((part) =>
        <Part key={part.id} index={part.name} exer={part.exercises} />
    );
    return (
        <div>
            {breakParts}
        </div>
    )
}

export default Course