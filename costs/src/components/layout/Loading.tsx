import loading from "../../assets/loading.svg"

function Loading() {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <img src={loading} alt="Loading" />
        </div>
    )
}

export default Loading