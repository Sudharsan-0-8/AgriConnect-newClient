
function Modal({ className: classes, children, isOpen=true, onClose }) {
    return (
        <div className={`${classes} ${isOpen?'block':'hidden'} w-[100%] h-[100%] fixed top-0 left-0 bg-slate-700/70 z-50`}>
            <div className="p-6 bg-white screenCenter rounded-lg">
                <div className="text-right mb-3">
                    <button onClick={onClose}>
                        <span className="text-slate-600 font-bold text-xl">x</span>
                    </button>
                </div>
                { children }
            </div>
        </div>
    )
}

export default Modal;