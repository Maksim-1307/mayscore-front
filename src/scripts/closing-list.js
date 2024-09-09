function handle_closing_lists() {

        document.querySelectorAll('.closing-list').forEach(list => {
        const button = list.querySelector(".closing-list__button");
        button.addEventListener('click', function () {
            list.style.background = "red"; 
            const state = button.parentNode.state;
            if (state == "closed") {
                button.parentNode.state = "opened";
                return;
            }
            button.parentNode.state = "opened";
        });
    });
}

export default handle_closing_lists;




