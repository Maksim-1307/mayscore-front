const ClosingList = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };

    const updatedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { toggleVisibility });
        }
        return child;
    });

    return (
        <div className="closing-list">
            {updatedChildren}
        </div>
    );
};

const ClosingListButton = ({ toggleVisibility, children }) => {
    return (
        <button className="closing-list__button" onClick={toggleVisibility}> 
            {children} 
        </button>
    );
};

const ClosingListBody = ({ toggleVisibility, children }) => {
    return (
        <div className="closing-list__body">
            {!toggleVisibility && { children }}
        </div>
    );
};

export {ClosingList, ClosingListButton, ClosingListBody};
