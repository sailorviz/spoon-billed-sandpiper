export default function DeclineRateModeSelector({
    mode,
    setMode
}) {

    return (
        <div className="decline-rate-selector">

            <span>Choose Mode: </span>

            <button
                className={
                    mode === "icon"
                    ? "active"
                    : ""
                }
                onClick={() => setMode("icon")}
            >
                Icon Display
            </button>


            <button
                className={
                    mode === "line"
                    ? "active"
                    : ""
                }
                onClick={() => setMode("line")}
            >
                Line Chart
            </button>

        </div>
    )
}