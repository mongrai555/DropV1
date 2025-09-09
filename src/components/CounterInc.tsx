import { useCounterStore } from "../store/counterStore";

const CounterInc = () => {
    const { count, increase, reset } = useCounterStore();

    return (
        <div>
            <h2>Counter +</h2>
            <p>{count}</p>
            <div>
                <button onClick={reset}>
                    Reset
                </button>
                <button onClick={increase}>
                    Increase
                </button>
            </div>
        </div>
    );
};

export default CounterInc;