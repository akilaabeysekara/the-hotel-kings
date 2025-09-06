(function () {
            const checkIn = document.getElementById('checkIn');
            const checkOut = document.getElementById('checkOut');
            const form = document.getElementById('reserveForm');

            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const minStr = `${yyyy}-${mm}-${dd}`;
            checkIn.min = minStr;
            checkOut.min = minStr;

            checkIn.addEventListener('change', () => {
                if (checkIn.value) {
                    checkOut.min = checkIn.value;
                    if (checkOut.value && checkOut.value <= checkIn.value) {
                        checkOut.value = '';
                    }
                }
            });

            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        })();