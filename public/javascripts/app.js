console.log('Goes to the client side.');

if (getTitle == "Book List") {
    let deleteButtons = document.querySelectorAll('.btn-danger');

    for (button of deleteButtons) {
        button.addEventListener('click', (event) => {
            if (!confirm("Are you sure?")) {
                event.preventDefault();
            }
            else {
                // on user acceptance process the delete request
                return true;
            }
        });
    }
}