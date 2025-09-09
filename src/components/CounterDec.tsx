import { useCounterStore } from "../store/counterStore";

const CounterDec = () => {
    const { count, decrease, reset } = useCounterStore();

    return (
        <div>
            <h2>Counter -</h2>
            <p>{count}</p>
            <div>
                <button onClick={decrease}>
                    Decrease
                </button>
                <button onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default CounterDec;