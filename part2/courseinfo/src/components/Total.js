const Total = ({ parts }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const sum = parts.map(part => {
        return part.exercises
    }).reduce(reducer)
    return (
        <div>
            <p>
                Number of exercises {sum}
            </p>
        </div>
    )
}

export default Total