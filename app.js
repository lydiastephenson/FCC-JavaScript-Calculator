$(() => {

    let result = "";
    let current = "0";
    let prev = "";
    let operation = "";

    const reset = () => {
        result = "";
        current = "0";
        prev = "";
        operation = "";
    }

    const calculate = () => {
        let sum = prev + operation + current;
        result = eval(sum);
    }

    $("button").on("click", (e) => {
        let n = $(e.target).text();

        if ($(e.target).hasClass("integer")) {
            if (current == "0") {
                current = n;
            } else if (current.includes(".") == true && n == ".") {
                current = current;
            } else {
                current += n;
            }

            $("#sum").append(current);
            $("#display").text(current);
        }

        if ($(e.target).hasClass("operator")) {
            // HANDLE CONTINUING SUM AFTER PRESSING EQUALS
            if (prev != "" && operation == "" && current == "") {
                $("#sum").append(prev);
                $("#sum").append(n);
                operation += n;
                return;
            }
            // HANDLE SUM WITH MULTIPLE OPERATORS
            if (operation != "" && current != "" && prev != "") {
                calculate();
                prev = result;
                current = "";
                operation = n;
                $("#sum").append(n);
                return;
            }
            // HANDLE CONSECUTIVE OPERATORS
            if (operation != "") {
                if (n == "-") {
                    operation += n;
                } else {
                    operation = n;
                }
            }
            // HANDLE STANDARD USAGE
            if (operation == "") {
                operation += n;
                prev = current;
                current = "";
            }

            $("#sum").append(n);
        }

        if (n == "=") {
            calculate();
            prev = result;
            current = "";
            operation = "";
            $("#display").text(result);
            $("#sum").text("");
        }

        if (n == "AC") {
            reset();
            $("#display").text(current);
            $("#sum").text("");
        }
    });
});