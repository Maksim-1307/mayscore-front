function Leagueslist (props) {
    const data  = props.data;
    if (!data) return;

    let elements = [];
    data.forEach(block => {
        if (block && block.blockType == "league") {
            elements.push(
            <a href={block.url} class="sidebar__point">
                <img class="sidebar__icon" src={block.icon} alt="" />
                <span>{block.name}</span>
            </a>);
        }
    });
    return (
        <>{elements}</>
    );
}

export default Leagueslist;