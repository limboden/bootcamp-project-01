// const yourBills = localStorage.getItem("Bills");
// const yourEntertainment = localStorage.getItem("Entertainment");
// const yourTransportation = localStorage.getItem("Transportation");
// const yourFood = localStorage.getItem("Food");
// const yourOther = localStorage.getItem("Other");
// const yourIncome = localStorage.getItem("Income");


const incomeField = document.querySelector('.Income');
const billsField = document.querySelector('.Bills');
const foodField = document.querySelector('.Food');
const entertainmentField = document.querySelector('.Entertainment');
const transportationField = document.querySelector('.Transportation');
const otherField = document.querySelector('.Other');
const submitButton = document.querySelector('.submit');

function handleSubmit(event) {

    const fields = {
        income: incomeField.value,
        bills: billsField.value,
        entertainment: entertainmentField.value,
        transportation: transportationField.value,
        food: foodField.value,
        other: otherField.value
    }

    localStorage.setItem('fields') = JSON.stringify(fields);

    console.log(localStorage.getItem('fields'));


}


// submitButton.addEventListener('click', handleSubmit);





Highcharts.chart('highchart', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Your Budget'
    },
    tooltip: {
        valueSuffix: '%'
    },
    // subtitle: {
    //     text:
    //         'Source: you'
    // },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Bills',
                    y: 55.02
                },
                {
                    name: 'Entertainment',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Transportation',
                    y: 1.09
                },
                {
                    name: 'Food',
                    y: 15.5
                },
                {
                    name: 'Other',
                    y: 1.68
                }
            ]
        }
    ]
});
