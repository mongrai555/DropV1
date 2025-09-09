import { useCounterStore } from "../store/counterStore";

const CounterScore = () => {
    const { count } = useCounterStore();

    return (
        <div>
            <h1>Counter {count * 10}</h1>
        </div>
    );
};

export default CounterScore;